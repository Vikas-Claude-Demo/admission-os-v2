"use client";

import { useState } from "react";
import { TipTapEditor } from "@/components/TipTapEditor";
import { AgentWorkflow, AgentInfo } from "@/components/AgentWorkflow";
import { Button } from "@/components/ui/button";
import { Play, Search, GraduationCap } from "lucide-react";
import { runFullOrchestrationCycle, OrchestrationTrace } from "@/lib/orchestrator";

export default function EssaysModule() {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "scoring" | "analyzing" | "blocked" | "approved">("idle");
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null);

  const [agents, setAgents] = useState<AgentInfo[]>([
    {
      id: "agent-1",
      name: "Strategy Agent",
      role: "Builds positioning & Narrative Anchor Object (NAO).",
      status: "idle",
    },
    {
      id: "agent-2",
      name: "Framework Agent",
      role: "Validates logic against admissions frameworks.",
      status: "idle",
    },
    {
      id: "agent-3",
      name: "Story Architect",
      role: "Analyzes structural architecture & story arc.",
      status: "idle",
    },
    {
      id: "agent-4",
      name: "Editing Agent",
      role: "Line-level editing without changing student voice.",
      status: "idle",
    },
    {
      id: "agent-5",
      name: "Gap Agent",
      role: "Cross-document holistic analysis.",
      status: "idle",
    }
  ]);

  const runEvaluation = async () => {
    setStatus("analyzing");
    
    // Convert current agents to 'idle'
    setAgents(agents.map(a => ({ ...a, status: "idle", feedback: "" })));

    await runFullOrchestrationCycle(content, (trace) => {
      // Sync the orchestrator trace to the UI components
      const updatedAgents = [...agents];
      
      trace.history.forEach((response, index) => {
        updatedAgents[index].status = response.status === "blocked" ? "blocked" : "completed";
        updatedAgents[index].feedback = response.feedback;
      });

      // Find the currently running agent (the first one that hasn't fired yet)
      const runningIdx = trace.history.length;
      if (runningIdx < 5 && trace.finalStatus !== "blocked") {
        updatedAgents[runningIdx].status = "running";
        setActiveAgentId(agents[runningIdx].id);
      } else {
        setActiveAgentId(null);
      }

      setAgents(updatedAgents);

      if (trace.finalStatus === "blocked") {
         setStatus("blocked");
      } else if (trace.history.length === 5) {
         setStatus("approved");
      }
    });
  };

  const getScoreColor = () => {
    switch (status) {
      case "approved": return "text-emerald-500 dark:text-emerald-400";
      case "blocked": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Module 4: Personal Essays</h1>
          <p className="text-sm text-muted-foreground">Write, evaluate, and perfect your core narrative essays.</p>
        </div>
        
        <div className="flex gap-4">
          <Button variant="outline" className="gap-2 border-border opacity-70 hover:opacity-100 transition">
            <Search className="w-4 h-4" /> Compare Schools
          </Button>
          <Button 
            onClick={runEvaluation} 
            disabled={status === "analyzing" || status === "scoring"}
            className="gap-2"
          >
            {status === "analyzing" ? "Orchestrating Agents..." : "Evaluate Submission"}
            <Play className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-6 flex flex-col">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-xl font-semibold mb-1 text-foreground">Stanford GSB - What matters most?</h2>
              <p className="text-sm text-muted-foreground">Word limit: 650 words. Focus on authenticity and vulnerability.</p>
            </div>
          </div>
          
          <div className="flex-1">
            <TipTapEditor 
              content={content} 
              onChange={setContent} 
              status={status}
            />
          </div>
        </div>

        <div className="space-y-8 pl-4 lg:border-l border-border">
          <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group border-border">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <h3 className="text-muted-foreground text-sm tracking-wider uppercase font-semibold mb-1">Current Score</h3>
                <div className={`text-4xl font-bold tracking-tighter ${getScoreColor()}`}>
                  {status === "approved" ? "92" : status === "blocked" ? "Gate" : "--"}
                  <span className="text-lg text-muted-foreground/50 font-medium ml-1">/100</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">Layer 1: Objective</div>
                <div className="flex gap-1 justify-end">
                  {[1,2,3,4].map(v => <div key={v} className={`w-2 h-2 rounded-full ${status === 'approved' ? 'bg-emerald-500' : 'bg-black/10 dark:bg-white/20'}`} />)}
                </div>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-6" />

          <AgentWorkflow agents={agents} activeAgentId={activeAgentId} />
        </div>
      </div>
    </div>
  );
}
