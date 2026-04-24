"use client";

import { logout } from "@/app/auth/actions";
import { useDashboardData } from "@/components/DashboardDataProvider";
import { Check, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const NAVIGATION = [
  { id: 'home',       href: '/dashboard',         num: '·', name: 'Overview',          agent: 'Start here' },
  { id: 'intake',     href: '/dashboard/consultation',      num: '1', name: 'Intake',            agent: '30 questions' },
  { id: 'strategy',   href: '/dashboard/strategy',    num: '2', name: 'Strategy',          agent: 'NAO v1' },
  { id: 'editor',     href: '/dashboard/essays',      num: '3', name: 'Essay editor',      agent: 'Story Architect · Editing' },
  { id: 'deep',       href: '/dashboard/deep-review', num: '4', name: 'Deep review',       agent: 'Scoring · Advisor' },
  { id: 'framework',  href: '/dashboard/framework',   num: '5', name: 'Framework gate',    agent: 'Unanchored claims' },
  { id: 'gaps',       href: '/dashboard/gaps',        num: '6', name: 'Gap analysis',      agent: 'Missing evidence' },
  { id: 'schools',    href: '/dashboard/school-essays',  num: '7', name: 'School comparison', agent: 'Per-school fit' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { hasNao } = useDashboardData();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await logout();
  }

  return (
    <>
    <aside className="w-[232px] bg-panel border-r border-rule flex flex-col h-full overflow-y-auto pt-5 px-4">
      <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-faint pb-3 border-b border-rule mb-2.5 px-2">
        Journey
      </div>
      
      <div className="flex-1 flex flex-col gap-0.5">
        {NAVIGATION.map((s) => {
          const isRouteAllowedWithoutNao = s.id === "home" || s.id === "intake";
          const isLocked = !hasNao && !isRouteAllowedWithoutNao;
          const isActive = pathname === s.href;
          const isDone = false; 
          
          return (
            <Link 
              key={s.href} 
              href={isLocked ? "#" : s.href}
              className={`flex items-start gap-2.5 p-2.5 rounded-[5px] transition-colors group ${
                isLocked
                  ? "opacity-45 pointer-events-none text-ink-faint"
                  : isActive 
                  ? "bg-accent-soft text-ink font-medium" 
                  : "text-ink-soft hover:bg-panel-deep"
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-medium shrink-0 mt-0.5 ${
                isLocked
                  ? "bg-paper-deep text-ink-faint"
                  : isActive
                    ? "bg-accent-clr text-paper"
                    : "bg-paper-deep text-ink-faint"
              }`}>
                {isDone && !isActive ? <Check className="w-3 h-3" /> : s.num}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-medium leading-[1.3] font-sans">
                  {s.name}
                </div>
                <div className={`font-mono text-[10px] mt-0.5 leading-[1.3] ${
                  isLocked ? "text-ink-faint" : isActive ? "text-ink-soft" : "text-ink-faint"
                }`}>
                  {isLocked ? "Locked until NAO is generated" : s.agent}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-3.5 pt-3 border-t border-rule font-mono text-[10px] text-ink-faint leading-[1.5] pb-6 px-2">
        <Link
          href="/dashboard/profile"
          className="mt-2 w-full border border-rule text-ink-soft tracking-[0.05em] uppercase p-1.5 rounded-[4px] hover:bg-panel-deep hover:text-ink transition-colors flex items-center justify-center"
        >
          Profile
        </Link>
        <button
          onClick={() => setShowLogoutModal(true)}
          className="mt-2 w-full flex items-center justify-center gap-1.5 border border-rule text-ink-soft tracking-[0.05em] uppercase p-1.5 rounded-[4px] hover:bg-danger-soft hover:text-danger hover:border-danger transition-colors"
        >
          <LogOut className="w-3 h-3" />
          Log out
        </button>
      </div>

    </aside>

      {showLogoutModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60" onClick={() => setShowLogoutModal(false)}>
          <div className="bg-panel border border-rule rounded-[10px] p-6 w-[320px] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-danger-soft flex items-center justify-center shrink-0">
                <LogOut className="w-4 h-4 text-danger" />
              </div>
              <h2 className="text-[15px] font-semibold text-ink font-sans">Log out?</h2>
            </div>
            <p className="text-[13px] text-ink-soft font-sans leading-[1.6] mb-5">
              You&apos;ll be returned to the login screen. Your progress is saved in this browser.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 border border-rule text-ink-soft text-[12px] font-mono tracking-[0.05em] uppercase py-2 px-3 rounded-[5px] hover:bg-panel-deep transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex-1 text-[12px] font-mono tracking-[0.05em] uppercase py-2 px-3 rounded-[5px] transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: "var(--danger)", color: "#ffffff" }}
              >
                {loggingOut ? "Signing out..." : "Log out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
