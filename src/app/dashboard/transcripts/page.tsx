"use client";

import { LineChart, BarChart } from "lucide-react";

export default function TranscriptsModule() {
  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <header className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Module 7: Transcripts & Tests</h1>
        <p className="text-sm text-muted-foreground">Competitiveness matrix comparing your statistics against school medians.</p>
      </header>

      <div className="glass-panel p-8 rounded-2xl border-white/10 dark:border-white/10 overflow-hidden mb-8">
        <h3 className="font-semibold text-lg mb-6 flex items-center gap-2 text-foreground">
          <BarChart className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
          Admissions Quant Score Profile
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Undergraduate GPA</div>
            <div className="text-3xl font-bold text-foreground">3.74<span className="text-base text-muted-foreground font-medium ml-1">/4.0</span></div>
          </div>
          <div>
             <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">GMAT Score</div>
             <div className="text-3xl font-bold text-foreground">710<span className="text-base text-muted-foreground font-medium ml-1">v45/q42</span></div>
          </div>
          <div>
             <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Trend Analysis</div>
             <div className="text-emerald-700 dark:text-emerald-400 font-medium bg-emerald-100 dark:bg-emerald-500/10 px-3 py-1 rounded inline-block text-sm">Positive Upward Trajectory</div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border-white/10 dark:border-white/10">
         <h3 className="font-semibold text-lg mb-6 flex items-center gap-2 text-foreground">
           <LineChart className="w-5 h-5 text-purple-500 dark:text-purple-400" />
           Competitiveness Matrix
         </h3>
         
         <div className="overflow-x-auto">
           <table className="w-full text-sm text-left text-foreground">
             <thead className="text-xs text-muted-foreground uppercase bg-black/5 dark:bg-white/5 border-b border-border">
               <tr>
                 <th className="px-6 py-3 rounded-tl-lg">Target School</th>
                 <th className="px-6 py-3">Median GPA</th>
                 <th className="px-6 py-3">Median GMAT</th>
                 <th className="px-6 py-3 rounded-tr-lg">Fit Rating</th>
               </tr>
             </thead>
             <tbody>
               <tr className="border-b border-border">
                 <td className="px-6 py-4 font-medium">Stanford GSB</td>
                 <td className="px-6 py-4"><span className="text-red-600 dark:text-red-400 font-medium">3.78</span> vs 3.74</td>
                 <td className="px-6 py-4"><span className="text-red-600 dark:text-red-400 font-medium">738</span> vs 710</td>
                 <td className="px-6 py-4"><span className="bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 px-2 py-1 rounded">Reach</span></td>
               </tr>
               <tr className="border-b border-border bg-black/[0.02] dark:bg-white/[0.02]">
                 <td className="px-6 py-4 font-medium">INSEAD</td>
                 <td className="px-6 py-4"><span className="text-emerald-600 dark:text-emerald-400 font-medium">3.50</span> vs 3.74</td>
                 <td className="px-6 py-4"><span className="text-amber-600 dark:text-amber-400 font-medium">708</span> vs 710</td>
                 <td className="px-6 py-4"><span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded">Strong Match</span></td>
               </tr>
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
}
