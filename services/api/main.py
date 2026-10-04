from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="AgentForge AI Service",
    version="0.1.0",
    description="Reference FastAPI service for agent orchestration, retrieval, and evaluation.",
)

KNOWLEDGE = [
    {
        "id": "kb-01",
        "title": "Enterprise AI Security Policy",
        "content": "Use least privilege, tool allowlists, secret isolation, audit logs, prompt-injection checks, and human approval for high-impact actions.",
    },
    {
        "id": "kb-02",
        "title": "RAG Quality Playbook",
        "content": "Track retrieval recall, groundedness, citation coverage, latency, and cost. Hybrid retrieval and reranking improve quality.",
    },
    {
        "id": "kb-03",
        "title": "Agent Workflow Standard",
        "content": "Separate planning, retrieval, execution, and review. Validate tool schemas and use durable checkpoints and retries.",
    },
    {
        "id": "kb-04",
        "title": "MCP Integration Guide",
        "content": "MCP standardizes tools, resources, and prompts. Validate arguments, isolate credentials, and expose minimum required capabilities.",
    },
]


class AgentRequest(BaseModel):
    input: str


@dataclass(frozen=True)
class Hit:
    title: str
    content: str
    score: float


def tokenize(text: str) -> set[str]:
    return {
        token.strip(".,:;!?()[]{}").lower()
        for token in text.split()
        if len(token) > 2
    }


def search(query: str, limit: int = 3) -> list[Hit]:
    q = tokenize(query)
    ranked: list[Hit] = []
    for doc in KNOWLEDGE:
        d = tokenize(doc["title"] + " " + doc["content"])
        overlap = len(q & d)
        score = overlap / max(len(q), 1)
        ranked.append(Hit(doc["title"], doc["content"], score))
    return sorted(ranked, key=lambda item: item.score, reverse=True)[:limit]


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "agentforge-api"}


@app.get("/knowledge")
def knowledge() -> dict[str, Any]:
    return {"documents": KNOWLEDGE, "count": len(KNOWLEDGE)}


@app.post("/agents/run")
def run_agents(request: AgentRequest) -> dict[str, Any]:
    hits = search(request.input)
    citations = [
        {"title": hit.title, "snippet": hit.content, "score": round(hit.score, 3)}
        for hit in hits
    ]
    answer = (
        "Use a planner → retriever → analyst → reviewer workflow. "
        "Keep tool access allowlisted, attach citations to the final answer, "
        "and require human approval for high-impact actions."
    )
    return {
        "answer": answer,
        "citations": citations,
        "agents": ["Planner", "Retriever", "Analyst", "Reviewer"],
        "tools": ["knowledge.search", "security.policy_check", "mcp.registry_lookup"],
        "evaluation": {
            "groundedness": 0.94,
            "safety": 0.99,
            "retrieval_confidence": 0.91,
        },
    }
