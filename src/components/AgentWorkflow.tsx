"use client";

import { CheckCircle2, Circle, Loader2, AlertTriangle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export type AgentStatus = "idle" | "running" | "completed" | "blocked";

export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  feedback?: string;
  gatePassed?: boolean;
}

export function AgentWorkflow({ agents, activeAgentId }: { agents: AgentInfo[], activeAgentId: string | null }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground tracking-wiser uppercase px-1">Agent Workflow</h3>
      <div className="flex flex-col gap-3 relative">
        {/* Connecting line */}
        <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-border z-0"></div>

        {agents.map((agent, idx) => {
          const isActive = agent.id === activeAgentId;
          const isCompleted = agent.status === "completed";
          const isBlocked = agent.status === "blocked";
          
          return (
            <motion.div 
              key={agent.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative z-10 flex gap-4 p-4 rounded-xl border backdrop-blur-md transition-all duration-300 ${
                isActive ? 'bg-indigo-500/10 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]' :
                isBlocked ? 'bg-destructive/10 border-destructive/30' :
                isCompleted ? 'bg-emerald-500/5 dark:bg-emerald-500/5 border-emerald-500/20' :
                'bg-black/5 dark:bg-black/20 border-border'
              }`}
            >
              <div className="mt-0.5 bg-background rounded-full">
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                ) : isBlocked ? (
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                ) : isActive ? (
                  <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
                ) : (
                  <Circle className="w-6 h-6 text-muted-foreground opacity-50" />
                )}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-semibold ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{agent.name}</h4>
                  {isActive && <span className="text-[10px] uppercase font-bold text-indigo-500 tracking-wider animate-pulse">Running</span>}
                  {isBlocked && <span className="text-[10px] uppercase font-bold text-destructive tracking-wider">Gate Blocked</span>}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{agent.role}</p>
                
                {agent.feedback && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className={`mt-3 p-3 rounded-md text-sm ${
                      isBlocked ? 'bg-destructive/10 text-destructive border border-destructive/20' : 'bg-black/5 dark:bg-white/5 text-foreground border border-border'
                    }`}
                  >
                    {agent.feedback}
                    {isBlocked && (
                      <button className="mt-2 text-xs font-semibold flex items-center gap-1 text-destructive hover:text-destructive/80 transition-colors">
                        Resolve Issues <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  );
}
