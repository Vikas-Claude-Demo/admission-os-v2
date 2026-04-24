"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function TopBar() {
  const pathname = usePathname();
  
  // Simple breadcrumb logic based on pathname
  const segments = pathname.split('/').filter(Boolean).map(s => s.charAt(0).toUpperCase() + s.slice(1));
  
  return (
    <header className="h-14 bg-panel border-b border-rule flex items-center px-6 gap-5 overflow-hidden">
      <div className="font-serif font-medium text-[17px] tracking-[-0.01em] italic flex items-center gap-2.5 shrink-0">
        <div className="w-[7px] h-[7px] bg-accent-clr rounded-full" />
        Admissions OS
      </div>
      
      <div className="flex-1 font-serif text-sm text-ink-soft flex items-center gap-2.5 truncate">
        {segments.map((s, i) => (
          <span key={i} className="flex items-center gap-2.5">
            {i > 0 && <span className="opacity-35">/</span>}
            {i === segments.length - 1 ? <em className="italic text-ink font-normal">{s}</em> : <span>{s}</span>}
          </span>
        ))}
      </div>
      
      <div className="flex items-center gap-2.5 font-mono text-[11px] text-ink-faint shrink-0">
        <Link href="/dashboard" className="text-ink-soft hover:bg-panel-deep hover:text-ink px-2.5 py-1 rounded transition-colors">
          Overview
        </Link>
      </div>
    </header>
  );
}
