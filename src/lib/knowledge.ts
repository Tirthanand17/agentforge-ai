import type { KnowledgeDoc } from "./types";

export const knowledgeBase: KnowledgeDoc[] = [
  {
    id: "kb-01",
    title: "Enterprise AI Security Policy",
    source: "security-policy.md",
    category: "Security",
    content:
      "Production AI systems must use least-privilege access, explicit tool allowlists, secret isolation, audit logging, prompt-injection checks, and human approval for high-impact write actions. Sensitive customer data must not be sent to unapproved model providers.",
  },
  {
    id: "kb-02",
    title: "RAG Quality Playbook",
    source: "rag-quality.md",
    category: "AI Quality",
    content:
      "A reliable retrieval-augmented generation pipeline should track retrieval recall, groundedness, citation coverage, latency, and cost. Hybrid retrieval can combine lexical relevance with vector similarity. Reranking improves precision when the candidate set is noisy.",
  },
  {
    id: "kb-03",
    title: "Agent Workflow Standard",
    source: "agent-workflows.md",
    category: "Agents",
    content:
      "Agentic workflows should separate planning, retrieval, execution, and review. Tool calls should be schema validated. Long-running workflows benefit from durable state, checkpoints, retries, idempotency, and human-in-the-loop approval at critical boundaries.",
  },
  {
    id: "kb-04",
    title: "SaaS Architecture Notes",
    source: "saas-architecture.md",
    category: "Architecture",
    content:
      "A multi-tenant SaaS platform should isolate tenant data, enforce role-based access, centralize observability, support rate limits, and separate interactive request paths from background jobs. PostgreSQL can store application data while pgvector supports vector similarity search alongside relational data.",
  },
  {
    id: "kb-05",
    title: "Model Cost Optimization",
    source: "model-cost.md",
    category: "FinOps",
    content:
      "AI cost can be reduced with model routing, prompt compression, semantic caching, smaller models for classification, batched embeddings, response streaming, and quality-based fallbacks. Track latency and token usage per workflow rather than only at the account level.",
  },
  {
    id: "kb-06",
    title: "MCP Integration Guide",
    source: "mcp-integration.md",
    category: "Integrations",
    content:
      "Model Context Protocol provides a standard way for AI applications to connect to tools, resources, and prompts. A production MCP integration should validate arguments, isolate credentials, return structured errors, and expose only the minimum tools required by the workflow.",
  },
];
