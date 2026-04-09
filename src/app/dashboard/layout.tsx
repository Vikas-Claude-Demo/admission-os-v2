"use client";

import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-background min-h-screen text-foreground font-[family-name:var(--font-geist-sans)]">
      <Sidebar />
      
      <main className="flex-1 ml-64 relative min-h-screen pb-12">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 w-full h-full p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
