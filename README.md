# Admission OS (v2.0 Architecture)

Admission OS is a premium, AI-orchestrated business school application platform. It replaces standard chatbot wrappers with a deterministic **State-Machine Orchestration Engine**, passing structured JSON contexts between five specific AI Agents to simulate the rigor of a top-tier MBA admissions consultant.

## 🚀 The Multi-Agent Orchestration Engine

Instead of a basic "submit and rewrite" flow, Admission OS utilizes a two-layer architecture:
1. **The Scoring Layer (UI):** Objective mathematical evaluation against public rubrics (Word count, keyword density, GMAT medians).
2. **The Agent Layer (Backend Engine):** Five autonomous LLMs passing structured JSON objects sequentially, capable of challenging the user and halting progression via strictly enforced *Decision Gates*.

### The 5-Agent Workflow

1. **Strategy Agent (Positioning & Base Knowledge)**
   - **Input:** 30-Question Consultation Diagnostic form
   - **Action:** Generates the Narrative Anchor Object (NAO). The NAO becomes the unchanging source of truth for the user's background, red flags, and archetypes.
   
2. **Framework Agent (Logic Validation)**
   - **Input:** Raw Student Draft + NAO
   - **Action:** Cross-checks the draft against strict logic models (e.g. "Does the short term goal logically bridge to the target school?"). 
   - **Decision Gate:** If the underlying logic fails, the engine throws an error (`Return to Student`) and halts the pipeline.
   
3. **Story Architect (Restructuring & Flow)**
   - **Input:** Framework-Validated Draft
   - **Action:** Moves paragraphs for narrative tension, maps anecdotes to the STAR format, and guarantees narrative flow.
   
4. **Editing Agent (Pacing & Polish)**
   - **Input:** Structured Draft
   - **Action:** Fine-tunes grammar, removes passive voice, reduces comma splices, and upgrades verbs without stripping the student's unique voice fingerprint.
   
5. **Gap Agent (Holistic Health Check)**
   - **Input:** Polished Version + External Docs (Resume, Recs)
   - **Action:** Checks for global overlaps or contradictions across all modules and dictates the overarching "Application Health Score" and next actions.

---

## 💻 Technical Stack

*   **Framework:** Next.js 14 (App Router)
*   **Styling & UI:** Tailwind CSS, Framer Motion, Radix UI (via shadcn/ui components)
*   **Editor:** TipTap (Customized with real-time semantic tracking and hydration-safe rendering)
*   **Theming:** Fully responsive Light/Dark mode via `next-themes` CSS Variables.
*   **Agent Logic Interface:** TypeScript-based structured evaluation engine (`src/lib/orchestrator.ts`)

---

## 📂 Platform Modules

Admission OS operates across 8 interconnected document modules:

1.  **Consultation Form:** Intake diagnostics identifying personal background, work experience, goals, and target schools. Generates the initial NAO.
2.  **Resume / CV:** Line-by-line bullet rewriting engine maximizing power verbs and impact scale.
3.  **Recommendations:** Briefing document generator ensuring external recommenders validate the NAO without duplicating core essay stories.
4.  **Personal Essays:** High-level narrative drafting utilizing the `AgentWorkflow` component to force restructuring.
5.  **School Essays:** Target-school specific essays featuring "Culture Signal" matching and "Cross-School Reuse" detectors.
6.  **Scholarship Essays:** Specialized rubric environments comparing essays against external Need/Merit constraints (e.g., Knight-Hennessy, Toigo).
7.  **Transcripts:** Matrix visualization tracking quantified competitiveness.
8.  **Interview Prep:** Persona-driven (AdCom) behavioral checking system.

---


## 📄 License

This project is proprietary. All rights reserved.

---

## 👥 Authors

- **Dr Dhaval Trivedi** - *AI Expert* - [DrDhaval Trivedi](https://github.com/drdhavaltrivedi)

---

## 🛠 Getting Started Locally

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Navigate to [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to view the application.

*Detailed platform logic can be visually accessed via the **Platform Manual** tab in the sidebar of the local application.*
