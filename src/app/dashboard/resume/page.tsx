"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Wand2, RefreshCw } from "lucide-react";

export default function ResumeModule() {
  const [bullet, setBullet] = useState("Responsible for managing a team of 5 people and increasing sales.");
  const [isRewriting, setIsRewriting] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  const handleRewrite = () => {
    setIsRewriting(true);
    // Simulate AI delay
    setTimeout(() => {
      setOptions([
        "Led a 5-person cross-functional team to drive Q3 sales initiatives, resulting in a 24% revenue increase ($1.2M) YoY.",
        "Directed sales strategy and managed 5 direct reports, overachieving annual quota by 130% through automated lead targeting."
      ]);
      setIsRewriting(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <header className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Module 2: Resume / CV</h1>
        <p className="text-sm text-muted-foreground">Analyze career trajectory and optimize bullets for AdCom scannability.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        {/* Editor Area */}
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl border border-border overflow-hidden flex flex-col min-h-[500px]">
            {/* Toolbar */}
            <div className="bg-black/5 dark:bg-white/5 border-b border-border p-3 flex gap-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">PDF Upload</Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Template library</Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground ml-auto">Import LinkedIn</Button>
            </div>
            
            {/* Simulated Resume Area */}
            <div className="p-12 bg-white text-black flex-1 font-serif shadow-inner">
              <h1 className="text-3xl text-center mb-1 font-bold">SHRIDHAR YENDAMURI</h1>
              <p className="text-center text-sm mb-6 pb-4 border-b border-gray-300">New York, NY | shridhar@example.com | linkedin.com/in/shridhar</p>
              
              <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b border-gray-300 pb-1">Professional Experience</h2>
              <div className="mb-4">
                <div className="flex justify-between font-bold">
                  <span>Product Manager, Core Platform</span>
                  <span>2022 - Present</span>
                </div>
                <div className="flex justify-between text-sm italic mb-2">
                  <span>Acme Tech Corp</span>
                  <span>New York, NY</span>
                </div>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li className="bg-indigo-100 text-indigo-900 border border-indigo-300 px-1 rounded inline-block cursor-pointer shadow-sm">
                    {bullet}
                  </li>
                  <li>Spearheaded the migration of legacy infrastructure to cloud-native microservices architecture.</li>
                  <li>Collaborated with engineering, design, and marketing to launch v2.0 ahead of schedule.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* AI Tools Panel */}
        <div className="space-y-6">
          {/* Bullet Rewriter Module */}
          <div className="glass-panel p-6 rounded-2xl border-border relative overflow-hidden bg-gradient-to-br from-indigo-500/5 to-transparent">
            <div className="absolute top-0 right-0 p-4">
              <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-400 opacity-50" />
            </div>
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-4 text-foreground">
              AI Bullet Rewriter
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white/50 dark:bg-black/40 p-4 rounded-xl border border-border shadow-sm">
                <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-semibold">Original Draft</div>
                <p className="text-sm italic text-foreground">"{bullet}"</p>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleRewrite} 
                  disabled={isRewriting}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 gap-2 text-white"
                >
                  {isRewriting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                  {isRewriting ? "Optimizing Impact..." : "Enhance Scannability"}
                </Button>
              </div>

              {options.length > 0 && (
                <div className="pt-4 space-y-3 animate-fade-in">
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wider font-semibold flex justify-between">
                    <span>Generated Options</span>
                    <span>25 pts (Quantification)</span>
                  </div>
                  
                  {options.map((opt, i) => (
                    <div key={i} className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 p-4 rounded-xl cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all group shadow-sm">
                      <p className="text-sm text-foreground dark:text-white/90 leading-relaxed mb-3">{opt}</p>
                      <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="outline" className="h-7 text-xs border-indigo-300 dark:border-indigo-500/50 bg-indigo-100 dark:bg-indigo-500/20 hover:bg-indigo-200 dark:hover:bg-indigo-500 text-indigo-800 dark:text-white">
                          Accept <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-border">
            <h3 className="font-semibold text-lg mb-4 text-foreground">Trajectory Analysis</h3>
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full border-4 border-amber-500 flex items-center justify-center font-bold text-amber-600 dark:text-amber-500">
                A-
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Strong progression in scope. Lack of direct people-leadership signals in early career.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
