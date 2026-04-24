"use client";

import { createClient } from "@/lib/supabase/client";
import type { LatestUserFormRow } from "@/types/dashboard";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type DashboardDataContextValue = {
  loading: boolean;
  latestForm: LatestUserFormRow | null;
  hasNao: boolean;
  refresh: () => Promise<void>;
};

const DashboardDataContext = createContext<DashboardDataContextValue | undefined>(undefined);

function hasNonEmptyNao(value: unknown): boolean {
  if (!value) {
    return false;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === "object") {
    return Object.keys(value as Record<string, unknown>).length > 0;
  }

  return false;
}

export function DashboardDataProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [latestForm, setLatestForm] = useState<LatestUserFormRow | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);

    try {
      const supabase = createClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        setLatestForm(null);
        return;
      }

      const { data, error } = await supabase
        .from("UserForm")
        .select(
          "full_name, age, primary_industry, years_experience, career_summary, short_term_goal, target_schools, nao_json, created_at"
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        setLatestForm(null);
        return;
      }

      setLatestForm((data as LatestUserFormRow | null) ?? null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo<DashboardDataContextValue>(() => {
    return {
      loading,
      latestForm,
      hasNao: hasNonEmptyNao(latestForm?.nao_json),
      refresh
    };
  }, [latestForm, loading, refresh]);

  return <DashboardDataContext.Provider value={value}>{children}</DashboardDataContext.Provider>;
}

export function useDashboardData(): DashboardDataContextValue {
  const context = useContext(DashboardDataContext);

  if (!context) {
    throw new Error("useDashboardData must be used within DashboardDataProvider.");
  }

  return context;
}
