"use client";

import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 shadow-lg">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold">Forgot Password</h1>
          <p className="text-gray-400 mt-2">
            We’ll send you a reset link
          </p>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-1">
            Email address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-white"
          />
        </div>

        {/* Send Reset Link */}
        <button
          className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Send Reset Link
        </button>

        {/* Back to Login */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Remember your password?{" "}
          <Link href="/login" className="text-white hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </main>
  );
}
