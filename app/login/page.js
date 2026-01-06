"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuth();

  const redirectTo = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ fixed
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Fetch logged-in user
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();

      const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");

      if (guestCart.length > 0) {
        await fetch("/api/cart/merge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: guestCart }),
        });

        localStorage.removeItem("guest_cart");
      }
      setUser(meData.user);
      router.push(redirectTo);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 shadow-lg"
      >
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold">Welcome Back</h1>
          <p className="text-gray-400 mt-2">
            Login to your Ajwad Perfumes account
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">
            Email address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-white"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-sm text-gray-400 mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-white"
          />
        </div>

        {/* Forgot password */}
        <div className="text-right mb-6">
          <Link
            href="/forgot-password"
            className="text-sm text-gray-400 hover:text-white"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login button */}
        <button
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition mb-4 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        {/* Google Login (later) */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-700 py-3 rounded-lg hover:bg-zinc-800 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-white hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}
