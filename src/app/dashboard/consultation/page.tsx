"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowLeft, CheckCircle2, User, Briefcase, GraduationCap, Flag, Loader2, Target, AlertTriangle } from "lucide-react";

export default function ConsultationModule() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const totalSteps = 4;

  const STEPS = [
    { id: 1, title: "Personal Background", icon: User, questions: "1-8" },
    { id: 2, title: "Work Experience", icon: Briefcase, questions: "9-16" },
    { id: 3, title: "Education & Scores", icon: GraduationCap, questions: "17-23" },
    { id: 4, title: "Goals & Schools", icon: Flag, questions: "24-30" }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowDiagnostics(true);
    }, 2500);
  };

  if (showDiagnostics) {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in space-y-8">
        <header className="mb-8">
           <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Diagnostic Results</h1>
           <p className="text-muted-foreground">Your 30 definitions have been processed by the Strategy Agent.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-6 rounded-2xl border-border">
             <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Target className="text-indigo-500 w-5 h-5"/> Gap Analysis</h3>
             <ul className="space-y-4">
               <li className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-amber-700 dark:text-amber-400 text-sm">
                  <strong className="block mb-1">1. Over-indexed on Technical Execution</strong>
                  Your resume and story inventory lean too heavily on engineering metrics. We need to extract more people-leadership stories to satisfy the GSB/HBS rubrics.
               </li>
               <li className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-amber-700 dark:text-amber-400 text-sm">
                  <strong className="block mb-1">2. Short-term Goal Specificity</strong>
                  "Product Management in Big Tech" is too broad. We need to define the exact product niche (e.g., AI integration, Fintech platforms) to make the career bridge credible.
               </li>
             </ul>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-border bg-black/5 dark:bg-black/40">
             <h3 className="text-lg font-bold mb-4">Generated Profile Object (JSON)</h3>
             <pre className="text-xs text-muted-foreground p-4 bg-white dark:bg-black/50 border border-border rounded-xl overflow-x-auto">
{`{
  "user_id": "usr_91283",
  "track": "MBA",
  "industry": "Enterprise Software",
  "years_experience": 4,
  "leadership_style": "Collaborative technical",
  "voice_fingerprint": {
    "avg_sentence_length": 14.5,
    "jargon_density": "Medium",
    "tone": "Direct, structured"
  },
  "narrative_gaps": [
    "Technical over-index",
    "Goal specificity"
  ],
  "target_schools": ["Stanford GSB", "HBS", "Wharton"],
  "archetype_scores": {
    "Goals": 6,
    "Leadership": 8,
    "Failure": 4,
    "Values": 7
  }
}`}
             </pre>
          </div>
        </div>

        <div className="flex justify-center mt-8">
           <Button onClick={() => window.location.href = '/dashboard'} className="bg-indigo-500 hover:bg-indigo-600 text-white">Proceed to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <header className="mb-10 text-center">
        <h1 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Consultation Intake Form</h1>
        <p className="text-sm text-muted-foreground">This 30-question diagnostic powers your entire AI evaluation engine.</p>
      </header>

      {/* Progress Wizard */}
      <div className="flex justify-between items-center mb-12 relative px-4">
        <div className="absolute left-8 right-8 top-1/2 h-0.5 bg-border -z-10 -translate-y-1/2" />
        <div 
          className="absolute left-8 h-0.5 bg-indigo-500 -z-10 -translate-y-1/2 transition-all duration-500"
          style={{ width: `calc((100% - 4rem) * ${(step - 1) / (totalSteps - 1)})` }}
        />
        
        {STEPS.map((s) => {
          const isActive = s.id === step;
          const isPast = s.id < step;
          const Icon = s.icon;
          
          return (
            <div key={s.id} className="flex flex-col items-center gap-2 bg-background px-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-background transition-colors duration-300 ${
                isActive ? "bg-indigo-500 text-white" : 
                isPast ? "bg-emerald-500 text-white" : 
                "bg-black/5 dark:bg-white/5 text-muted-foreground"
              }`}>
                {isPast ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-center w-auto sm:w-24">
                <div className={isActive ? "text-indigo-600 dark:text-indigo-400" : isPast ? "text-foreground" : "text-muted-foreground/50"}>
                  {s.title}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Form Content Area */}
      <div className="glass-panel p-8 rounded-2xl border border-border shadow-sm">
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold mb-6 text-foreground">Personal Background</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">1. Full Name</label>
                <input type="text" className="w-full bg-white dark:bg-black/20 border border-border rounded-lg p-3 text-foreground focus:outline-none focus:border-indigo-500" defaultValue="Shridhar Yendamuri" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">2. Country of Citizenship</label>
                <input type="text" className="w-full bg-white dark:bg-black/20 border border-border rounded-lg p-3 text-foreground focus:outline-none focus:border-indigo-500" defaultValue="India" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">3. Primary Identity Archetype (Select one)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['First-Generation College', 'Underrepresented Minority', 'Military Veteran', 'International Applicant', 'Traditional Finance/Consulting', 'Non-Traditional (Arts/Non-Profit)'].map(opt => (
                    <div key={opt} className={`p-3 border rounded-lg cursor-pointer text-sm transition-colors ${
                      opt === 'International Applicant' ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-medium' : 'border-border bg-black/5 dark:bg-white/5 hover:bg-black/10 text-foreground'
                    }`}>
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold mb-6 text-foreground">Work Experience</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">9. Primary Industry</label>
                <select className="w-full bg-white dark:bg-black/20 border border-border rounded-lg p-3 text-foreground focus:outline-none focus:border-indigo-500">
                  <option>Enterprise Software / Tech</option>
                  <option>Fintech</option>
                  <option>Consulting</option>
                  <option>Investment Banking</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">10. Years of Full-Time Experience</label>
                <input type="number" className="w-full bg-white dark:bg-black/20 border border-border rounded-lg p-3 text-foreground focus:outline-none focus:border-indigo-500" defaultValue="4" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">11. Leadership Experience (Direct Reports or Cross-functional)</label>
                <textarea rows={3} className="w-full bg-white dark:bg-black/20 border border-border rounded-lg p-3 text-foreground focus:outline-none focus:border-indigo-500" defaultValue="Managed 2 junior engineers and led a cross-functional pod of 5 (design, marketing, QA) for a major Q3 launch." />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold mb-6 text-foreground">Education & Scores</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">17. Undergraduate Institution</label>
                <input type="text" className="w-full bg-white dark:bg-black/20 border border-border rounded-lg p-3 text-foreground focus:outline-none focus:border-indigo-500" defaultValue="Indian Institute of Technology (IIT)" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">18. Undergraduate GPA</label>
                <div className="flex gap-2">
                   <input type="text" className="w-full bg-white dark:bg-black/20 border border-border rounded-lg p-3 text-foreground focus:outline-none focus:border-indigo-500" defaultValue="3.74" />
                   <div className="flex items-center text-muted-foreground">OUT OF</div>
                   <input type="text" className="w-24 bg-white dark:bg-black/20 border border-border rounded-lg p-3 text-foreground" defaultValue="4.0" disabled />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">19. Standardized Test Score (GMAT/GRE/EA)</label>
                <input type="text" className="w-full bg-white dark:bg-black/20 border border-border rounded-lg p-3 text-foreground focus:outline-none focus:border-indigo-500" defaultValue="GMAT 710 (Q42, V45)" />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold mb-6 text-foreground">Goals & Target Schools</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">24. What is your immediate Short-Term Goal post-graduation?</label>
                <textarea rows={3} className="w-full bg-white dark:bg-black/20 border border-border rounded-lg p-3 text-foreground focus:outline-none focus:border-indigo-500" defaultValue="Product Management at a major tech company like Google or Microsoft, working on AI-driven enterprise tools." />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">25. What is your Long-Term Vision?</label>
                <textarea rows={3} className="w-full bg-white dark:bg-black/20 border border-border rounded-lg p-3 text-foreground focus:outline-none focus:border-indigo-500" defaultValue="To found an EdTech startup leveraging AI to provide personalized education at scale in emerging markets." />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">26. Target Schools (Comma separated)</label>
                <input type="text" className="w-full bg-white dark:bg-black/20 border border-border rounded-lg p-3 text-foreground focus:outline-none focus:border-indigo-500" defaultValue="Stanford GSB, HBS, Wharton" />
              </div>
            </div>
            
            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl mt-6">
               <div className="flex gap-2">
                 <AlertTriangle className="text-amber-600 dark:text-amber-400 w-5 h-5 shrink-0" />
                 <div>
                    <h4 className="text-sm font-bold text-amber-700 dark:text-amber-400">Ready for Strategy Agent</h4>
                    <p className="text-xs text-amber-600 dark:text-amber-400/80 mt-1">Clicking below will process your answers to create your profile object and Initial Gap Analysis.</p>
                 </div>
               </div>
            </div>
          </div>
        )}

        {/* Next/Prev Controls */}
        <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
          <Button 
            variant="ghost" 
            className={`gap-2 text-foreground ${step === 1 ? "opacity-0 pointer-events-none" : ""}`}
            onClick={() => setStep(s => Math.max(1, s - 1))}
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </Button>
          
          {step < totalSteps ? (
            <Button 
              className="gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-8"
              onClick={() => setStep(s => Math.min(totalSteps, s + 1))}
            >
              Next Section <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button 
              className="gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing Profile...</> : "Generate Diagnostics"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
