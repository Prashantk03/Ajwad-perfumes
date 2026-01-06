"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  /* -------------------- LOAD CART -------------------- */
  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem("guest_cart");
      if (stored) setCart(JSON.parse(stored));
      return;
    }

    refreshDbCart();
  }, [user]);

  /* -------------------- PERSIST GUEST CART -------------------- */
  useEffect(() => {
    if (!user) {
      localStorage.setItem("guest_cart", JSON.stringify(cart));
    }
  }, [cart, user]);

  const refreshDbCart = async () => {
    const res = await fetch("/api/cart");
    if (res.ok) {
      const data = await res.json();
      setCart(data.cart || []);
    }
  };

  /* -------------------- ADD -------------------- */
  const addToCart = async (item) => {
    if (!user) {
      setCart((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [...prev, item];
      });
      return;
    }

    await fetch("/api/cart/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    refreshDbCart();
  };

  const increase = async (cartItemId) => {
    if (!cartItemId) return;

    if (!user) {
      setCart((prev) =>
        prev.map((i) =>
          i.id === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
      return;
    }

    await fetch(`/api/cart/item/${cartItemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "increase" }),
    });

    refreshDbCart();
  };

  const decrease = async (cartItemId) => {
    if (!cartItemId) return;

    if (!user) {
      setCart((prev) =>
        prev
          .map((i) =>
            i.id === cartItemId ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0)
      );
      return;
    }

    await fetch(`/api/cart/item/${cartItemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "decrease" }),
    });

    refreshDbCart();
  };

  const removeItem = async (cartItemId) => {
    if (!cartItemId) return;

    if (!user) {
      setCart((prev) => prev.filter((i) => i.id !== cartItemId));
      return;
    }

    await fetch(`/api/cart/item/${cartItemId}`, {
      method: "DELETE",
    });

    refreshDbCart();
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("guest_cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increase, decrease, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
