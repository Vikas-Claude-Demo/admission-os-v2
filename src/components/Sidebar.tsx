"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  GraduationCap, 
  LayoutDashboard, 
  FileText, 
  Users, 
  BookOpen, 
  Building2, 
  Award, 
  LineChart, 
  Video 
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const NAVIGATION = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Platform Manual", href: "/dashboard/manual", icon: BookOpen },
  { name: "1. Consultation Form", href: "/dashboard/consultation", icon: FileText },
  { name: "2. Resume / CV", href: "/dashboard/resume", icon: FileText },
  { name: "3. Recommendations", href: "/dashboard/recommendations", icon: Users },
  { name: "4. Personal Essays", href: "/dashboard/essays", icon: BookOpen },
  { name: "5. School Essays", href: "/dashboard/school-essays", icon: Building2 },
  { name: "6. Scholarship Essays", href: "/dashboard/scholarships", icon: Award },
  { name: "7. Transcripts", href: "/dashboard/transcripts", icon: LineChart },
  { name: "8. Interview Prep", href: "/dashboard/interviews", icon: Video },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-border bg-black/5 dark:bg-black/20 backdrop-blur-xl flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6 flex items-center justify-between border-b border-border transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <GraduationCap className="text-white w-5 h-5" />
          </div>
          <span className="font-bold tracking-tight text-foreground">Admission OS</span>
        </div>
        <ThemeToggle />
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-3">
        <div className="text-xs font-semibold text-muted-foreground tracking-wider uppercase px-3 mb-2">Modules</div>
        {NAVIGATION.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive 
                  ? "bg-black/10 dark:bg-white/10 text-foreground font-medium" 
                  : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-indigo-500 dark:text-indigo-400" : ""}`} />
              {item.name}
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-border">
        <div className="glass-panel p-4 rounded-xl flex flex-col gap-2">
          <div className="text-xs font-semibold text-muted-foreground">Application Health</div>
          <div className="w-full bg-black/10 dark:bg-white/10 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 w-3/4 h-full" />
          </div>
          <div className="text-[10px] text-muted-foreground text-right">75% Complete</div>
        </div>
      </div>
    </div>
  );
}
