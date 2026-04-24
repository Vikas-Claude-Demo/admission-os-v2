"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setFirstName(data.user?.user_metadata?.first_name ?? "");
      setLastName(data.user?.user_metadata?.last_name ?? "");
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    setSaveStatus("idle");

    const supabase = createClient();

    const [authResult, profileResult] = await Promise.all([
      supabase.auth.updateUser({
        data: { first_name: firstName, last_name: lastName },
      }),
      supabase.from("profiles").update({
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`.trim(),
        updated_at: new Date().toISOString(),
      }).eq("id", user.id),
    ]);

    if (authResult.error || profileResult.error) {
      setSaveStatus("error");
    } else {
      setUser(authResult.data.user);
      setSaveStatus("success");
    }

    setSaving(false);
  }

  return (
    <div className="space-y-10 animate-fade-in">
      <header className="max-w-[720px]">
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-accent-clr mb-2">
          Dashboard · Profile
        </div>
        <h1 className="font-serif font-medium text-[36px] tracking-[-0.02em] leading-[1.1] mb-3 text-ink">
          Your profile
        </h1>
        <p className="font-serif italic text-[17px] text-ink-soft leading-[1.5]">
          Manage your applicant identity and account details here.
        </p>
      </header>

      <section className="bg-panel border border-rule rounded-lg p-6 space-y-6">
        <h2 className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-faint pb-2 border-b border-rule">
          Basic Details
        </h2>

        {loading ? (
          <div className="font-mono text-[12px] text-ink-faint animate-pulse">Loading…</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-paper border border-rule rounded-md px-4 py-2.5 font-serif text-[15px] outline-none focus:border-accent-clr"
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-paper border border-rule rounded-md px-4 py-2.5 font-serif text-[15px] outline-none focus:border-accent-clr"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">Email</label>
                <input
                  type="email"
                  value={user?.email ?? ""}
                  readOnly
                  className="w-full bg-paper border border-rule rounded-md px-4 py-2.5 font-serif text-[15px] outline-none text-ink-soft cursor-default"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-ink text-paper px-6 py-3 rounded-md font-mono text-[11px] uppercase tracking-[0.14em] hover:bg-accent-clr transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving…" : "Save Changes"}
              </button>

              {saveStatus === "success" && (
                <span className="font-mono text-[11px] text-green-600">Saved successfully</span>
              )}
              {saveStatus === "error" && (
                <span className="font-mono text-[11px] text-red-500">Failed to save. Try again.</span>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
