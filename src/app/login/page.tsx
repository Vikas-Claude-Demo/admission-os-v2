"use client";

import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { login } from "@/app/auth/actions";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink font-sans flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px]">
          <div className="mb-10 text-center">
            <h1 className="font-serif text-[32px] tracking-tight mb-2">Welcome back.</h1>
            <p className="font-serif italic text-ink-soft">Enter your credentials to access your journey.</p>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-[5px] font-mono text-[11px] text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-ink-faint block px-1">Email address</label>
              <input
                name="email"
                type="email"
                required
                placeholder="e.g. shridhar@example.com"
                className="w-full bg-panel border border-rule rounded-[5px] px-4 py-3 font-serif placeholder:text-ink-faint outline-none focus:border-accent-clr transition-colors"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end px-1">
                <label className="font-mono text-[10px] uppercase tracking-widest text-ink-faint block">Password</label>
                <Link href="#" className="font-mono text-[9px] uppercase tracking-widest text-accent-clr hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-panel border border-rule rounded-[5px] px-4 py-3 font-serif placeholder:text-ink-faint outline-none focus:border-accent-clr transition-colors pr-11"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-ink-faint hover:text-ink transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ink text-paper py-4 rounded-[5px] font-mono text-sm uppercase tracking-widest hover:bg-accent-clr transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-10 text-center font-serif text-sm text-ink-soft">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-accent-clr italic hover:underline">Create one</Link>
          </p>
        </div>
      </main>

      <footer className="p-8 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint">
        Editorial Integrity · Agent Orchestration · Admissions OS
      </footer>
    </div>
  );
}
