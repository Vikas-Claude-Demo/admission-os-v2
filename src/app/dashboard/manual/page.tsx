"use client";

import { 
  Network, 
  Database, 
  Workflow, 
  BookOpen, 
  ShieldAlert, 
  Wand2, 
  Sparkles,
  ArrowDown
} from "lucide-react";

export default function ManualPage() {
  const steps = [
    {
      agent: "1. Strategy Agent",
      role: "Positioning & Base Knowledge",
      icon: Database,
      color: "text-blue-500 dark:text-blue-400",
      bgStyle: "bg-blue-500/10 border-blue-500/20",
      description: "Reads your 30-question diagnostic and creates the Narrative Anchor Object (NAO). This JSON file becomes the unchanging source of truth for your background, red flags, and archetypes.",
      input: "Consultation Form Answers",
      output: "NAO JSON Output"
    },
    {
      agent: "2. Framework Agent",
      role: "Logic Validation",
      icon: ShieldAlert,
      color: "text-amber-500 dark:text-amber-400",
      bgStyle: "bg-amber-500/10 border-amber-500/20",
      description: "Cross-checks your raw essay draft against strict admissions rubrics (e.g., 'Does the Short-term Goal logically bridge to the Target School?'). Operates the Decision Gate.",
      input: "Student Draft + NAO",
      output: "Pass OR Returns Error to Student"
    },
    {
      agent: "3. Story Architect",
      role: "Restructuring & Flow",
      icon: Network,
      color: "text-purple-500 dark:text-purple-400",
      bgStyle: "bg-purple-500/10 border-purple-500/20",
      description: "Receives the framework-validated draft and rearranges the structure. It moves paragraphs to build tension, applies the STAR format to anecdotes, and ensures narrative flow.",
      input: "Validated Draft",
      output: "Structured Draft"
    },
    {
      agent: "4. Editing Agent",
      role: "Pacing & Polish",
      icon: Wand2,
      color: "text-indigo-500 dark:text-indigo-400",
      bgStyle: "bg-indigo-500/10 border-indigo-500/20",
      description: "The fine-tuner. Cuts passive voice, reduces comma splices, upgrades verbs, and removes jargon without altering your personal voice fingerprint.",
      input: "Structured Draft",
      output: "Polished Version"
    },
    {
      agent: "5. Gap Agent",
      role: "Holistic Health Check",
      icon: Sparkles,
      color: "text-emerald-500 dark:text-emerald-400",
      bgStyle: "bg-emerald-500/10 border-emerald-500/20",
      description: "Looks at ALL documents together (Essays + Resume + Recs). Checks for overlap, ensures Red Flags in the NAO were addressed, and dictates the 'Next Action' on your dashboard.",
      input: "Polished Version + External Docs",
      output: "Final Score & Next Actions"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-8 pb-12">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-3 text-foreground">Understanding Admission OS</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          You are using an orchestrating state-machine, not a basic chatbot. 
          Here is how your data flows through the intelligence engine.
        </p>
      </header>

      {/* Layer breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="glass-panel p-8 rounded-2xl border-border bg-slate-100 dark:bg-black/40">
          <h2 className="text-xl font-bold mb-3 flex gap-2 items-center text-foreground">
            Layer 1: The Scoring Layer
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The visible UI components (like the App Health bar and the 92/100 score). It mathematically measures your drafts against public rubrics like Word Count, Keyword Density, and Target School Medians.
          </p>
        </div>
        <div className="glass-panel p-8 rounded-2xl border-border bg-indigo-50 dark:bg-indigo-900/10">
          <h2 className="text-xl font-bold mb-3 flex gap-2 items-center text-indigo-700 dark:text-indigo-400">
            Layer 2: The Agent Layer
          </h2>
          <p className="text-sm text-indigo-800/70 dark:text-indigo-300 leading-relaxed">
            The invisible brain of the platform. Five autonomous LLMs passing structured JSON objects to each other in a sequential chain, capable of challenging you and halting progression if logic fails.
          </p>
        </div>
      </div>

      {/* Workflow Engine Timeline */}
      <div className="glass-panel p-8 md:p-12 rounded-3xl border-border">
        <h2 className="text-2xl font-bold mb-8 text-foreground flex items-center justify-center gap-3">
          <Workflow className="w-6 h-6 text-muted-foreground" />
          The State-Machine Workflow
        </h2>

        <div className="relative">
          {/* Central Line connecting everything */}
          <div className="absolute left-[28px] top-4 bottom-4 w-1 bg-border rounded-full" />

          <div className="space-y-12">
            {/* Student Entry */}
            <div className="relative pl-20 transition-all group">
              <div className="absolute left-0 top-1 w-14 h-14 bg-background border-4 border-foreground rounded-full flex items-center justify-center z-10">
                <BookOpen className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Student Enters System</h3>
              <p className="text-muted-foreground text-sm mt-1">You submit an initial draft to one of the 8 document modules.</p>
            </div>

            {/* Down Arrow inside the line */}
            <div className="absolute left-[18px] top-[75px] z-20 text-border animate-bounce">
              <ArrowDown className="w-6 h-6" />
            </div>

            {/* The 5 Agents */}
            {steps.map((step, idx) => (
              <div key={idx} className="relative pl-20 transition-all group hover:-translate-y-1">
                <div className={`absolute left-2 top-2 w-10 h-10 ${step.bgStyle} border rounded-full flex items-center justify-center z-10`}>
                  <step.icon className={`w-5 h-5 ${step.color}`} />
                </div>
                
                <div className={`p-6 rounded-2xl border bg-black/5 dark:bg-white/5 shadow-sm group-hover:shadow-md transition-shadow`}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3 gap-2">
                    <h3 className={`text-lg font-bold ${step.color}`}>{step.agent}</h3>
                  </div>
                  <p className="text-foreground text-sm leading-relaxed mb-4">{step.description}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-black/40 p-3 rounded-xl border border-border">
                     <div className="flex-1">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-1">JSON IN</span>
                        <div className="text-xs text-foreground font-mono bg-black/5 dark:bg-white/5 py-1 px-2 rounded truncate">{step.input}</div>
                     </div>
                     <div className="flex-1">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-1">JSON OUT</span>
                        <div className="text-xs text-foreground font-mono bg-black/5 dark:bg-white/5 py-1 px-2 rounded truncate">{step.output}</div>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}
