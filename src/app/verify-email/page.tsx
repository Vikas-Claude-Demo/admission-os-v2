"use client";

import Link from "next/link";
import { Mail, RefreshCw } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function VerifyEmailPage() {
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleResend() {
    setResending(true);
    setError(null);
    setResent(false);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.email) {
      setError("No email address found. Please sign up again.");
      setResending(false);
      return;
    }

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: user.email,
    });

    if (error) {
      setError(error.message);
    } else {
      setResent(true);
    }
    setResending(false);
  }

  return (
    <div className="min-h-screen bg-paper text-ink font-sans flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[420px] text-center">

          <div className="mx-auto mb-8 w-16 h-16 rounded-full bg-panel border border-rule flex items-center justify-center">
            <Mail className="w-7 h-7 text-accent-clr" />
          </div>

          <h1 className="font-serif text-[32px] tracking-tight mb-3">Check your inbox.</h1>
          <p className="font-serif italic text-ink-soft mb-2 leading-relaxed">
            We&apos;ve sent a verification link to your email address.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint mb-10">
            Click the link in the email to activate your account.
          </p>

          <div className="bg-panel border border-rule rounded-[5px] px-6 py-5 mb-8 text-left space-y-2">
            <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint">What to do next</p>
            <ul className="font-serif text-sm text-ink-soft space-y-1.5 mt-2">
              <li>1. Open your email inbox</li>
              <li>2. Find the email from Admissions OS</li>
              <li>3. Click the verification link</li>
              <li>4. Return here to sign in</li>
            </ul>
          </div>

          {resent && (
            <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-[5px] font-mono text-[11px] text-green-700">
              Verification email resent successfully.
            </div>
          )}

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-[5px] font-mono text-[11px] text-red-600">
              {error}
            </div>
          )}

          <button
            onClick={handleResend}
            disabled={resending}
            className="w-full flex items-center justify-center gap-2 border border-rule bg-panel text-ink py-3.5 rounded-[5px] font-mono text-[11px] uppercase tracking-widest hover:border-accent-clr hover:text-accent-clr transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${resending ? "animate-spin" : ""}`} />
            {resending ? "Resending..." : "Resend verification email"}
          </button>

          <p className="font-serif text-sm text-ink-soft">
            Already verified?{" "}
            <Link href="/login" className="text-accent-clr italic hover:underline">Sign in</Link>
          </p>
        </div>
      </main>

      <footer className="p-8 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint">
        Editorial Integrity · Agent Orchestration · Admissions OS
      </footer>
    </div>
  );
}
