export type KnowledgeDoc = {
  id: string;
  title: string;
  source: string;
  category: string;
  content: string;
};

export type AgentTrace = {
  agent: string;
  status: "completed" | "running" | "queued";
  detail: string;
  latencyMs: number;
};

export type Citation = {
  docId: string;
  title: string;
  snippet: string;
  score: number;
};

export type RunResult = {
  answer: string;
  citations: Citation[];
  traces: AgentTrace[];
  metrics: {
    groundedness: number;
    retrievalConfidence: number;
    safetyScore: number;
    latencyMs: number;
    estimatedTokens: number;
  };
  plan: string[];
  toolCalls: string[];
};
