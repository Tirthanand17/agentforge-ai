"use client";

import {
  Activity, Bot, BrainCircuit, CheckCircle2, ChevronRight, Database, FileText,
  Gauge, GitBranch, Globe2, Layers3, LockKeyhole, Network, Play, Search,
  ShieldCheck, Sparkles, TerminalSquare, Workflow, Zap
} from "lucide-react";
import { useMemo, useState } from "react";
import type { RunResult } from "@/lib/types";

const prompts = [
  "Design a safe RAG architecture for a multi-tenant SaaS product.",
  "How should an AI agent defend against prompt injection and unsafe tool calls?",
  "What is the best architecture for MCP tools, vector search, and human approvals?",
];

const docs = [
  ["Enterprise AI Security Policy", "Security", "6 chunks"],
  ["RAG Quality Playbook", "AI Quality", "8 chunks"],
  ["Agent Workflow Standard", "Agents", "7 chunks"],
  ["SaaS Architecture Notes", "Architecture", "9 chunks"],
];

function pct(value: number) {
  return Math.round(value * 100) + "%";
}

export default function Home() {
  const [input, setInput] = useState(prompts[0]);
  const [result, setResult] = useState<RunResult | null>(null);
  const [loading, setLoading] = useState(false);

  const metrics = useMemo(
    () => [
      ["Groundedness", result ? pct(result.metrics.groundedness) : "96%", ShieldCheck],
      ["Retrieval", result ? pct(result.metrics.retrievalConfidence) : "92%", Search],
      ["Safety", result ? pct(result.metrics.safetyScore) : "99%", LockKeyhole],
      ["Latency", result ? result.metrics.latencyMs + "ms" : "184ms", Zap],
    ],
    [result]
  );

  async function run() {
    setLoading(true);
    try {
      const response = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
      const payload = await response.json();
      setResult(payload);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#071016] text-white">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="sticky top-0 z-30 border-b border-white/8 bg-[#071016]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="logo-mark"><BrainCircuit size={22} /></div>
            <div>
              <div className="font-semibold tracking-tight">AgentForge AI</div>
              <div className="text-[11px] text-slate-500">Agentic KnowledgeOps Cloud</div>
            </div>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <span className="status-dot" />
            <span className="text-xs text-emerald-300">All systems operational</span>
            <span className="mx-3 h-4 w-px bg-white/10" />
            <span className="chip">Demo workspace</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-5 px-5 py-6 lg:grid-cols-[220px_1fr] lg:px-8">
        <aside className="card h-fit p-3 lg:sticky lg:top-24">
          {[
            [Activity, "Overview", true],
            [Bot, "Agent runs", false],
            [Database, "Knowledge", false],
            [Workflow, "Workflows", false],
            [Gauge, "Evaluations", false],
            [TerminalSquare, "MCP tools", false],
          ].map(([Icon, label, active]) => {
            const I = Icon as typeof Activity;
            return (
              <button key={String(label)} className={"nav-item " + (active ? "nav-active" : "")}>
                <I size={17} />
                <span>{String(label)}</span>
              </button>
            );
          })}

          <div className="my-3 border-t border-white/8" />
          <div className="px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-600">
            Runtime
          </div>
          <div className="runtime-row"><Network size={14} /> Multi-agent graph</div>
          <div className="runtime-row"><Layers3 size={14} /> Hybrid retrieval</div>
          <div className="runtime-row"><ShieldCheck size={14} /> Guardrails enabled</div>
        </aside>

        <section className="space-y-5">
          <div className="hero card overflow-hidden">
            <div className="relative z-10 max-w-3xl p-7 lg:p-9">
              <div className="eyebrow"><Sparkles size={13} /> Production AI portfolio demo</div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight lg:text-5xl">
                Orchestrate agents. Ground every answer. <span className="text-gradient">See every step.</span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 lg:text-base">
                A full-stack Agentic AI SaaS workspace combining planning, RAG, tool calling, MCP-ready integrations,
                evaluation, guardrails, and production observability.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Next.js 16", "TypeScript", "AI Agents", "RAG", "MCP", "FastAPI", "Vector Search", "CI/CD"].map((tag) => (
                  <span className="tech-pill" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="hero-grid" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map(([label, value, Icon]) => {
              const I = Icon as typeof ShieldCheck;
              return (
                <div className="metric card" key={String(label)}>
                  <div className="metric-icon"><I size={17} /></div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500">{String(label)}</div>
                    <div className="mt-1 text-xl font-semibold">{String(value)}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.35fr_.8fr]">
            <div className="card overflow-hidden">
              <div className="panel-head">
                <div>
                  <div className="panel-title"><Bot size={18} /> Agent workspace</div>
                  <div className="panel-sub">Ask the multi-agent system to reason over governed knowledge.</div>
                </div>
                <span className="chip">4 agents</span>
              </div>

              <div className="p-5">
                <div className="prompt-box">
                  <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={4} aria-label="Agent task" />
                  <div className="flex items-center justify-between gap-3 border-t border-white/8 px-3 py-3">
                    <div className="flex gap-2">
                      <span className="mini-chip"><Database size={12} />6 sources</span>
                      <span className="mini-chip"><ShieldCheck size={12} />policy gated</span>
                    </div>
                    <button className="run-button" onClick={run} disabled={loading}>
                      {loading ? <span className="spinner" /> : <Play size={15} fill="currentColor" />}
                      {loading ? "Running" : "Run agents"}
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {prompts.map((prompt, index) => (
                    <button key={prompt} className="suggestion" onClick={() => setInput(prompt)}>
                      0{index + 1} <ChevronRight size={12} />
                    </button>
                  ))}
                </div>

                <div className="mt-5 answer-card">
                  <div className="answer-label"><Sparkles size={14} /> Final answer</div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {result?.answer ??
                      "Run the workflow to see a grounded answer, evidence citations, agent traces, tool calls, and quality metrics."}
                  </p>

                  {result?.citations?.length ? (
                    <div className="mt-4 grid gap-2">
                      {result.citations.map((citation, idx) => (
                        <div key={citation.docId} className="citation">
                          <div className="flex items-center gap-2">
                            <FileText size={14} />
                            <span className="font-medium">{idx + 1}. {citation.title}</span>
                            <span className="ml-auto text-emerald-300">{Math.round(citation.score * 100)}%</span>
                          </div>
                          <p className="mt-1 line-clamp-2 text-xs text-slate-500">{citation.snippet}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="card overflow-hidden">
              <div className="panel-head">
                <div>
                  <div className="panel-title"><GitBranch size={18} /> Live agent trace</div>
                  <div className="panel-sub">Observable multi-step execution.</div>
                </div>
              </div>
              <div className="p-5">
                {(result?.traces ?? [
                  { agent: "Planner", detail: "Intent decomposition + tool policy", latencyMs: 18, status: "completed" as const },
                  { agent: "Retriever", detail: "Hybrid search across knowledge", latencyMs: 34, status: "completed" as const },
                  { agent: "Analyst", detail: "Evidence synthesis + reasoning", latencyMs: 41, status: "completed" as const },
                  { agent: "Reviewer", detail: "Grounding + safety evaluation", latencyMs: 22, status: "completed" as const },
                ]).map((trace, index, arr) => (
                  <div className="trace" key={trace.agent + "-" + index}>
                    <div className="trace-axis">
                      <span className="trace-node"><CheckCircle2 size={14} /></span>
                      {index < arr.length - 1 ? <span className="trace-line" /> : null}
                    </div>
                    <div className="pb-5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{trace.agent}</span>
                        <span className="text-[11px] text-slate-600">{trace.latencyMs} ms</span>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{trace.detail}</p>
                    </div>
                  </div>
                ))}

                <div className="mt-1 rounded-xl border border-white/8 bg-black/20 p-3">
                  <div className="text-[10px] uppercase tracking-[.14em] text-slate-600">Tools selected</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(result?.toolCalls ?? ["knowledge.search", "security.policy_check", "mcp.registry_lookup"]).map((tool) => (
                      <span key={tool} className="tool-chip">{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1fr_.72fr]">
            <div className="card overflow-hidden">
              <div className="panel-head">
                <div>
                  <div className="panel-title"><Database size={18} /> Knowledge base</div>
                  <div className="panel-sub">Tenant-aware document collections and retrieval sources.</div>
                </div>
                <span className="chip">6 indexed</span>
              </div>
              <div className="divide-y divide-white/6">
                {docs.map(([title, category, chunks]) => (
                  <div className="doc-row" key={title}>
                    <div className="doc-icon"><FileText size={16} /></div>
                    <div>
                      <div className="text-sm font-medium">{title}</div>
                      <div className="mt-1 text-xs text-slate-600">{category} · {chunks}</div>
                    </div>
                    <span className="ml-auto text-xs text-emerald-400">Indexed</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <div className="panel-title"><Globe2 size={18} /> Production architecture</div>
              <div className="mt-4 space-y-3">
                {[
                  ["Web", "Next.js · React · TypeScript"],
                  ["AI", "Agents · RAG · LLM adapters"],
                  ["Data", "Postgres · pgvector-ready"],
                  ["Tools", "MCP · REST · Webhooks"],
                  ["Quality", "Evals · Guardrails · Traces"],
                  ["Deploy", "Vercel · FastAPI · CI/CD"],
                ].map(([k, v]) => (
                  <div key={k} className="stack-row">
                    <span>{k}</span>
                    <strong>{v}</strong>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl border border-emerald-400/15 bg-emerald-400/5 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-300">
                  <ShieldCheck size={16} /> Demo mode is deterministic
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  No paid API key is required. Production adapters can connect Gemini, OpenAI, Anthropic, or open models.
                </p>
              </div>
            </div>
          </div>

          <footer className="flex flex-col justify-between gap-2 border-t border-white/6 py-5 text-xs text-slate-600 sm:flex-row">
            <span>AgentForge AI · portfolio-grade full-stack AI SaaS</span>
            <span>Agents · RAG · MCP · Evaluation · Guardrails · APIs</span>
          </footer>
        </section>
      </div>
    </main>
  );
}
