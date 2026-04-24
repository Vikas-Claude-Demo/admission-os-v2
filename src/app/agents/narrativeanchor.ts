import type { IntakePayload } from "@/types/narrative-anchor";
import "server-only";
import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                             NAO SCHEMA (ZOD)                               */
/* -------------------------------------------------------------------------- */

const NAOSchema = z.object({
  user_id: z.string(),
  track: z.string(),

  applicant_snapshot: z.object({
    full_name: z.string(),
    citizenship: z.string(),
    years_experience: z.number(),
    primary_industry: z.string(),
    target_schools: z.array(z.string())
  }),

  strategic_positioning: z.object({
    core_theme: z.string(),
    positioning_statement: z.string(),
    short_term_goal: z.string(),
    long_term_goal: z.string(),
    why_now_summary: z.string(),
    goal_bridge_logic: z.string()
  }),

  differentiators: z.array(z.string()),

  recurring_themes: z.array(z.string()),
  recurring_claims: z.array(z.string()),

  evidence_map: z.array(z.string()),

  story_bank: z.array(
    z.object({
      story_title: z.string(),
      themes: z.array(z.string()),
      suggested_archetypes: z.array(z.string())
    })
  ),

  school_fit_mapping: z.array(
    z.object({
      school: z.string(),
      fit_reason: z.string(),
      culture_signals: z.array(z.string())
    })
  ),

  voice_fingerprint: z.object({
    tone: z.string(),
    register: z.string(),
    sentence_rhythm: z.enum(["short", "medium", "long"]),
    vocabulary_level: z.enum(["simple", "moderate", "advanced"]),
    emotional_density: z.enum(["low", "medium", "high"]),
    confidence_level: z.enum(["low", "medium", "high"])
  }),

  narrative_gaps: z.array(z.string()),

  confidence_scores: z.object({
    positioning_strength: z.number(),
    goal_clarity: z.number(),
    story_depth: z.number()
  }),

  generated_at: z.string()
});

export type NarrativeAnchorObject = z.infer<typeof NAOSchema>;

type UnknownRecord = Record<string, unknown>;

/* -------------------------------------------------------------------------- */
/*                          DETERMINISTIC PREPROCESS                          */
/* -------------------------------------------------------------------------- */

function preprocess(intake: IntakePayload) {
  return {
    years_experience: Number(intake.yearsExperience) || 0,
    target_schools: intake.targetSchools
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    has_leadership: intake.leadershipExperience.length > 20,
    story_signals: [
      intake.proudMoment ? "has_proud_story" : "",
      intake.failureStory ? "has_failure_story" : ""
    ].filter(Boolean)
  };
}

function ensureString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function ensureNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function ensureStringArray(value: unknown, fallback: string[] = []): string[] {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.filter((item): item is string => typeof item === "string");
}

function enumOrFallback<T extends readonly string[]>(
  value: unknown,
  options: T,
  fallback: T[number]
): T[number] {
  return typeof value === "string" && (options as readonly string[]).includes(value)
    ? (value as T[number])
    : fallback;
}

function scoreOrFallback(value: unknown, fallback: number): number {
  const n = ensureNumber(value, fallback);
  if (n < 0) return 0;
  if (n > 10) return 10;
  return n;
}

function parseJsonFromModelText(text: string): unknown {
  const cleaned = text.replace(/```json|```/gi, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    // Try extracting first JSON object in mixed content responses.
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    if (start !== -1 && end !== -1 && end > start) {
      const maybeJson = cleaned.slice(start, end + 1);
      return JSON.parse(maybeJson);
    }

    throw new Error("Invalid JSON returned from model.");
  }
}

function extractModelText(data: unknown): string {
  const payload = data as {
    candidates?: Array<{
      content?: {
        parts?: Array<{ text?: string }>;
      };
    }>;
  };

  const textOutput = payload?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!textOutput) {
    throw new Error("Empty response from Gemini.");
  }

  return textOutput;
}

function buildFallbackNAO(
  intake: IntakePayload,
  derived: ReturnType<typeof preprocess>,
  userId: string,
  prevNAO?: Partial<NarrativeAnchorObject>
): NarrativeAnchorObject {
  return {
    user_id: userId,
    track: "MBA",
    applicant_snapshot: {
      full_name: intake.fullName,
      citizenship: intake.citizenship,
      years_experience: derived.years_experience,
      primary_industry: intake.primaryIndustry,
      target_schools: derived.target_schools
    },
    strategic_positioning: {
      core_theme: prevNAO?.strategic_positioning?.core_theme ?? "Emerging leadership with scalable impact",
      positioning_statement:
        prevNAO?.strategic_positioning?.positioning_statement ??
        `${intake.fullName} is an applicant with operating experience in ${intake.primaryIndustry}.`,
      short_term_goal: intake.shortTermGoal,
      long_term_goal: prevNAO?.strategic_positioning?.long_term_goal ?? "Build long-term career impact at scale",
      why_now_summary: intake.whyNow,
      goal_bridge_logic: prevNAO?.strategic_positioning?.goal_bridge_logic ?? "MBA bridges current role to long-term leadership scope"
    },
    differentiators: prevNAO?.differentiators ?? [],
    recurring_themes: prevNAO?.recurring_themes ?? [],
    recurring_claims: prevNAO?.recurring_claims ?? [],
    evidence_map: prevNAO?.evidence_map ?? [],
    story_bank: prevNAO?.story_bank ?? [],
    school_fit_mapping:
      prevNAO?.school_fit_mapping ??
      derived.target_schools.map((school) => ({
        school,
        fit_reason: "School fit to be refined by strategy agent",
        culture_signals: []
      })),
    voice_fingerprint: {
      tone: prevNAO?.voice_fingerprint?.tone ?? "Direct",
      register: intake.writingRegister || prevNAO?.voice_fingerprint?.register || "Warm",
      sentence_rhythm: prevNAO?.voice_fingerprint?.sentence_rhythm ?? "medium",
      vocabulary_level: prevNAO?.voice_fingerprint?.vocabulary_level ?? "moderate",
      emotional_density: prevNAO?.voice_fingerprint?.emotional_density ?? "medium",
      confidence_level: prevNAO?.voice_fingerprint?.confidence_level ?? "medium"
    },
    narrative_gaps: prevNAO?.narrative_gaps ?? [],
    confidence_scores: {
      positioning_strength: prevNAO?.confidence_scores?.positioning_strength ?? 7,
      goal_clarity: prevNAO?.confidence_scores?.goal_clarity ?? 7,
      story_depth: prevNAO?.confidence_scores?.story_depth ?? 7
    },
    generated_at: new Date().toISOString()
  };
}

function normalizeToNAO(
  raw: unknown,
  intake: IntakePayload,
  derived: ReturnType<typeof preprocess>,
  userId: string,
  prevNAO?: Partial<NarrativeAnchorObject>
): NarrativeAnchorObject {
  const fallback = buildFallbackNAO(intake, derived, userId, prevNAO);
  const source = (raw && typeof raw === "object" ? raw : {}) as UnknownRecord;

  const applicant = ((source.applicant_snapshot as UnknownRecord) ??
    (source.applicantSnapshot as UnknownRecord) ??
    {}) as UnknownRecord;

  const strategy = ((source.strategic_positioning as UnknownRecord) ??
    (source.strategicPositioning as UnknownRecord) ??
    {}) as UnknownRecord;

  const voice = ((source.voice_fingerprint as UnknownRecord) ??
    (source.voiceFingerprint as UnknownRecord) ??
    {}) as UnknownRecord;

  const confidence = ((source.confidence_scores as UnknownRecord) ??
    (source.confidenceScores as UnknownRecord) ??
    {}) as UnknownRecord;

  const schoolFitRaw = source.school_fit_mapping ?? source.schoolFitMapping;
  const schoolFitArray = Array.isArray(schoolFitRaw)
    ? schoolFitRaw
    : schoolFitRaw && typeof schoolFitRaw === "object"
      ? Object.entries(schoolFitRaw as UnknownRecord).map(([school, value]) => {
          const mapped = (value as UnknownRecord) ?? {};
          return {
            school,
            fit_reason: ensureString(mapped.fit_reason ?? mapped.fitReason, ""),
            culture_signals: ensureStringArray(mapped.culture_signals ?? mapped.cultureSignals, [])
          };
        })
      : [];

  const storyBankRaw = source.story_bank ?? source.storyBank;
  const storyBankArray = Array.isArray(storyBankRaw)
    ? storyBankRaw.map((entry) => {
        const e = (entry as UnknownRecord) ?? {};
        return {
          story_title: ensureString(e.story_title ?? e.storyTitle, "Untitled Story"),
          themes: ensureStringArray(e.themes, []),
          suggested_archetypes: ensureStringArray(e.suggested_archetypes ?? e.suggestedArchetypes, [])
        };
      })
    : [];

  return {
    user_id: ensureString(source.user_id ?? source.userId, fallback.user_id),
    track: ensureString(source.track, fallback.track),
    applicant_snapshot: {
      full_name: ensureString(applicant.full_name ?? applicant.fullName, fallback.applicant_snapshot.full_name),
      citizenship: ensureString(applicant.citizenship, fallback.applicant_snapshot.citizenship),
      years_experience: ensureNumber(applicant.years_experience ?? applicant.yearsExperience, fallback.applicant_snapshot.years_experience),
      primary_industry: ensureString(applicant.primary_industry ?? applicant.primaryIndustry, fallback.applicant_snapshot.primary_industry),
      target_schools: ensureStringArray(applicant.target_schools ?? applicant.targetSchools, fallback.applicant_snapshot.target_schools)
    },
    strategic_positioning: {
      core_theme: ensureString(strategy.core_theme ?? strategy.coreTheme, fallback.strategic_positioning.core_theme),
      positioning_statement: ensureString(strategy.positioning_statement ?? strategy.positioningStatement, fallback.strategic_positioning.positioning_statement),
      short_term_goal: ensureString(strategy.short_term_goal ?? strategy.shortTermGoal, fallback.strategic_positioning.short_term_goal),
      long_term_goal: ensureString(strategy.long_term_goal ?? strategy.longTermGoal, fallback.strategic_positioning.long_term_goal),
      why_now_summary: ensureString(strategy.why_now_summary ?? strategy.whyNowSummary, fallback.strategic_positioning.why_now_summary),
      goal_bridge_logic: ensureString(strategy.goal_bridge_logic ?? strategy.goalBridgeLogic, fallback.strategic_positioning.goal_bridge_logic)
    },
    differentiators: ensureStringArray(source.differentiators, fallback.differentiators),
    recurring_themes: ensureStringArray(source.recurring_themes ?? source.recurringThemes, fallback.recurring_themes),
    recurring_claims: ensureStringArray(source.recurring_claims ?? source.recurringClaims, fallback.recurring_claims),
    evidence_map: ensureStringArray(source.evidence_map ?? source.evidenceMap, fallback.evidence_map),
    story_bank: storyBankArray.length > 0 ? storyBankArray : fallback.story_bank,
    school_fit_mapping: schoolFitArray.length > 0 ? schoolFitArray : fallback.school_fit_mapping,
    voice_fingerprint: {
      tone: ensureString(voice.tone, fallback.voice_fingerprint.tone),
      register: ensureString(voice.register, fallback.voice_fingerprint.register),
      sentence_rhythm: enumOrFallback(voice.sentence_rhythm ?? voice.sentenceRhythm, ["short", "medium", "long"] as const, fallback.voice_fingerprint.sentence_rhythm),
      vocabulary_level: enumOrFallback(voice.vocabulary_level ?? voice.vocabularyLevel, ["simple", "moderate", "advanced"] as const, fallback.voice_fingerprint.vocabulary_level),
      emotional_density: enumOrFallback(voice.emotional_density ?? voice.emotionalDensity, ["low", "medium", "high"] as const, fallback.voice_fingerprint.emotional_density),
      confidence_level: enumOrFallback(voice.confidence_level ?? voice.confidenceLevel, ["low", "medium", "high"] as const, fallback.voice_fingerprint.confidence_level)
    },
    narrative_gaps: ensureStringArray(source.narrative_gaps ?? source.narrativeGaps, fallback.narrative_gaps),
    confidence_scores: {
      positioning_strength: scoreOrFallback(confidence.positioning_strength ?? confidence.positioningStrength, fallback.confidence_scores.positioning_strength),
      goal_clarity: scoreOrFallback(confidence.goal_clarity ?? confidence.goalClarity, fallback.confidence_scores.goal_clarity),
      story_depth: scoreOrFallback(confidence.story_depth ?? confidence.storyDepth, fallback.confidence_scores.story_depth)
    },
    generated_at: new Date().toISOString()
  };
}

/* -------------------------------------------------------------------------- */
/*                              PROMPT BUILDER                                */
/* -------------------------------------------------------------------------- */

function buildPrompt(
  intake: IntakePayload,
  derived: ReturnType<typeof preprocess>,
  userId: string,
  prevNAO?: Partial<NarrativeAnchorObject>
): string {
  return `
You are a senior admissions consultant.

Your job is to reverse-engineer the applicant’s positioning and create a Narrative Anchor Object (NAO).

IMPORTANT:
- Be specific, not generic
- Avoid words like "passionate", "hardworking"
- All claims must be defensible
- Think like an admissions committee

STEPS:
1. Identify 3–5 core identity signals
2. Extract recurring claims (must be provable)
3. Detect weak or unsupported claims
4. Build positioning statement (clear + differentiated)
5. Construct goal bridge:
   current → short-term → MBA → long-term
6. Identify narrative gaps
7. Extract voice fingerprint
8. Map stories → essay archetypes
9. Build school-specific fit reasoning

If previous NAO exists:
- Maintain consistency
- Only update what changed

Return ONLY valid JSON.

User ID: ${userId}

Intake:
${JSON.stringify(intake)}

Derived Signals:
${JSON.stringify(derived)}

Previous NAO:
${prevNAO ? JSON.stringify(prevNAO) : "None"}
`;
}

/* -------------------------------------------------------------------------- */
/*                              MAIN FUNCTION                                 */
/* -------------------------------------------------------------------------- */

const DEFAULT_MODEL = "gemini-2.5-flash";

export async function generateNarrativeAnchor(
  intake: IntakePayload,
  userId: string,
  prevNAO?: Partial<NarrativeAnchorObject>
): Promise<NarrativeAnchorObject> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const derived = preprocess(intake);

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${
    process.env.GEMINI_MODEL ?? DEFAULT_MODEL
  }:generateContent?key=${apiKey}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: buildPrompt(intake, derived, userId, prevNAO)
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${error}`);
  }

  const data = await response.json();
  const textOutput = extractModelText(data);
  const parsedRaw = parseJsonFromModelText(textOutput);
  const normalized = normalizeToNAO(parsedRaw, intake, derived, userId, prevNAO);

  const validated = NAOSchema.safeParse(normalized);

  if (!validated.success) {
    throw new Error(`NAO validation failed: ${validated.error.message}`);
  }

  return validated.data;
}