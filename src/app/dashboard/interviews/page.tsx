"use client";

import { Video, Mic, CheckCircle2, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InterviewsModule() {
  return (
    <div className="max-w-6xl mx-auto animate-fade-in relative">
      <header className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Module 8: Interview Prep</h1>
        <p className="text-sm text-muted-foreground">Run AI mock interviews via Whisper transcription and logic-checker.</p>
      </header>

      {/* Lock Overlay indicating Tier status */}
      <div className="absolute inset-0 z-20 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-2xl">
         <div className="text-center p-8 max-w-sm glass-panel border border-border shadow-2xl rounded-2xl">
            <div className="w-16 h-16 bg-black/5 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
               <Video className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-foreground">Premium Feature</h3>
            <p className="text-muted-foreground text-sm mb-6">Live AI Mock Interviews and consistency tracking require the Full Application Tier.</p>
            <Button className="w-full bg-foreground text-background hover:bg-foreground/90">Upgrade Tier</Button>
         </div>
      </div>

      <div className="opacity-30 pointer-events-none select-none blur-[2px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="glass-panel p-8 rounded-2xl border-border text-center">
            <Mic className="w-12 h-12 text-indigo-500 dark:text-indigo-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-foreground">Start AI Mock Interview</h3>
            <p className="text-sm text-muted-foreground mt-2">Activate the whisper integration and practice answering randomized school-specific arrays.</p>
          </div>
          <div className="glass-panel p-8 rounded-2xl border-border text-center">
            <PlayCircle className="w-12 h-12 text-purple-500 dark:text-purple-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-foreground">Book Human Coach</h3>
            <p className="text-sm text-muted-foreground mt-2">Book a 30-minute synchronous Cal.com session with an executive consultant.</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-border">
          <h3 className="font-semibold text-lg mb-4 text-foreground">Consistency Checker Results</h3>
          <div className="flex gap-4 items-start p-4 rounded-xl border border-border bg-black/5 dark:bg-white/5">
             <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
             <div>
                <h4 className="font-medium text-sm text-emerald-600 dark:text-emerald-400 mb-1">Pass</h4>
                <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80">Last interview transcript matches narrative timelines presented in Essay 2 correctly.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
