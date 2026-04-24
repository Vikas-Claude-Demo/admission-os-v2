"use client";

import { DashboardDataProvider, useDashboardData } from "@/components/DashboardDataProvider";
import { NAOPanel } from "@/components/NAOPanel";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { hasNao, loading } = useDashboardData();

  useEffect(() => {
    if (loading || hasNao) {
      return;
    }

    const allowedRoutes = new Set(["/dashboard", "/dashboard/consultation", "/dashboard/profile"]);

    if (!allowedRoutes.has(pathname)) {
      router.replace("/dashboard/consultation");
    }
  }, [hasNao, loading, pathname, router]);

  return (
    <div className="grid grid-cols-[232px_1fr_340px] grid-rows-[56px_1fr] h-screen overflow-hidden bg-paper text-ink font-sans">
      <div className="col-span-3">
        <TopBar />
      </div>

      <Sidebar />

      <main className="overflow-y-auto bg-paper p-14 pb-20 custom-scrollbar">
        <div className="max-w-[800px] mx-auto">
          {children}
        </div>
      </main>

      <NAOPanel />
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardDataProvider>
      <DashboardShell>{children}</DashboardShell>
    </DashboardDataProvider>
  );
}
