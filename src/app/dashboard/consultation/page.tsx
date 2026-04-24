"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import type { IntakePayload } from "@/types/narrative-anchor";
import {
  AlertTriangle,
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Flag,
  GraduationCap,
  Loader2,
  MessageSquare,
  Target,
  User
} from "lucide-react";
import { useState } from "react";

type ConsultationForm = IntakePayload;

const REQUIRED_FIELDS: Record<number, (keyof ConsultationForm)[]> = {
  1: ["fullName", "age", "citizenship", "archetype", "careerSummary"],
  2: ["primaryIndustry", "yearsExperience", "leadershipExperience"],
  3: ["undergradInstitution", "undergradGpa", "standardizedTestScore"],
  4: ["targetSchools", "shortTermGoal", "whyNow", "financialConstraints", "geographicPreference"],
  5: ["proudMoment", "failureStory", "writingRegister", "sentenceLength"]
};

export default function ConsultationModule() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [generatedNao, setGeneratedNao] = useState<Record<string, unknown> | null>(null);
  const totalSteps = 5;

  const [form, setForm] = useState<ConsultationForm>({
    fullName: "Shridhar Yendamuri",
    age: "28",
    citizenship: "India",
    archetype: "International Applicant",
    careerSummary: "Product manager who's spent five years building cross-border payments at a Bangalore fintech.",
    primaryIndustry: "Enterprise Software / Tech",
    yearsExperience: "4",
    leadershipExperience: "Managed 2 junior engineers and led a cross-functional pod of 5 (design, marketing, QA) for a major Q3 launch.",
    undergradInstitution: "",
    undergradGpa: "",
    standardizedTestScore: "",
    targetSchools: "Stanford GSB, HBS, Wharton",
    shortTermGoal: "",
    whyNow: "",
    financialConstraints: "",
    geographicPreference: "",
    proudMoment: "",
    failureStory: "",
    writingRegister: "Warm",
    sentenceLength: "Varied"
  });

  const STEPS = [
    { id: 1, title: "Background", icon: User },
    { id: 2, title: "Work Experience", icon: Briefcase },
    { id: 3, title: "Education & Scores", icon: GraduationCap },
    { id: 4, title: "Goals & Schools", icon: Flag },
    { id: 5, title: "Voice & Style", icon: MessageSquare }
  ];

  const isStepComplete = (stepId: number) => {
    const requiredFields = REQUIRED_FIELDS[stepId] ?? [];
    return requiredFields.every((field) => form[field].trim().length > 0);
  };

  const updateField = <K extends keyof ConsultationForm>(field: K, value: ConsultationForm[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!isStepComplete(step)) {
      setSubmitError("Please complete all required fields before continuing.");
      return;
    }

    setSubmitError("");
    setIsGenerating(true);

    const supabase = createClient();
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setIsGenerating(false);
      setSubmitError("You must be logged in to submit this form.");
      return;
    }

    const targetSchools = form.targetSchools
      .split(",")
      .map((school) => school.trim())
      .filter(Boolean);

    const naoResponse = await fetch("/api/agents/narrative-anchor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ intake: form })
    });

    if (!naoResponse.ok) {
      const naoError = await naoResponse.json().catch(() => ({ error: "Failed to generate NAO." }));
      setIsGenerating(false);
      setSubmitError(naoError.error ?? "Failed to generate NAO.");
      return;
    }

    const naoData = (await naoResponse.json()) as { nao: Record<string, unknown> };
    setGeneratedNao(naoData.nao);

    const { error } = await supabase.from("UserForm").insert({
      user_id: user.id,
      full_name: form.fullName,
      age: form.age ? Number(form.age) : null,
      country_of_citizenship: form.citizenship,
      primary_identity_archetype: form.archetype,
      career_summary: form.careerSummary,
      primary_industry: form.primaryIndustry,
      years_experience: form.yearsExperience ? Number(form.yearsExperience) : null,
      leadership_experience: form.leadershipExperience,
      undergraduate_institution: form.undergradInstitution,
      undergraduate_gpa: form.undergradGpa,
      standardized_test_score: form.standardizedTestScore,
      target_schools: targetSchools,
      short_term_goal: form.shortTermGoal,
      why_now: form.whyNow,
      financial_constraints: form.financialConstraints,
      geographic_preference: form.geographicPreference,
      proud_moment: form.proudMoment,
      failure_or_change_story: form.failureStory,
      writing_register: form.writingRegister,
      sentence_length: form.sentenceLength,
      payload: form,
      nao_json: naoData.nao
    });

    if (error) {
      setIsGenerating(false);
      setSubmitError(error.message);
      return;
    }

    // Also update the user's profile with their name and latest NAO
    const nameParts = form.fullName.trim().split(" ");
    const firstName = nameParts[0] ?? "";
    const lastName = nameParts.slice(1).join(" ") || "";

    await supabase.from("profiles").update({
      full_name: form.fullName,
      first_name: firstName,
      last_name: lastName,
      nao_json: naoData.nao,
      updated_at: new Date().toISOString()
    }).eq("id", user.id);

    setTimeout(() => {
      setIsGenerating(false);
      setShowDiagnostics(true);
    }, 2500);
  };

  if (showDiagnostics) {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in space-y-10">
        <header className="mb-10">
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-accent-clr mb-2">Diagnostic · Analysis Complete</div>
          <h1 className="font-serif font-medium text-[36px] tracking-[-0.02em] leading-[1.1] mb-3 text-ink">
            Your Narrative Anchor is ready.
          </h1>
          <p className="font-serif italic text-[17px] text-ink-soft leading-[1.5]">
            The Strategy Agent has processed your 30 definitions. We have identified two core narrative gaps.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-panel border border-rule p-8 rounded-xl space-y-6">
            <h3 className="font-serif text-xl font-medium flex items-center gap-3">
              <Target className="text-accent-clr w-5 h-5" /> Gap Analysis
            </h3>
            <ul className="space-y-4">
              <li className="bg-warn/5 border border-warn/20 p-5 rounded-lg">
                <strong className="block font-mono text-[10px] uppercase tracking-widest text-warn mb-2">Gap 01 · Technical Over-Index</strong>
                <p className="font-serif italic text-[14px] text-ink leading-relaxed">
                  Your resume and story inventory lean too heavily on engineering metrics. We need to extract more people-leadership stories to satisfy the GSB/HBS rubrics.
                </p>
              </li>
              <li className="bg-warn/5 border border-warn/20 p-5 rounded-lg">
                <strong className="block font-mono text-[10px] uppercase tracking-widest text-warn mb-2">Gap 02 · Goal Specificity</strong>
                <p className="font-serif italic text-[14px] text-ink leading-relaxed">
                  &quot;Product Management in Big Tech&quot; is too broad. We need to define the exact product niche to make the career bridge credible.
                </p>
              </li>
            </ul>
          </div>

          <div className="bg-panel border border-rule p-8 rounded-xl space-y-4">
            <h3 className="font-serif text-xl font-medium">Narrative Anchor Object (NAO)</h3>
            <pre className="font-mono text-[11px] text-ink-soft p-5 bg-paper border border-rule rounded-lg overflow-x-auto leading-relaxed">
              {generatedNao
                ? JSON.stringify(generatedNao, null, 2)
                : `{
  "status": "pending",
  "message": "NAO will appear here after generation"
}`}
            </pre>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Button onClick={() => window.location.href = '/dashboard'} className="bg-ink text-paper px-10 py-6 rounded-lg font-mono text-xs uppercase tracking-widest hover:bg-accent-clr transition-all">
            View Full Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in pb-20">
      <header className="mb-12 text-center">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent-clr mb-3">Workflow · Step 01</div>
        <h1 className="font-serif font-medium text-[32px] tracking-tight mb-3 text-ink">Tell us your story.</h1>
        <p className="font-serif italic text-[16px] text-ink-soft max-w-[540px] mx-auto leading-relaxed">
          30 questions, about 10 minutes. Everything here feeds the Strategy agent, which builds your Narrative Anchor.
        </p>
      </header>

      {/* Progress Wizard */}
      <div className="max-w-2xl mx-auto mb-20">
        <div className="flex justify-between items-start relative px-8">
          {STEPS.map((s, idx) => {
            const isActive = s.id === step;
            const isPast = s.id < step;
            const Icon = s.icon;

            return (
              <div key={s.id} className={`flex ${idx < STEPS.length - 1 ? "flex-1" : ""} items-start relative`}>
                <div className="flex flex-col items-center relative z-20 shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? "bg-accent-clr text-paper shadow-md scale-110" :
                    isPast ? "bg-accent-clr text-paper" :
                      "bg-panel border border-rule text-ink-faint"
                    }`}>
                    {isPast ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <div className="absolute top-12 text-[9px] font-mono uppercase tracking-[0.15em] text-center w-24 left-1/2 -translate-x-1/2">
                    <div className={`mt-2 ${isActive ? "text-accent-clr font-bold" : isPast ? "text-ink" : "text-ink-faint"}`}>
                      {s.title}
                    </div>
                  </div>
                </div>

                {idx < STEPS.length - 1 && (
                  <div className="flex-1 h-0.5 mx-0 bg-rule relative mt-5">
                    <div className={`absolute inset-0 transition-all duration-500 overflow-hidden ${isPast ? "bg-accent-clr" : "bg-transparent"}`} style={{ width: s.id < step ? "100%" : "0%" }} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Form Content Area */}
      <div className="bg-panel border border-rule p-10 rounded-xl shadow-sm">
        {step === 1 && (
          <div className="space-y-8 animate-fade-in font-serif">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint mb-2">Section 1 · Background</div>
              <h2 className="text-[24px] font-medium text-ink">Who you are right now</h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-sans text-[13px] font-medium text-ink block">Full Name</label>
                <input type="text" className="w-full bg-paper border border-rule rounded-md px-4 py-2.5 font-serif text-[15px] outline-none focus:border-accent-clr" value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="font-sans text-[13px] font-medium text-ink block">Age</label>
                <input type="number" className="w-full bg-paper border border-rule rounded-md px-4 py-2.5 font-serif text-[15px] outline-none focus:border-accent-clr" value={form.age} onChange={(e) => updateField("age", e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-sans text-[13px] font-medium text-ink block">Country of Citizenship</label>
              <input type="text" className="w-full bg-paper border border-rule rounded-md px-4 py-2.5 font-serif text-[15px] outline-none focus:border-accent-clr" value={form.citizenship} onChange={(e) => updateField("citizenship", e.target.value)} />
            </div>

            <div className="space-y-4">
              <label className="font-sans text-[13px] font-medium text-ink block">Primary Identity Archetype (Select one)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'First-Generation College',
                  'Underrepresented Minority',
                  'Military Veteran',
                  'International Applicant',
                  'Traditional Finance/Consulting',
                  'Non-Traditional (Arts/Non-Profit)'
                ].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => updateField("archetype", opt)}
                    className={`p-4 border rounded-md text-sm transition-all font-serif italic text-left ${form.archetype === opt ? 'bg-accent-soft/20 border-accent-clr text-ink font-medium shadow-sm' : 'border-rule bg-paper text-ink-soft hover:border-ink'
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-sans text-[13px] font-medium text-ink block">One sentence describing your career so far</label>
              <p className="italic text-[12px] text-ink-faint mb-2">The one you&apos;d give a stranger at a dinner party.</p>
              <textarea rows={2} className="w-full bg-paper border border-rule rounded-md px-4 py-3 font-serif text-[15px] outline-none focus:border-accent-clr" value={form.careerSummary} onChange={(e) => updateField("careerSummary", e.target.value)} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-fade-in font-serif">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint mb-2">Section 2 · Career</div>
              <h2 className="text-[24px] font-medium text-ink">Work Experience</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-sans text-[13px] font-medium text-ink block">Primary Industry</label>
                <select className="w-full bg-paper border border-rule rounded-md px-4 py-3 font-serif text-[15px] outline-none focus:border-accent-clr appearance-none" value={form.primaryIndustry} onChange={(e) => updateField("primaryIndustry", e.target.value)}>
                  <option>Enterprise Software / Tech</option>
                  <option>Finance & Venture Capital</option>
                  <option>Management Consulting</option>
                  <option>Healthcare & Biotech</option>
                  <option>Consumer Goods / Retail</option>
                  <option>Non-Profit / Social Impact</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-sans text-[13px] font-medium text-ink block">Years of Full-Time Experience</label>
                <input
                  type="number"
                  className="w-full bg-paper border border-rule rounded-md px-4 py-2.5 font-serif text-[15px] outline-none focus:border-accent-clr"
                  value={form.yearsExperience}
                  onChange={(e) => updateField("yearsExperience", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="font-sans text-[13px] font-medium text-ink block">Leadership Experience (Direct Reports or Cross-functional)</label>
                <textarea
                  rows={4}
                  className="w-full bg-paper border border-rule rounded-md px-4 py-3 font-serif text-[15px] outline-none focus:border-accent-clr"
                  placeholder="Tell us about teams you've led or projects you've managed."
                  value={form.leadershipExperience}
                  onChange={(e) => updateField("leadershipExperience", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-fade-in font-serif">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint mb-2">Section 3 · Academics</div>
              <h2 className="text-[24px] font-medium text-ink">Education & Scores</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-sans text-[13px] font-medium text-ink block">Undergraduate Institution</label>
                <input type="text" className="w-full bg-paper border border-rule rounded-md px-4 py-2.5 font-serif text-[15px] outline-none focus:border-accent-clr" placeholder="e.g. IIT, BITS Pilani, etc." value={form.undergradInstitution} onChange={(e) => updateField("undergradInstitution", e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-sans text-[13px] font-medium text-ink block">Undergraduate GPA</label>
                  <input type="text" className="w-full bg-paper border border-rule rounded-md px-4 py-2.5 font-serif text-[15px] outline-none focus:border-accent-clr" placeholder="e.g. 3.7 / 4.0" value={form.undergradGpa} onChange={(e) => updateField("undergradGpa", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="font-sans text-[13px] font-medium text-ink block">Standardized Test Score</label>
                  <input type="text" className="w-full bg-paper border border-rule rounded-md px-4 py-2.5 font-serif text-[15px] outline-none focus:border-accent-clr" placeholder="GMAT 735 or GRE 330" value={form.standardizedTestScore} onChange={(e) => updateField("standardizedTestScore", e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8 animate-fade-in font-serif">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint mb-2">Section 4 · Strategy</div>
              <h2 className="text-[24px] font-medium text-ink">Goals & Schools</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-sans text-[13px] font-medium text-ink block">Target Schools (Comma separated)</label>
                <input
                  type="text"
                  className="w-full bg-paper border border-rule rounded-md px-4 py-2.5 font-serif text-[15px] outline-none focus:border-accent-clr"
                  value={form.targetSchools}
                  onChange={(e) => updateField("targetSchools", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="font-sans text-[13px] font-medium text-ink block">Short-term goal (role immediately post-MBA)</label>
                <textarea rows={2} className="w-full bg-paper border border-rule rounded-md px-4 py-3 font-serif text-[15px] outline-none focus:border-accent-clr" placeholder="e.g. Lead product at a growth-stage climate fintech." value={form.shortTermGoal} onChange={(e) => updateField("shortTermGoal", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="font-sans text-[13px] font-medium text-ink block">Why MBA, why now?</label>
                <textarea rows={3} className="w-full bg-paper border border-rule rounded-md px-4 py-3 font-serif text-[15px] outline-none focus:border-accent-clr" value={form.whyNow} onChange={(e) => updateField("whyNow", e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-sans text-[13px] font-medium text-ink block">Financial Constraints</label>
                  <select className="w-full bg-paper border border-rule rounded-md px-4 py-2.5 font-serif text-[15px] outline-none focus:border-accent-clr appearance-none" value={form.financialConstraints} onChange={(e) => updateField("financialConstraints", e.target.value)}>
                    <option>—</option>
                    <option>Need full scholarship</option>
                    <option>Need partial aid</option>
                    <option>Can self-fund</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-sans text-[13px] font-medium text-ink block">Geographic Preference</label>
                  <select className="w-full bg-paper border border-rule rounded-md px-4 py-2.5 font-serif text-[15px] outline-none focus:border-accent-clr appearance-none" value={form.geographicPreference} onChange={(e) => updateField("geographicPreference", e.target.value)}>
                    <option>—</option>
                    <option>US only</option>
                    <option>Europe only</option>
                    <option>Asia only</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-8 animate-fade-in font-serif">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint mb-2">Section 5 · Voice</div>
              <h2 className="text-[24px] font-medium text-ink">How you actually sound</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-sans text-[13px] font-medium text-ink block">A moment you&apos;re proud of — in 3-5 sentences, unedited</label>
                <p className="italic text-[12px] text-ink-faint mb-2">Your natural register is worth more than a polished one.</p>
                <textarea rows={4} className="w-full bg-paper border border-rule rounded-md px-4 py-3 font-serif text-[15px] outline-none focus:border-accent-clr" placeholder="Tell it like you&apos;d tell a friend." value={form.proudMoment} onChange={(e) => updateField("proudMoment", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="font-sans text-[13px] font-medium text-ink block">A time you failed or changed your mind</label>
                <textarea rows={4} className="w-full bg-paper border border-rule rounded-md px-4 py-3 font-serif text-[15px] outline-none focus:border-accent-clr" placeholder="What happened, what you learned." value={form.failureStory} onChange={(e) => updateField("failureStory", e.target.value)} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <label className="font-sans text-[13px] font-medium text-ink block">Writing Register</label>
                  <div className="flex flex-wrap gap-2">
                    {['Plain', 'Warm', 'Analytical', 'Formal'].map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => updateField("writingRegister", opt)}
                        className={`px-3 py-1 border rounded font-mono text-[10px] uppercase transition-colors ${form.writingRegister === opt ? 'bg-accent-clr text-paper border-accent-clr' : 'bg-paper border-rule text-ink-faint'
                          }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-sans text-[13px] font-medium text-ink block">Sentence Length</label>
                  <div className="flex flex-wrap gap-2">
                    {['Punchy', 'Varied', 'Layered'].map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => updateField("sentenceLength", opt)}
                        className={`px-3 py-1 border rounded font-mono text-[10px] uppercase transition-colors ${form.sentenceLength === opt ? 'bg-accent-clr text-paper border-accent-clr' : 'bg-paper border-rule text-ink-faint'
                          }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-warn/5 border border-warn/20 p-6 rounded-lg flex gap-4 mt-10">
              <AlertTriangle className="text-warn w-5 h-5 shrink-0" />
              <div className="space-y-1">
                <h4 className="font-serif font-medium text-[15px] text-ink">Ready for Strategy Agent</h4>
                <p className="font-serif italic text-[13px] text-ink-soft leading-relaxed">
                  Once submitted, our agents will parse these definitions to initialize your Narrative Anchor Object and highlight immediate profile gaps.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Next/Prev Controls */}
        <div className="mt-12 pt-8 border-t border-rule flex justify-between items-center">
          <button
            className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink transition-opacity ${step === 1 ? "opacity-0 pointer-events-none" : "hover:text-accent-clr"}`}
            onClick={() => setStep(s => Math.max(1, s - 1))}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Previous Section
          </button>

          {step < totalSteps ? (
            <button
              className="flex items-center gap-2 bg-ink text-paper px-8 py-3 rounded font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-accent-clr transition-all disabled:opacity-50"
              onClick={() => {
                if (!isStepComplete(step)) {
                  setSubmitError("Please complete all required fields before continuing.");
                  return;
                }
                setSubmitError("");
                setStep((s) => Math.min(totalSteps, s + 1));
              }}
              disabled={!isStepComplete(step)}
            >
              Continue <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              className="flex items-center gap-2 bg-ink text-paper px-8 py-3 rounded font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-accent-clr transition-all disabled:opacity-50"
              onClick={handleGenerate}
              disabled={isGenerating || !isStepComplete(step)}
            >
              {isGenerating ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Analyzing...</> : "Generate Narrative Anchor"}
            </button>
          )}
        </div>

        {submitError && (
          <p className="mt-4 font-sans text-sm text-warn">{submitError}</p>
        )}
      </div>
    </div>
  );
}
