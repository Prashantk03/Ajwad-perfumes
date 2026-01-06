"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const { user, logout, loading } = useAuth();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-50 bg-blue-950 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-wide">
          Ajwad Perfumes
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/shop" className="hover:text-gray-300">Shop</Link>
          <Link href="/collections" className="hover:text-gray-300">Collections</Link>
          <Link href="/about" className="hover:text-gray-300">About</Link>
          <Link href="/contact" className="hover:text-gray-300">Contact</Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 relative">
          <button aria-label="Search" className="hover:text-gray-300">
            🔍
          </button>

          {/* Cart */}
          <Link href="/cart" className="relative">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth Dropdown */}
          {!loading && (
            <div className="relative group">
              <span className="cursor-pointer hover:text-gray-300">
                👤
              </span>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-44 bg-black border border-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {!user ? (
                  <div className="flex flex-col text-sm">
                    <Link
                      href="/login"
                      className="px-4 py-2 hover:bg-gray-800"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="px-4 py-2 hover:bg-gray-800"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col text-sm">
                    <div className="px-4 py-2 text-gray-400">
                      {user.name || user.email}
                    </div>
                    <Link
                      href="/account"
                      className="px-4 py-2 hover:bg-gray-800"
                    >
                      My Account
                    </Link>
                    <Link
                      href="/orders"
                      className="px-4 py-2 hover:bg-gray-800"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="px-4 py-2 text-left text-red-400 hover:bg-gray-800"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          <button
            className="md:hidden text-xl"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="flex flex-col gap-4 px-4 py-6 text-sm">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/shop" onClick={() => setOpen(false)}>Shop</Link>
            <Link href="/collections" onClick={() => setOpen(false)}>Collections</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}
