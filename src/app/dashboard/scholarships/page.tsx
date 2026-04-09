"use client";

import { useState } from "react";
import { Award, Target, AlertCircle, FileText, Upload, Loader2, CheckCircle2, ChevronRight, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TipTapEditor } from "@/components/TipTapEditor";

export default function ScholarshipsModule() {
  const [activeTrack, setActiveTrack] = useState<"needs" | "merit">("merit");
  const [content, setContent] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEvaluate = () => {
    setIsEvaluating(true);
    setEvaluationResult(null);

    // Simulate specialized Scholarship rubric check
    setTimeout(() => {
      setIsEvaluating(false);
      if (activeTrack === "merit") {
        setEvaluationResult({
          score: 82,
          verdict: "Strong Foundation, Needs Scale",
          edited: false,
          feedback: [
            { id: "1", title: "Exponential Scale Trajectory", status: "pass", description: "Clear pivot mapping from managing 4 devs to steering global technical strategy." },
            { id: "2", title: "Outlier Performance Metrics", status: "fail", description: "Lacking quantification. You mention 'greatly improved' speed, but Knight-Hennessy requires explicit percentages or revenue numbers." },
            { id: "3", title: "Intellectual Vitality", status: "pass", description: "The anecdote about restructuring the legacy monolith demonstrates willingness to challenge norms." }
          ]
        });
      } else {
        setEvaluationResult({
          score: 91,
          verdict: "Excellent Contextualization",
          edited: false,
          feedback: [
            { id: "1", title: "Structural Hurdle Definition", status: "pass", description: "Explicit description of being a first-generation student without early-career network access." },
            { id: "2", title: "Foundation Alignment", status: "pass", description: "Directly bridges to Toigo's mission of diverse financial leadership." },
          ]
        });
      }
    }, 2500);
  };

  const handleSendToEditor = () => {
    setIsEditing(true);
    setTimeout(() => {
      setIsEditing(false);
      setContent("<p>Instead of vague declarations about speed improvements, I documented and presented a rigorous regression analysis that proved our microservices refactor reduced latency by 140% and saved the firm $2.3M in annual compute costs. This data-driven approach wasn't just optimization; it was the foundation of our entire Q4 revenue strategy...</p>");
      setEvaluationResult((prev: any) => prev ? { 
        ...prev, 
        score: 96, 
        verdict: "Exceptional Application",
        edited: true, 
        feedback: prev.feedback.map((f: any) => f.id === "2" ? { ...f, status: "pass", description: "Resolved by Editing Agent: Explicitly quantified latency reduction to 140% and modeled the $2.3M cost saving." } : f) 
      } : null);
    }, 3000);
  };

  const resetTrack = (track: "needs" | "merit") => {
    setActiveTrack(track);
    setEvaluationResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <header className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Module 6: Scholarship Essays</h1>
        <p className="text-sm text-muted-foreground">Draft standalone essays decoupled from standard MBA admissions rubrics.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div 
          onClick={() => resetTrack("needs")}
          className={`glass-panel p-6 rounded-2xl border cursor-pointer transition-colors ${activeTrack === "needs" ? 'border-indigo-500 bg-indigo-500/5' : 'border-border hover:border-indigo-500/50'}`}
        >
          <Target className={`w-8 h-8 mb-4 ${activeTrack === "needs" ? 'text-indigo-500' : 'text-indigo-500 dark:text-indigo-400'}`} />
          <h3 className="font-semibold text-lg mb-2 text-foreground">Needs-Based Tracks</h3>
          <p className="text-sm text-muted-foreground">Focus on financial context, potential trajectories, and overcoming structural disadvantages or hurdles.</p>
        </div>

        <div 
          onClick={() => resetTrack("merit")}
          className={`glass-panel p-6 rounded-2xl border cursor-pointer transition-colors ${activeTrack === "merit" ? 'border-emerald-500 bg-emerald-500/5' : 'border-border hover:border-emerald-500/50'}`}
        >
          <Award className={`w-8 h-8 mb-4 ${activeTrack === "merit" ? 'text-emerald-500' : 'text-emerald-500 dark:text-emerald-400'}`} />
          <h3 className="font-semibold text-lg mb-2 text-foreground">Merit-Based Tracks</h3>
          <p className="text-sm text-muted-foreground">Focus on quantifiable excellence, scalable impact, and overarching visionary industry alignment.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 animate-fade-in">
        <div className="flex flex-col space-y-4">
           <div className="flex justify-between items-end mb-2">
              <div>
                 <h2 className="text-xl font-semibold mb-1 text-foreground">
                    {activeTrack === "merit" ? 'Knight-Hennessy Scholars Program' : 'Toigo Foundation Fellowship'}
                 </h2>
                 <p className="text-sm text-muted-foreground">
                    {activeTrack === "merit" ? "Prompt: How will your leadership trajectory scale to affect systemic change in your industry?" : "Prompt: Describe a structural hurdle you have faced and how you plan to leverage this fellowship to bridge the gap."}
                 </p>
              </div>
              <Button variant="outline" size="sm" className="gap-2"><Upload className="w-4 h-4"/> Load Draft</Button>
           </div>
           
           <div className="flex-1 relative">
              <TipTapEditor content={content} onChange={setContent} status={(isEvaluating || isEditing) ? "analyzing" : "idle"} />
              
              {/* Overlay when scoring/editing */}
              {(isEvaluating || isEditing) && (
                 <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl border border-purple-500/30">
                    <Loader2 className="w-8 h-8 text-purple-500 animate-spin mb-4" />
                    <h3 className="text-lg font-bold text-foreground">
                      {isEvaluating ? "Strategy Agent Analyzing" : "Editing Agent Polishing"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isEvaluating ? `Searching for ${activeTrack === "merit" ? "Metrics of Scale" : "Structural Context"}...` : "Quantifying metrics and resolving passive voice..."}
                    </p>
                 </div>
               )}
           </div>
        </div>

        <div className="space-y-6 lg:pl-6 lg:border-l border-border">
           
           {!evaluationResult ? (
             <>
               <div className="p-5 rounded-xl border border-border bg-black/5 dark:bg-white/5 space-y-4">
                  <h4 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase flex items-center gap-2">
                     <FileText className="w-4 h-4" /> Rubric Requirements
                  </h4>
                  
                  {activeTrack === "merit" ? (
                     <ul className="space-y-3">
                        <li className="flex gap-3 text-sm">
                           <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                           <span className="text-foreground">Clear trajectory of exponential scale (e.g. pivoting from local to global impact).</span>
                        </li>
                        <li className="flex gap-3 text-sm">
                           <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                           <span className="text-foreground">Proof of 'Outlier' quantified performance metrics vs peers.</span>
                        </li>
                        <li className="flex gap-3 text-sm">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                           <span className="text-foreground">Strong intellectual vitality indicator.</span>
                        </li>
                     </ul>
                  ) : (
                     <ul className="space-y-3">
                        <li className="flex gap-3 text-sm">
                           <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                           <span className="text-foreground">Specific quantification of structural hurdles relative to peers.</span>
                        </li>
                        <li className="flex gap-3 text-sm">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                           <span className="text-foreground">Alignment with foundation's specific diversity goals.</span>
                        </li>
                     </ul>
                  )}
               </div>

               <div className="p-5 rounded-xl border border-blue-500/20 bg-blue-50 dark:bg-blue-500/10 space-y-2">
                  <h4 className="text-xs font-semibold text-blue-700 dark:text-blue-400 tracking-wider uppercase flex gap-2 items-center">
                     <AlertCircle className="w-4 h-4" /> Agent Advice
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-300/80 leading-relaxed">
                     Do not copy/paste Essay 1. Scholarships require you to be far more visionary and declarative. The Strategy Agent will scan this for "Vision" rather than "Vulnerability".
                  </p>
               </div>
             </>
           ) : (
             <div className="space-y-4 animate-fade-in">
                 <div className="p-6 rounded-2xl border flex flex-col items-center justify-center text-center bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/30">
                    <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Scholarship Fitness Score</h4>
                    <div className="text-5xl font-black text-foreground mb-1">{evaluationResult.score}<span className="text-xl text-muted-foreground font-medium">/100</span></div>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400/80 font-medium mt-2 bg-emerald-500/10 px-3 py-1 rounded inline-block">{evaluationResult.verdict}</p>
                 </div>

                 <div className="p-5 rounded-xl border border-border bg-black/5 dark:bg-white/5 space-y-4">
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2 flex items-center gap-2">
                       <FileText className="w-4 h-4" /> Trait Assessment
                    </h4>
                    
                    <div className="space-y-3">
                       {evaluationResult.feedback.map((item: any) => (
                          <div key={item.id} className="bg-background rounded-lg border border-border p-3 shadow-sm">
                             <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                                  {item.status === "pass" ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <XCircle className="w-3.5 h-3.5 text-red-500" />}
                                  {item.title}
                                </span>
                             </div>
                             <p className="text-[11px] text-muted-foreground leading-relaxed mt-1.5 pl-5 border-l-2 border-border ml-1.5">{item.description}</p>
                          </div>
                       ))}
                    </div>

                   {!evaluationResult.edited ? (
                     <Button 
                       onClick={handleSendToEditor}
                       disabled={isEditing}
                       variant="outline" 
                       className="w-full mt-2 text-xs h-8 border-indigo-500/30 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20"
                     >
                       {isEditing ? <><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Polishing syntax...</> : <>Send to Editing Agent <ChevronRight className="w-3 h-3 ml-1" /></>}
                     </Button>
                   ) : (
                     <div className="mt-4 border-t border-border pt-4">
                       <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider py-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg mb-3 border border-emerald-500/20">
                         <CheckCircle2 className="w-4 h-4" /> Rewrite Complete
                       </div>
                       <div className="space-y-2">
                         <h5 className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Edits Applied:</h5>
                         <ul className="space-y-1.5 list-disc pl-4 text-xs text-foreground">
                            <li><span className="text-emerald-600 dark:text-emerald-400 font-bold">+ Quantified</span> performance data (added specific '140% revenue increase').</li>
                            <li><span className="text-purple-600 dark:text-purple-400 font-bold">~ Refined</span> sentence structure to reduce passive voice.</li>
                         </ul>
                       </div>
                     </div>
                   )}
                 </div>
              </div>
           )}
           
           <Button 
             onClick={handleEvaluate} 
             disabled={isEvaluating || isEditing}
             className="w-full bg-foreground text-background hover:bg-foreground/90"
           >
              {isEvaluating ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Abstracting Constraints...</>
              ) : evaluationResult ? (
                "Re-analyze Essay"
              ) : (
                "Evaluate Scholarship Essay"
              )}
           </Button>
        </div>
      </div>
    </div>
  );
}
