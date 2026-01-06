"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const isPasswordValid = password.length >= 8;

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    const form = new FormData(e.target);
    const payload = Object.fromEntries(form);

    if (!payload.email) {
      setError("Email is required");
      return;
    }

    if (!payload.password) {
      setError("Password is required");
      return;
    }

    if (payload.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Signup failed");
      return;
    }

    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 shadow-lg">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold">Create Account</h1>
          <p className="text-gray-400 mt-2">Join Ajwad Perfumes to continue</p>
        </div>
        {error && <p className="text-red-500">{error}</p>}

        <form className="space-y-5" onSubmit={handleSignup}>
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Email address *
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-white"
            />
          </div>

          {/* Phone (Optional) */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Phone number <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="tel"
              placeholder="+91"
              className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-white"
            />
            <p className="text-xs text-gray-500 mt-1">
              Used only for delivery updates
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Password *
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-white"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <p
              className={`text-xs mt-1 ${
                isPasswordValid ? "text-green-400" : "text-gray-500"
              }`}
            >
              Minimum 8 characters
            </p>
          </div>

          {/* Signup Button */}
          <button
            disabled={!isPasswordValid}
            className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        {/* Google Signup */}
        <button className="w-full flex items-center justify-center gap-3 border border-gray-700 py-3 rounded-lg hover:bg-zinc-800 transition">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
