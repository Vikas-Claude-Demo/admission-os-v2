"use client";

import { useState } from "react";
import { FileUser, ShieldAlert, Sparkles, Building2, UserPlus, CheckCircle2, Copy, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RecommendationsModule() {
  const [activeTab, setActiveTab] = useState<"selection" | "briefing" | "alignment">("briefing");

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <header className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Module 3: Recommendation Letters</h1>
        <p className="text-sm text-muted-foreground">Manage your recommenders, build briefing documents, and evaluate alignment.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div 
          onClick={() => setActiveTab("selection")}
          className={`glass-panel p-6 rounded-2xl border cursor-pointer transition-all ${activeTab === 'selection' ? 'border-indigo-500 bg-black/5 dark:bg-white/5 shadow-md' : 'border-border hover:border-indigo-500/50'}`}
        >
          <FileUser className={`w-8 h-8 mb-4 ${activeTab === 'selection' ? 'text-indigo-500 dark:text-indigo-400' : 'text-muted-foreground'}`} />
          <h3 className="font-semibold text-lg mb-2 text-foreground">Recommender Selection</h3>
          <p className="text-sm text-muted-foreground mb-4">Evaluate your network based on depth of relationship, seniority, and specific skill overlap.</p>
          <div className="text-xs bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-medium px-3 py-1 rounded inline-block">Score: 85/100</div>
        </div>

        <div 
          onClick={() => setActiveTab("briefing")}
          className={`glass-panel p-6 rounded-2xl border cursor-pointer transition-all ${activeTab === 'briefing' ? 'border-emerald-500 bg-black/5 dark:bg-white/5 shadow-md' : 'border-border hover:border-emerald-500/50'}`}
        >
          <Building2 className={`w-8 h-8 mb-4 ${activeTab === 'briefing' ? 'text-emerald-500 dark:text-emerald-400' : 'text-muted-foreground'}`} />
          <h3 className="font-semibold text-lg mb-2 text-foreground">Briefing Document</h3>
          <p className="text-sm text-muted-foreground mb-4">Auto-generate a structured brief outlining exactly what stories and traits each recommender should reference.</p>
          <div className="text-xs bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-medium px-3 py-1 rounded inline-block">Active Workspace</div>
        </div>

        <div 
          onClick={() => setActiveTab("alignment")}
          className={`glass-panel p-6 rounded-2xl border cursor-pointer transition-all ${activeTab === 'alignment' ? 'border-amber-500 bg-black/5 dark:bg-white/5 shadow-md' : 'border-border hover:border-amber-500/50'}`}
        >
          <ShieldAlert className={`w-8 h-8 mb-4 ${activeTab === 'alignment' ? 'text-amber-500 dark:text-amber-400' : 'text-muted-foreground'}`} />
          <h3 className="font-semibold text-lg mb-2 text-foreground">Story Alignment Checker</h3>
          <p className="text-sm text-muted-foreground mb-4">Cross-reference recommender drafts against your essays to prevent story duplication or contradictions.</p>
          <div className="text-xs bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-medium px-3 py-1 rounded inline-block">Awaiting Uploads</div>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-border min-h-[500px]">
        {activeTab === "briefing" && (
          <div className="animate-fade-in space-y-8">
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Building2 className="text-emerald-500 w-5 h-5" /> 
                  Recommender Briefing Document
                </h2>
                <p className="text-sm text-muted-foreground mt-1">Generated based on your Strategy Agent Narrative Anchor Object.</p>
              </div>
              <div className="flex gap-3">
                 <Button variant="outline"><Copy className="w-4 h-4 mr-2" /> Copy text</Button>
                 <Button className="bg-emerald-500 hover:bg-emerald-600 text-white"><Send className="w-4 h-4 mr-2" /> Send to Recommender</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="md:col-span-1 border-r border-border pr-8 space-y-6">
                 <div>
                   <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Recommender Profile</h4>
                   <div className="p-4 rounded-xl border border-border bg-black/5 dark:bg-white/5">
                      <div className="font-medium text-foreground mb-1">Sarah Jenkins</div>
                      <div className="text-xs text-muted-foreground mb-3">VP of Engineering, Acme Tech</div>
                      <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-2 py-1 rounded w-fit">
                        <CheckCircle2 className="w-3 h-3" /> Selected Profile
                      </div>
                   </div>
                 </div>

                 <div>
                   <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Instructions</h4>
                   <p className="text-xs text-muted-foreground leading-relaxed">
                     This brief is generated to ensure Sarah touches upon the <strong>Cross-Functional Leadership</strong> trait, which you are not covering directly in your main Esssay 1. This prevents overlap and paints a holistic picture.
                   </p>
                 </div>
               </div>

               <div className="md:col-span-2 prose dark:prose-invert max-w-none prose-sm">
                 <h4>Draft Briefing Document</h4>
                 <div className="p-6 bg-white dark:bg-black/20 border border-border rounded-xl font-serif text-sm leading-relaxed text-foreground space-y-4">
                    <p>Hi Sarah,</p>
                    <p>Thank you again for agreeing to write my recommendation letter for my Stanford GSB and HBS applications! I know how busy you are, so I've put together this brief to make the process as seamless as possible.</p>
                    
                    <p><strong>Core Narrative Strategy</strong><br/>
                    In my main essays, I am focusing primarily on my transition from individual contributor to product strategist. However, Admissions Committees are looking for explicit validation of my people-leadership capabilities from mentors like you.</p>

                    <p><strong>Suggested Stories to Highlight:</strong></p>
                    <ul className="list-disc pl-5 space-y-2">
                       <li><strong>The Q3 Microservices Migration:</strong> When my team was blocked by the infrastructure team, I'd love if you could highlight how I stepped in to mediate the cross-functional dispute and got the launch back on track.</li>
                       <li><strong>Mentorship of Junior Devs:</strong> If possible, mentioning how I instituted the Friday code-review pairing sessions that reduced onboarding time by 40% would strongly support my "community building" narrative.</li>
                    </ul>

                    <p><strong>Key Traits to Emphasize (Stanford GSB Rubric):</strong></p>
                    <ul className="list-disc pl-5">
                       <li>Intellectual Vitality (willingness to challenge the status quo)</li>
                       <li>Demonstrated Leadership Potential</li>
                    </ul>

                    <p>Please let me know if you would like to grab coffee to discuss this! The deadline is September 12th.</p>
                    <p>Best,<br/>Shridhar</p>
                 </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === "selection" && (
          <div className="animate-fade-in flex flex-col items-center justify-center h-64 text-center">
            <UserPlus className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Add Recommenders to your Network</h3>
            <p className="text-sm text-muted-foreground max-w-md">Input potential recommenders, and the Strategy Agent will rank them based on seniority, tenure, and school-fit criteria.</p>
            <Button className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white">Add New Contact</Button>
          </div>
        )}

        {activeTab === "alignment" && (
          <div className="animate-fade-in flex flex-col items-center justify-center h-64 text-center">
            <ShieldAlert className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Drafts Uploaded Yet</h3>
            <p className="text-sm text-muted-foreground max-w-md">Once Sarah sends you her draft (or you write it on her behalf), upload it here to let the Gap Agent analyze it for overlaps with your main essay.</p>
            <Button className="mt-6 border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10" variant="outline">Upload Recommender Draft</Button>
          </div>
        )}
      </div>
    </div>
  );
}
