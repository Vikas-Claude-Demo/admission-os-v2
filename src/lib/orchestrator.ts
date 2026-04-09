// admission-os/src/lib/orchestrator.ts

export interface NAO {
  userId: string;
  targetSchools: string[];
  redFlags: string[];
  coreTheme: string;
}

export interface AgentResponse {
  agentName: string;
  status: "success" | "blocked" | "error";
  jsonOutput: any;
  feedback: string;
}

export interface OrchestrationTrace {
  finalStatus: "approved" | "blocked";
  score: number;
  history: AgentResponse[];
}

/**
 * 1. Strategy Agent
 * Input: Consultation Form (mocked)
 * Output: NAO (Narrative Anchor Object)
 */
export async function executeStrategyAgent(): Promise<AgentResponse> {
  await new Promise((r) => setTimeout(r, 1000));
  const nao: NAO = {
    userId: "usr_91283",
    targetSchools: ["Stanford GSB", "HBS"],
    redFlags: ["Short tenure at current job", "Low quant score"],
    coreTheme: "Transitioning from Engineer to Product Visionary",
  };
  
  return {
    agentName: "Strategy Agent",
    status: "success",
    jsonOutput: nao,
    feedback: "Narrative Anchor Object (NAO) generated based on initial diagnostics.",
  };
}

/**
 * 2. Framework Agent
 * Input: Student Draft & NAO
 * Output: Checks logic bridges
 */
export async function executeFrameworkAgent(draft: string, nao: NAO): Promise<AgentResponse> {
  await new Promise((r) => setTimeout(r, 1500));
  
  // Simulated Decision Gate Logic
  if (draft.length < 150) {
    return {
      agentName: "Framework Agent",
      status: "blocked",
      jsonOutput: { error: "Insufficient word count for logical framing." },
      feedback: "[DECISION GATE] Draft lacks enough substance to evaluate logical bridges. Admissions committees need more detail.",
    };
  }

  return {
    agentName: "Framework Agent",
    status: "success",
    jsonOutput: { validatedLogic: true, pointsCovered: ["Vulnerability", "Leadership"] },
    feedback: "Logical framework passes. Themes align with " + nao.coreTheme,
  };
}

/**
 * 3. Story Architect
 * Input: Validated Draft
 * Output: Structured Draft (STAR format)
 */
export async function executeStoryArchitect(draft: string): Promise<AgentResponse> {
  await new Promise((r) => setTimeout(r, 1200));
  
  return {
    agentName: "Story Architect",
    status: "success",
    jsonOutput: { structuralEdits: ["Moved paragraph 3 to intro", "Applied STAR framework to anecdote"] },
    feedback: "Narrative tension improved. Adjusted anecdote to match STAR format.",
  };
}

/**
 * 4. Editing Agent
 * Input: Structured Draft
 * Output: Polished Version
 */
export async function executeEditingAgent(structuredDraftInfo: any): Promise<AgentResponse> {
  await new Promise((r) => setTimeout(r, 1000));
  
  return {
    agentName: "Editing Agent",
    status: "success",
    jsonOutput: { metrics: { passiveVoice: 0, complexSentences: 2 } },
    feedback: "Removed passive voice and enhanced verb actionability without losing student voice fingerprint.",
  };
}

/**
 * 5. Gap Agent
 * Input: Polished Version + NAO 
 * Output: Final Score & Next Actions
 */
export async function executeGapAgent(finalDraftInfo: any, nao: NAO): Promise<AgentResponse> {
  await new Promise((r) => setTimeout(r, 1000));
  
  return {
    agentName: "Gap Agent",
    status: "success",
    jsonOutput: { finalScore: 92, missingElements: ["Quantified Impact in conclusion"] },
    feedback: "Overall health score: 92/100. Excellent narrative consistency.",
  };
}

/**
 * The Master Orchestration Engine
 * Simulates passing state sequentially through the Pipeline.
 */
export async function runFullOrchestrationCycle(draft: string, onUpdate: (trace: OrchestrationTrace) => void) {
  const history: AgentResponse[] = [];

  const publishState = (finalStatus: "approved" | "blocked", score: number = 0) => {
    onUpdate({ finalStatus, score, history: [...history] });
  };

  // Step 1: Strategy
  const step1 = await executeStrategyAgent();
  history.push(step1);
  publishState("approved");

  // Step 2: Framework (Decision Gate)
  const step2 = await executeFrameworkAgent(draft, step1.jsonOutput as NAO);
  history.push(step2);
  if (step2.status === "blocked") {
    publishState("blocked");
    return; // Halt Pipeline!
  }
  publishState("approved");

  // Step 3: Story Architect
  const step3 = await executeStoryArchitect(draft);
  history.push(step3);
  publishState("approved");

  // Step 4: Editing
  const step4 = await executeEditingAgent(step3.jsonOutput);
  history.push(step4);
  publishState("approved");

  // Step 5: Gap Analysis
  const step5 = await executeGapAgent(step4.jsonOutput, step1.jsonOutput as NAO);
  history.push(step5);
  publishState("approved", step5.jsonOutput.finalScore);
}
