"use client";

import { Activity, Clock, ShieldCheck, ArrowRight, BookOpen, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardHome() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, Shridhar</h1>
        <p className="text-muted-foreground">Your Stanford GSB application is 75% complete. 12 days left until Round 1 deadline.</p>
      </header>

      {/* Global Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl glass-panel relative overflow-hidden group">
          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <h3 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">App Health Score</h3>
          <div className="text-4xl font-bold mt-1 text-emerald-500 dark:text-emerald-400">92<span className="text-lg text-emerald-500/50 dark:text-white/30">/100</span></div>
          <p className="text-xs text-emerald-400/80 mt-2">Strong profile alignment across current documents.</p>
        </div>

        <div className="p-6 rounded-2xl glass-panel relative overflow-hidden group">
          <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <h3 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">Weakest Link</h3>
          <div className="text-xl font-bold mt-1 text-amber-500 dark:text-amber-400">Recommendation 2</div>
          <p className="text-xs text-amber-600 dark:text-amber-400/80 mt-2">Briefing document lacks specificity in Impact section.</p>
        </div>

        <div className="p-6 rounded-2xl glass-panel relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <h3 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">Next Action</h3>
          <div className="text-xl font-bold mt-1 text-foreground">Review Essay Feedback</div>
          <p className="text-xs text-muted-foreground mt-2">Editing Agent left 3 rewrite suggestions on Essay 1.</p>
        </div>
      </div>

      <div className="pt-8">
        <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center gap-2 text-foreground">
          <BookOpen className="w-5 h-5 text-muted-foreground" /> Module Progress
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 1, name: "Consultation Form", status: "Completed", path: "/dashboard/consultation" },
            { id: 2, name: "Resume / CV", status: "Reviewed (95/100)", path: "/dashboard/resume" },
            { id: 3, name: "Recommendation Letters", status: "Action Required", pending: true, path: "/dashboard/recommendations" },
            { id: 4, name: "Personal Essays", status: "In Progress (3 drafts)", path: "/dashboard/essays" },
            { id: 5, name: "School-Specific Essays", status: "Not Started", path: "/dashboard/school-essays" },
            { id: 6, name: "Scholarship Essays", status: "Not Started", path: "/dashboard/scholarships" },
            { id: 7, name: "Transcripts + Test Scores", status: "Completed", path: "/dashboard/transcripts" },
            { id: 8, name: "Interview Prep", status: "Locked", locked: true, path: "/dashboard/interviews" }
          ].map(mod => (
            <Link href={mod.locked ? "#" : mod.path} key={mod.id}>
              <div className={`p-5 rounded-xl border flex items-center justify-between transition-all ${
                mod.locked ? "opacity-50 grayscale border-border bg-black/5 dark:bg-black/20 cursor-not-allowed" : 
                mod.pending ? "border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10" :
                "border-border glass-panel hover:bg-black/5 dark:hover:bg-white/5"
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    mod.status.includes("Completed") ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" :
                    mod.status.includes("Action") ? "bg-amber-500/20 text-amber-600 dark:text-amber-400" :
                    "bg-black/10 dark:bg-white/10 text-muted-foreground"
                  }`}>
                    {mod.id}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{mod.name}</h4>
                    <p className={`text-xs mt-0.5 ${mod.pending ? "text-amber-600/80 dark:text-amber-400/80" : "text-muted-foreground"}`}>{mod.status}</p>
                  </div>
                </div>
                {!mod.locked && (
                  <ArrowRight className={`w-4 h-4 ${mod.pending ? "text-amber-500" : "text-muted-foreground opacity-50"}`} />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
