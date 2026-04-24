"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, Zap, Target, Layers, Database, Code, LineChart, ShieldCheck } from "lucide-react";

export default function WorkflowPage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-accent-soft">
      {/* Navigation */}
      <nav className="h-20 px-8 sm:px-16 flex items-center justify-between border-b border-rule sticky top-0 bg-paper/80 backdrop-blur-md z-50">
        <div className="font-serif font-medium text-xl tracking-tight italic flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 bg-accent-clr rounded-full" />
          <Link href="/">Admissions OS</Link>
        </div>
        <div className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-wider">
          <Link href="/" className="hover:text-accent-clr transition-colors">Home</Link>
          <Link href="/login" className="hover:text-accent-clr transition-colors">Login</Link>
          <Link href="/signup" className="bg-ink text-paper px-5 py-2 rounded-[4px] hover:bg-accent-clr transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-8 py-24">
        {/* Hero */}
        <header className="mb-20">
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-accent-clr mb-4 flex items-center gap-3">
            <div className="w-8 h-[1px] bg-accent-clr" />
            Case Study
          </div>
          <h1 className="font-serif font-medium text-[48px] sm:text-[64px] leading-[1.1] tracking-[-0.02em] mb-8">
            Admission OS — the <span className="italic text-accent-clr">7-agent AI platform</span> replacing $10,000 MBA consultants
          </h1>
          <p className="font-serif italic text-xl text-ink-soft leading-[1.6]">
            How we built a multi-agent orchestration engine that coaches MBA applicants through the full application lifecycle — from strategic positioning to cross-document gap analysis.
          </p>
        </header>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-rule rounded-xl overflow-hidden mb-24 border border-rule">
          {[
            { val: "7", label: "Specialized AI agents orchestrated", color: "text-accent-clr" },
            { val: "8", label: "Document modules covering application", color: "text-ink" },
            { val: "$17", label: "Blended per-student AI cost", color: "text-accent-clr" },
            { val: "10 wk", label: "MVP build timeline to beta", color: "text-ink" }
          ].map((stat, i) => (
            <div key={stat.label} className="bg-panel p-6">
              <div className={`font-serif font-medium text-3xl mb-1 ${stat.color}`}>{stat.val}</div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink-faint leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Section 01: Overview */}
        <section className="space-y-12 mb-32">
          <div className="space-y-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">01 — Overview</div>
            <h2 className="font-serif text-[36px] font-medium tracking-tight">What we built</h2>
            <div className="font-serif text-lg text-ink-soft leading-relaxed space-y-6 italic">
              <p>
                Admission OS is a multi-agent AI platform that coaches MBA and Masters applicants through the full application lifecycle. Instead of a single chatbot, the platform orchestrates <strong>seven specialized AI agents</strong> around a central intelligence layer called the <strong>Narrative Anchor Object (NAO)</strong>.
              </p>
              <p>
                Eight document modules cover the full admissions surface: essays, resume, recommendation letters, transcripts, scholarship applications, and more. Every module reads from and writes to the NAO, ensuring absolute consistency across all artifacts.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-8 bg-panel border border-rule rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-accent-soft/20 text-accent-clr flex items-center justify-center mb-6 font-mono font-bold italic">B2C</div>
              <h3 className="font-serif text-xl font-medium mb-3">Direct to applicants</h3>
              <p className="text-sm text-ink-soft leading-relaxed font-serif italic">
                $197–$397 one-time purchase replaces $5,000–$10,000 human consulting. Self-serve platform with optional sessions.
              </p>
            </div>
            <div className="p-8 bg-paper-deep border border-rule rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-ink text-paper flex items-center justify-center mb-6 font-mono font-bold italic">B2B</div>
              <h3 className="font-serif text-xl font-medium mb-3">White-label for firms</h3>
              <p className="text-sm text-ink-soft leading-relaxed font-serif italic">
                Consulting firms use Admission OS as their AI backend, while consultants handle the final 20% with full AI context.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Agent Pipeline */}
        <section className="space-y-16 mb-32">
          <div className="space-y-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">04 — The 7-agent pipeline</div>
            <h2 className="font-serif text-[36px] font-medium tracking-tight">Each agent has a <span className="italic underline decoration-accent-clr/30 underline-offset-4">distinct role</span></h2>
            <p className="font-serif italic text-lg text-ink-soft">
              Every agent receives the Narrative Anchor Object as context, produces structured JSON output, and passes it to the next agent in the chain.
            </p>
          </div>

          <div className="relative pl-12 space-y-16">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-accent-clr via-ink-faint to-rule" />
            
            {[
              { id: 'S', name: 'Strategy Agent', role: 'Builds positioning before any writing begins', color: 'bg-accent-clr', desc: 'Reads the student\'s consultation form and builds the Narrative Anchor Object. Identifies unique differentiators and validates goal bridge logic.' },
              { id: 'F', name: 'Framework Agent', role: 'Validates logic — the tough consultant', gate: 'Soft Gate', color: 'bg-ink', desc: 'Challenges every claim against the NAO positioning. Tests goal bridge logic and school fit specificity.' },
              { id: 'A', name: 'Story Architect', role: 'Restructures narrative — does not rewrite', gate: 'Soft Gate', color: 'bg-accent-clr', desc: 'Analyses the essay\'s architecture: Context / Conflict / Action / Impact. Forces restructuring before line editing.' },
              { id: '$', name: 'Scoring Engine', role: '4-dimension parallel scoring', color: 'bg-ink', desc: 'Fires four scoring dimensions simultaneously: leadership, impact, specificity, and school fit.' },
              { id: '★', name: 'Strategic Advisor', role: 'The merge point — synthesises results', color: 'bg-accent-clr', desc: 'Merge point where scoring and structural analysis converge into top 3 priorities and rewrite blueprints.' },
              { id: 'E', name: 'Editing Agent', role: 'The only agent that touches the words', color: 'bg-ink', desc: 'Generates line-level improvements matching the student\'s unique voice fingerprint.' },
              { id: 'G', name: 'Gap Analysis Agent', role: 'The senior advisor — sees everything', color: 'bg-accent-clr', desc: 'Activated after multi-docs complete. Identifies gaps, contradictions, and missed opportunities across the full app.' },
            ].map((agent, i) => (
              <div key={agent.name} className="relative group">
                <div className={`absolute -left-[48px] top-0 w-10 h-10 ${agent.color} text-paper rounded-lg flex items-center justify-center font-mono font-bold z-10 transition-transform group-hover:scale-110`}>
                  {agent.id}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-2xl font-medium">{agent.name}</h3>
                    {agent.gate && (
                      <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-accent-soft/20 text-accent-clr border border-accent-clr/20">
                        {agent.gate}
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-accent-clr leading-tight">{agent.role}</div>
                  <p className="text-sm text-ink-soft leading-relaxed font-serif italic max-w-2xl">
                    {agent.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 06: NAO */}
        <section className="p-12 bg-panel border border-rule rounded-2xl mb-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-clr/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-8">
            <div className="space-y-2">
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">06 — The Core Engine</div>
              <h2 className="font-serif text-[32px] font-medium tracking-tight">The Narrative Anchor Object</h2>
              <p className="font-serif italic text-lg text-ink-soft">
                The "shared brain" behind every agent. A machine-readable representation of your entire candidate profile.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'positioning_statement', 'core_narrative_thread', 'key_differentiators[]',
                'school_fit_mapping{}', 'goal_bridge_logic', 'voice_fingerprint'
              ].map(field => (
                <div key={field} className="px-4 py-3 bg-paper border border-rule rounded-lg font-mono text-[11px] text-accent-clr flex items-center gap-3">
                  <Database className="w-3.5 h-3.5 opacity-50" />
                  {field}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 07: Tech Stack */}
        <section className="space-y-12 mb-32">
          <div className="space-y-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">07 — Technology stack</div>
            <h2 className="font-serif text-[36px] font-medium tracking-tight">Built for <span className="italic">speed and scale</span></h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, name: "Google Gemini", desc: "2.5 Flash for speed, Pro for depth." },
              { icon: Code, name: "Next.js 14", desc: "App Router + Server Components." },
              { icon: ShieldCheck, name: "Supabase", desc: "RLS + Postgres + Real-time." },
              { icon: Layers, name: "Stripe", desc: "One-time tier-based access." },
              { icon: Target, name: "TipTap", desc: "Agent annotation extensions." },
              { icon: LineChart, name: "Stripe", desc: "96% gross margins at scale." }
            ].map(tech => (
              <div key={tech.name} className="space-y-3">
                <tech.icon className="w-5 h-5 text-accent-clr" />
                <h4 className="font-serif font-medium text-lg">{tech.name}</h4>
                <p className="font-serif italic text-sm text-ink-soft leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-rule text-center space-y-8">
          <h2 className="font-serif text-[42px] font-medium tracking-tight">Ready to orchestrate your <span className="italic">narrative?</span></h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/signup" className="bg-ink text-paper px-10 py-4 rounded-lg font-mono text-xs uppercase tracking-widest hover:bg-accent-clr transition-all">
              Initialize My Application
            </Link>
            <Link href="/login" className="font-mono text-xs uppercase tracking-widest border-b border-rule pb-1 hover:border-ink transition-all">
              Resume Journey
            </Link>
          </div>
        </section>
      </main>

      <footer className="h-40 border-t border-rule flex items-center px-16 justify-between text-ink-faint font-mono text-[10px] uppercase tracking-widest">
        <div>© 2026 Admissions OS. Built for Open Admits.</div>
      </footer>
    </div>
  );
}
