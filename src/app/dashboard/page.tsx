"use client";

import { useDashboardData } from "@/components/DashboardDataProvider";
import { Activity, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function DashboardHome() {
  const { hasNao, latestForm } = useDashboardData();

  const firstName = latestForm?.full_name?.trim().split(" ")[0] || "there";
  const targetSchools = latestForm?.target_schools?.filter(Boolean) ?? [];
  const leadSchool = targetSchools[0] ?? "your target schools";
  const yearsExperience = latestForm?.years_experience ?? 0;

  const modules = [
    { id: 1, name: "Consultation Form", status: hasNao ? "Completed" : "Open now", path: "/dashboard/consultation" },
    { id: 2, name: "Resume / CV", status: "Reviewed (95/100)", path: "/dashboard/resume" },
    { id: 3, name: "Recommendation Letters", status: "Action Required", pending: true, path: "/dashboard/recommendations" },
    { id: 4, name: "Personal Essays", status: "In Progress (3 drafts)", path: "/dashboard/essays" },
    { id: 5, name: "School-Specific Essays", status: "Not Started", path: "/dashboard/school-essays" },
    { id: 6, name: "Scholarship Essays", status: "Not Started", path: "/dashboard/scholarships" },
    { id: 7, name: "Transcripts + Test Scores", status: "Completed", path: "/dashboard/transcripts" },
    { id: 8, name: "Interview Prep", status: "Not Started", path: "/dashboard/interviews" }
  ].map((module) => {
    if (hasNao || module.id === 1) {
      return module;
    }

    return {
      ...module,
      status: "Locked until NAO is generated",
      pending: false,
      locked: true
    };
  });

  return (
    <div className="space-y-10 animate-fade-in">
      <header className="mb-10 max-w-[720px]">
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-accent-clr mb-2">
          Dashboard · Overview
        </div>
        <h1 className="font-serif font-medium text-[36px] tracking-[-0.02em] leading-[1.1] mb-3 text-ink">
          Welcome back, {firstName}
        </h1>
        <p className="font-serif italic text-[17px] text-ink-soft leading-[1.5]">
          {hasNao
            ? `Your Narrative Anchor is active for ${leadSchool}. Continue the unlocked workflow.`
            : "Your journey is locked until the intake creates a valid Narrative Anchor JSON."}
        </p>
      </header>

      {/* Global Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-panel border border-rule rounded-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-accent-clr/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded-full bg-paper flex items-center justify-center border border-rule">
              <ShieldCheck className="w-4 h-4 text-accent-clr" />
            </div>
          </div>
          <h3 className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-faint font-medium">App Health Score</h3>
          <div className="font-serif font-medium text-[32px] mt-1 text-ink tracking-tight">
            {hasNao ? "92" : "--"}<span className="text-sm text-ink-faint ml-1">/100</span>
          </div>
          <p className="font-serif italic text-[12px] text-ink-soft mt-2 leading-relaxed">
            {hasNao
              ? "Strong profile alignment across current documents."
              : "Complete intake first to compute your profile alignment."}
          </p>
        </div>

        <div className="p-5 bg-panel border border-rule rounded-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-warn/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded-full bg-paper flex items-center justify-center border border-rule">
              <AlertTriangle className="w-4 h-4 text-warn" />
            </div>
          </div>
          <h3 className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-faint font-medium">Weakest Link</h3>
          <div className="font-serif font-medium text-[18px] mt-1 text-ink">
            {hasNao ? "Recommendation 2" : "Locked"}
          </div>
          <p className="font-serif italic text-[12px] text-ink-soft mt-2 leading-relaxed">
            {hasNao
              ? "Briefing document lacks specificity in Impact section."
              : "Insights appear after Narrative Anchor generation."}
          </p>
        </div>

        <div className="p-5 bg-panel border border-rule rounded-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-accent-clr/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-9 h-9 rounded-full bg-paper flex items-center justify-center border border-rule">
              <Activity className="w-4 h-4 text-accent-clr" />
            </div>
          </div>
          <h3 className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-faint font-medium">Next Action</h3>
          <div className="font-serif font-medium text-[18px] mt-1 text-ink">
            {hasNao ? "Review Essay Feedback" : "Finish Consultation Form"}
          </div>
          <p className="font-serif italic text-[12px] text-ink-soft mt-2 leading-relaxed">
            {hasNao
              ? "Editing Agent left 3 rewrite suggestions on Essay 1."
              : `${yearsExperience > 0 ? `${yearsExperience} years of experience captured.` : "Start by completing your intake details."}`}
          </p>
        </div>
      </div>

      <div className="pt-6">
        <h2 className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-faint mb-6 pb-2 border-b border-rule flex items-center justify-between">
          Module Progress <span>{modules.length} steps</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {modules.map(mod => (
            <Link href={mod.locked ? "#" : mod.path} key={mod.id} className="group">
              <div className={`p-4 rounded-lg border flex items-center justify-between transition-all duration-200 ${
                mod.locked ? "opacity-45 pointer-events-none bg-panel-deep border-rule" : 
                mod.pending ? "border-accent-clr bg-accent-soft/20 hover:bg-accent-soft/30" :
                "border-rule bg-panel hover:bg-panel-deep"
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-medium shrink-0 ${
                    mod.status.includes("Completed") ? "bg-ok text-paper" :
                    mod.pending ? "bg-accent-clr text-paper" :
                    "bg-paper-deep text-ink-faint"
                  }`}>
                    {mod.id}
                  </div>
                  <div>
                    <h4 className="font-sans font-medium text-[13px] text-ink leading-tight">{mod.name}</h4>
                    <p className={`font-mono text-[10px] mt-0.5 uppercase tracking-wide ${mod.pending ? "text-accent-clr" : "text-ink-faint"}`}>{mod.status}</p>
                  </div>
                </div>
                {!mod.locked && (
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${mod.pending ? "text-accent-clr" : "text-ink-faint opacity-50"}`} />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
