"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { signup } from "@/app/auth/actions";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await signup(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink font-sans flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[440px]">
          <div className="mb-10 text-center px-4">
            <h1 className="font-serif text-[32px] tracking-tight mb-2">Begin your journey.</h1>
            <p className="font-serif italic text-ink-soft">Join the next generation of applicants using orchestrated narrative agents.</p>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-[5px] font-mono text-[11px] text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-ink-faint block px-1">First name</label>
                <input
                  name="first_name"
                  type="text"
                  required
                  placeholder="e.g. Shridhar"
                  className="w-full bg-panel border border-rule rounded-[5px] px-4 py-3 font-serif placeholder:text-ink-faint outline-none focus:border-accent-clr transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-ink-faint block px-1">Last name</label>
                <input
                  name="last_name"
                  type="text"
                  required
                  placeholder="e.g. Yendamuri"
                  className="w-full bg-panel border border-rule rounded-[5px] px-4 py-3 font-serif placeholder:text-ink-faint outline-none focus:border-accent-clr transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-ink-faint block px-1">Email address</label>
              <input
                name="email"
                type="email"
                required
                placeholder="e.g. shridhar@example.com"
                className="w-full bg-panel border border-rule rounded-[5px] px-4 py-3 font-serif placeholder:text-ink-faint outline-none focus:border-accent-clr transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-ink-faint block px-1">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  placeholder="Minimum 8 characters"
                  className="w-full bg-panel border border-rule rounded-[5px] px-4 py-3 font-serif placeholder:text-ink-faint outline-none focus:border-accent-clr transition-colors pr-11"
                  autoComplete="new-password"
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

            <div className="flex items-start gap-3 px-1 py-1">
              <input type="checkbox" required className="mt-1 accent-accent-clr" id="terms" />
              <label htmlFor="terms" className="font-serif text-[11px] text-ink-soft leading-relaxed italic">
                I agree to the <Link href="#" className="text-accent-clr hover:underline italic">Terms of Journey</Link> and acknowledge that my data will be processed by specialized narrative agents.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ink text-paper py-4 rounded-[5px] font-mono text-sm uppercase tracking-widest hover:bg-accent-clr transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Start My Application"}
            </button>
          </form>

          <p className="mt-10 text-center font-serif text-sm text-ink-soft">
            Already have an account?{" "}
            <Link href="/login" className="text-accent-clr italic hover:underline">Log in</Link>
          </p>
        </div>
      </main>

      <footer className="p-8 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint">
        Editorial Integrity · Agent Orchestration · Admissions OS
      </footer>
    </div>
  );
}
