"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-accent-soft">
      {/* Navigation */}
      <nav className="h-20 px-8 sm:px-16 flex items-center justify-between border-b border-rule">
        <div className="font-serif font-medium text-xl tracking-tight italic flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 bg-accent-clr rounded-full" />
          Admissions OS
        </div>
        <div className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-wider">
          <Link href="#manifesto" className="hover:text-accent-clr transition-colors">Manifesto</Link>
          <Link href="/workflow" className="hover:text-accent-clr transition-colors">Workflow</Link>
          <Link href="/login" className="hover:text-accent-clr transition-colors">Login</Link>
          <Link href="/signup" className="bg-ink text-paper px-5 py-2 rounded-[4px] hover:bg-accent-clr transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 sm:px-16 pt-24 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="max-w-[640px]">
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-accent-clr mb-6">
            Agent-Orchestrated Admissions
          </div>
          <h1 className="font-serif font-medium text-[64px] sm:text-[84px] leading-[0.95] tracking-[-0.03em] mb-8">
            Tell your story, <br />
            <span className="italic">unedited.</span>
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-ink-soft leading-[1.4] mb-12 max-w-[480px]">
            The first business school application platform designed to handle the complexity so you can focus on the narrative.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/signup" className="group bg-ink text-paper px-8 py-4 rounded-[5px] font-mono text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-accent-clr transition-all">
              Start your journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#manifesto" className="font-mono text-xs uppercase tracking-widest border-b border-rule pb-1 hover:border-ink transition-colors">
              Read the Manifesto
            </Link>
          </div>
        </div>

        <div className="relative aspect-square w-full max-w-[600px] mx-auto lg:ml-auto">
          <div className="absolute -inset-4 border border-rule rotate-3 rounded-lg" />
          <div className="absolute -inset-4 border border-rule -rotate-2 rounded-lg" />
          <div className="relative h-full w-full overflow-hidden rounded-lg shadow-2xl skew-y-1">
            <Image
              src="/mainimage2.png"
              alt="Editorial Illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section id="manifesto" className="bg-paper-deep px-8 sm:px-16 py-32 border-t border-rule">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-ink-faint mb-12">
            The Philosophy
          </div>
          <h2 className="font-serif text-[42px] sm:text-[56px] leading-[1.1] tracking-tight mb-12">
            "Applications should not be a test of endurance, but a <span className="italic">reflection of intent.</span>"
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div className="space-y-4">
              <div className="font-mono text-sm text-accent-clr">01</div>
              <h3 className="font-serif font-medium text-xl">Narrative Anchors</h3>
              <p className="text-ink-soft leading-relaxed font-serif italic text-base">
                We distill your raw experiences into a structured object that stays consistent across every essay and interview.
              </p>
            </div>
            <div className="space-y-4">
              <div className="font-mono text-sm text-accent-clr">02</div>
              <h3 className="font-serif font-medium text-xl">Story Architects</h3>
              <p className="text-ink-soft leading-relaxed font-serif italic text-base">
                Specialized agents handle the scrubbing, formatting, and scoring, leaving you to own the creative voice.
              </p>
            </div>
            <div className="space-y-4">
              <div className="font-mono text-sm text-accent-clr">03</div>
              <h3 className="font-serif font-medium text-xl">Deep Reviews</h3>
              <p className="text-ink-soft leading-relaxed font-serif italic text-base">
                Don't guess what the adcom wants. Our agents score your drafts against real school rubrics in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="h-40 border-t border-rule flex items-center px-8 sm:px-16 justify-between text-ink-faint font-mono text-[10px] uppercase tracking-widest">
        <div>© 2026 Admissions OS. All rights reserved.</div>
        <div className="flex gap-8">
          <Link href="#" className="hover:text-ink">Terms</Link>
          <Link href="#" className="hover:text-ink">Privacy</Link>
          <Link href="#" className="hover:text-ink">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
