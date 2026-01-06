"use client";

import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function CartPage() {
  const { cart, increase, decrease, removeItem } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Your cart is empty</p>
      </main>
    );
  }

  const router = useRouter();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (!user) {
      router.push("/login?redirect=/checkout");
    } else {
      router.push("/checkout");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 pt-20 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          className="bg-gray-900 rounded-xl p-4 mb-4 flex gap-4"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-24 h-24 object-cover rounded"
          />

          <div className="flex-1">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-400">Size: {item.size}</p>

            <p className="font-semibold mt-1">₹{item.price * item.quantity}</p>

            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={() => decrease(item.id)}
                className="w-8 h-8 border rounded"
              >
                −
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => increase(item.id)}
                className="w-8 h-8 border rounded"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="text-red-400 text-sm mt-2"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="border-t border-gray-700 mt-6 pt-4 flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <button onClick={handleCheckout} className="w-full mt-4 bg-white text-black py-3 rounded-lg">
        Proceed to Checkout
      </button>
    </main>
  );
}
