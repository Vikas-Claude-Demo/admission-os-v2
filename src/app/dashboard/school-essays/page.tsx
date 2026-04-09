"use client";

import { Building2, Sparkles, Plus, AlertTriangle, FileText, Loader2, CheckCircle2, ChevronRight } from "lucide-react";
import { useState } from "react";
import { TipTapEditor } from "@/components/TipTapEditor";
import { Button } from "@/components/ui/button";

export default function SchoolEssaysModule() {
  const [activeSchool, setActiveSchool] = useState("Stanford GSB");
  const [content, setContent] = useState("<p>The Stanford community represents...</p>");
  const [isScoring, setIsScoring] = useState(false);
  const [scoreResult, setScoreResult] = useState<{score: number, metrics: any[], architected: boolean} | null>(null);

  const schools = ["Stanford GSB", "Wharton", "HBS", "MIT Sloan"];

  const [isArchitecting, setIsArchitecting] = useState(false);

  const handleScoreAlignment = () => {
    setIsScoring(true);
    setScoreResult(null); // Reset
    
    // Simulate Strategy Agent scoring against school specific rubrics
    setTimeout(() => {
      setIsScoring(false);
      setScoreResult({
        score: activeSchool === "Stanford GSB" ? 78 : 85,
        metrics: [
          { name: "Culture Signal Match", score: "Needs Work", detail: "Missed the 'Vulnerability' signal. Draft is too focused on technical achievements." },
          { name: "NAO Constraints", score: "Pass", detail: "Draft adheres to your core 'Transition to Product' narrative anchor." },
          { name: "Cross-School Reuse", score: "Flagged", detail: "Significant overlap with Wharton Essay 2 detected." }
        ],
        architected: false
      });
    }, 2500);
  };

  const handleSendToArchitect = () => {
    setIsArchitecting(true);
    setTimeout(() => {
      setIsArchitecting(false);
      setContent("<p>The Stanford community represents a unique intersection of vulnerability and high-scale impact. When I led the migration of our legacy systems, I realized that true leadership wasn't about the technical roadmap—it was about mediating the fears of my engineering team. I failed initially because I prioritized metrics over morale. This very failure is what draws me to the GSB ecosystem, where I hope to pivot from a purely technical operator to a nuanced product visionary...</p>");
      setScoreResult(prev => prev ? { ...prev, score: 94, architected: true, metrics: prev.metrics.map(m => ({ ...m, score: "Pass", detail: "Resolved by Story Architect." })) } : null);
    }, 3000);
  };

  // Reset score when switching schools
  const switchSchool = (school: string) => {
    setActiveSchool(school);
    setScoreResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <header className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Module 5: School-Specific Essays</h1>
        <p className="text-sm text-muted-foreground">Adapt your baseline narrative utilizing cross-school rubrics and culture signals.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {schools.map((school) => (
          <div key={school} 
               onClick={() => switchSchool(school)}
               className={`glass-panel p-4 rounded-xl border cursor-pointer transition-all ${activeSchool === school ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 shadow-sm" : "border-border hover:border-indigo-500/50"}`}>
             <div className="flex justify-between items-center mb-2">
               <Building2 className={`w-4 h-4 ${activeSchool === school ? "text-indigo-600 dark:text-indigo-400" : "text-muted-foreground"}`} />
               {activeSchool === school && <span className="text-[9px] uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">Active</span>}
             </div>
             <h3 className="font-semibold text-sm mb-1 text-foreground truncate">{school}</h3>
             <div className="text-xs text-muted-foreground mb-2">3 required essays</div>
          </div>
        ))}
        <div className="glass-panel p-4 rounded-xl border border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:text-foreground hover:border-indigo-500 cursor-pointer transition-all">
          <Plus className="w-6 h-6 mb-1" />
          <span className="text-xs font-semibold">Add School</span>
        </div>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
         <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-end mb-2">
               <div>
                  <h2 className="text-xl font-semibold mb-1 text-foreground">{activeSchool}: Why Us?</h2>
                  <p className="text-sm text-muted-foreground">Prompt: Why this school, why now? (400 words)</p>
               </div>
            </div>
            
            <div className="flex-1 relative">
               <TipTapEditor content={content} onChange={setContent} status={isScoring ? "scoring" : isArchitecting ? "analyzing" : "idle"} />
               
               {/* Overlay when scoring */}
               {(isScoring || isArchitecting) && (
                 <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl border border-indigo-500/30">
                    <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
                    <h3 className="text-lg font-bold text-foreground">
                      {isScoring ? "Evaluating Alignment" : "Story Architect Restructuring"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isScoring ? `Strategy Agent is checking draft against ${activeSchool} rubrics...` : "Reordering paragraphs for narrative tension..."}
                    </p>
                 </div>
               )}
            </div>
         </div>

         <div className="space-y-6">
            {!scoreResult ? (
              <>
                <div className="p-5 rounded-xl border border-border bg-black/5 dark:bg-white/5">
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" /> {activeSchool} Culture Signals
                  </h4>
                  <div className="space-y-3">
                    {activeSchool === "Stanford GSB" ? (
                      <>
                        <div className="p-3 rounded-lg border border-border bg-white dark:bg-black/40 text-xs text-foreground shadow-sm italic leading-relaxed">"Focus on vulnerability and personal growth over raw metrics."</div>
                        <div className="p-3 rounded-lg border border-border bg-white dark:bg-black/40 text-xs text-foreground shadow-sm italic leading-relaxed">"Strong entrepreneurial and 'change the world' undertones."</div>
                      </>
                    ) : (
                      <div className="p-3 rounded-lg border border-border bg-white dark:bg-black/40 text-xs text-foreground shadow-sm italic leading-relaxed">"Emphasize data-driven decision making and structured leadership frameworks."</div>
                    )}
                  </div>
                </div>
                
                <div className="p-5 rounded-xl border border-border bg-black/5 dark:bg-white/5 space-y-4">
                   <h4 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground flex gap-2 items-center">
                     <AlertTriangle className="w-4 h-4 text-red-500" /> Cross-School Reuse Detector
                   </h4>
                   <div className="p-4 rounded-lg border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400">
                      <p className="text-xs leading-relaxed font-medium mb-2">Duplicate Story Detected!</p>
                      <p className="text-xs leading-relaxed opacity-90">You have already used the 'Cloud Infrastructure Migration' anecdote in your Wharton Essay 2. Ensure the framing here focuses purely on the team dynamics to avoid redundancy across your application profile.</p>
                   </div>
                </div>
              </>
            ) : (
              <div className="space-y-4 animate-fade-in">
                 <div className="p-6 rounded-2xl border flex flex-col items-center justify-center text-center bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/30">
                    <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">Alignment Score</h4>
                    <div className="text-5xl font-black text-foreground mb-1">{scoreResult.score}<span className="text-xl text-muted-foreground font-medium">/100</span></div>
                    <p className="text-xs text-muted-foreground mt-2">Required threshold for {activeSchool} tier: 85+</p>
                 </div>

                 <div className="p-5 rounded-xl border border-border bg-black/5 dark:bg-white/5 space-y-4">
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2 flex items-center gap-2">
                       <FileText className="w-4 h-4" /> Diagnostic Breakdown
                    </h4>
                    
                    <div className="space-y-3">
                       {scoreResult.metrics.map((metric: any) => (
                          <div key={metric.name} className="bg-background rounded-lg border border-border p-3 shadow-sm">
                             <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-semibold text-foreground">{metric.name}</span>
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                                  metric.score === "Pass" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" :
                                  "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                                }`}>{metric.score}</span>
                             </div>
                             <p className="text-[11px] text-muted-foreground leading-relaxed">{metric.detail}</p>
                          </div>
                       ))}
                    </div>

                    {!scoreResult.architected ? (
                      <Button onClick={handleSendToArchitect} disabled={isArchitecting} variant="outline" className="w-full mt-2 text-xs h-8 border-indigo-500/30 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20">
                        {isArchitecting ? <><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Abstracting...</> : <>Send to Story Architect <ChevronRight className="w-3 h-3 ml-1" /></>}
                      </Button>
                    ) : (
                      <div className="mt-4 border-t border-border pt-4">
                        <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider py-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg mb-3 border border-emerald-500/20">
                          <CheckCircle2 className="w-4 h-4" /> Rewrite Complete
                        </div>
                        <div className="space-y-2">
                          <h5 className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Changes Applied:</h5>
                          <ul className="space-y-1.5 list-disc pl-4 text-xs text-foreground">
                             <li><span className="text-emerald-600 dark:text-emerald-400 font-bold">+ Added</span> introductory hook emphasizing leadership failure (Vulnerability Signal).</li>
                             <li><span className="text-red-600 dark:text-red-400 font-bold">- Removed</span> the 'Cloud Migration' anecdote previously used in Wharton Essay 2.</li>
                             <li><span className="text-purple-600 dark:text-purple-400 font-bold">~ Restructured</span> closing sentence to explicitly state short-term goal aligned with NAO.</li>
                          </ul>
                        </div>
                      </div>
                    )}
                 </div>
              </div>
            )}

            <Button 
              onClick={handleScoreAlignment} 
              disabled={isScoring || isArchitecting}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              {isScoring ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Cross-Referencing DNA...</>
              ) : scoreResult ? (
                "Re-evaluate Draft"
              ) : (
                "Score School Alignment"
              )}
            </Button>
         </div>
       </div>
    </div>
  );
}
