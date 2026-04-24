"use client";

import { useDashboardData } from "@/components/DashboardDataProvider";

function toRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function toString(value: unknown, fallback = "-"): string {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function toNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

export function NAOPanel() {
  const { hasNao, latestForm } = useDashboardData();

  const nao = toRecord(latestForm?.nao_json);
  const applicant = toRecord(nao?.applicant_snapshot);
  const strategy = toRecord(nao?.strategic_positioning);
  const voiceFingerprint = toRecord(nao?.voice_fingerprint);

  const claims = toStringArray(nao?.recurring_claims);
  const themes = toStringArray(nao?.recurring_themes);
  const schools = toStringArray(applicant?.target_schools ?? latestForm?.target_schools);

  const applicantName = toString(applicant?.full_name ?? latestForm?.full_name);
  const applicantRole = toString(applicant?.primary_industry ?? latestForm?.primary_industry);
  const experience = toNumber(applicant?.years_experience ?? latestForm?.years_experience);
  const shortTermGoal = toString(strategy?.short_term_goal ?? latestForm?.short_term_goal);
  const longTermGoal = toString(strategy?.long_term_goal);
  const register = toString(voiceFingerprint?.register);
  const rhythm = toString(voiceFingerprint?.sentence_rhythm, "medium");

  return (
    <aside className="w-[340px] bg-panel border-l border-rule flex flex-col h-full overflow-y-auto">
      <div className="nao-head p-4 border-b border-rule flex justify-between items-center bg-panel-deep shrink-0">
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink font-medium">Narrative Anchor</span>
        <span className="font-mono text-[10px] text-ink-faint">
          {hasNao ? `${claims.length} claims` : "Pending intake"}
        </span>
      </div>

      <div className="flex-1">
        <div className="p-5 border-b border-rule">
          <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-faint mb-2">Applicant</div>
          <div className="font-serif text-[13px] text-ink leading-[1.5] mb-1">
            <span className="font-mono text-[10px] text-ink-faint uppercase tracking-[0.06em] block mb-0.5">Name</span>
            {applicantName}
          </div>
          <div className="font-serif text-[13px] text-ink leading-[1.5] mb-1">
            <span className="font-mono text-[10px] text-ink-faint uppercase tracking-[0.06em] block mb-0.5">Role</span>
            {applicantRole}
          </div>
          <div className="font-serif text-[13px] text-ink leading-[1.5]">
            <span className="font-mono text-[10px] text-ink-faint uppercase tracking-[0.06em] block mb-0.5">Experience</span>
            {experience > 0 ? `${experience} yrs` : "-"}
          </div>
        </div>

        <div className="p-5 border-b border-rule">
          <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-faint mb-2">Goals</div>
          <div className="font-serif text-[13px] text-ink leading-[1.5] mb-1">
            <span className="font-mono text-[10px] text-ink-faint uppercase tracking-[0.06em] block mb-0.5">Short-term</span>
            {shortTermGoal}
          </div>
          <div className="font-serif text-[13px] text-ink leading-[1.5]">
            <span className="font-mono text-[10px] text-ink-faint uppercase tracking-[0.06em] block mb-0.5">Long-term</span>
            {longTermGoal}
          </div>
        </div>

        <div className="p-5 border-b border-rule">
          <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-faint mb-2 flex justify-between">
            Target schools <span className="text-ink-soft">{schools.length}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {schools.map((school) => (
              <span key={school} className="bg-paper border border-rule px-2 py-1 rounded-[4px] font-sans text-xs text-ink-soft">
                {school}
              </span>
            ))}
            {schools.length === 0 && (
              <span className="font-serif text-[12px] text-ink-faint">No schools captured yet.</span>
            )}
          </div>
        </div>

        <div className="p-5 border-b border-rule">
          <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-faint mb-2 flex justify-between">
            Themes <span className="text-ink-soft">{themes.length}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {themes.map((theme) => (
              <span key={theme} className="bg-paper border border-rule px-2 py-1 rounded-[4px] font-sans text-xs text-ink-soft">
                {theme}
              </span>
            ))}
            {themes.length === 0 && (
              <span className="font-serif text-[12px] text-ink-faint">Themes appear after NAO generation.</span>
            )}
          </div>
        </div>

        <div className="p-5 border-b border-rule">
          <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-faint mb-2 flex justify-between">
            Claims <span className="text-ink-soft">{claims.length}</span>
          </div>
          <div className="flex flex-col gap-2">
            {claims.map((claim, index) => (
              <div key={`${claim}-${index}`} className="border-l-2 border-accent-clr pl-2.5 py-1 bg-paper rounded-r-[4px]">
                <div className="font-serif text-[13px] text-ink leading-[1.45]">{claim}</div>
              </div>
            ))}
            {claims.length === 0 && (
              <div className="font-serif text-[12px] text-ink-faint leading-[1.5]">
                Complete the consultation form to generate NAO claims.
              </div>
            )}
          </div>
        </div>

        <div className="p-5">
          <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-faint mb-2">Voice fingerprint</div>
          <div className="font-serif text-[13px] text-ink leading-[1.5] mb-1">
            <span className="font-mono text-[10px] text-ink-faint uppercase tracking-[0.06em] block mb-0.5">Register</span>
            {register}
          </div>
          <div className="font-serif text-[13px] text-ink leading-[1.5]">
            <span className="font-mono text-[10px] text-ink-faint uppercase tracking-[0.06em] block mb-0.5">Sentence rhythm</span>
            {rhythm}
          </div>
        </div>
      </div>
    </aside>
  );
}
