# AgentForge AI — Agentic KnowledgeOps Cloud

AgentForge AI is a production-style full-stack AI SaaS portfolio project built to demonstrate the skills repeatedly requested in current AI/LLM freelance work: modern web development, agentic workflows, retrieval-augmented generation, tool calling, MCP integration, evaluation, guardrails, APIs, observability, and deployment.

## Live capabilities

- Multi-agent workflow: Planner → Retriever → Analyst → Reviewer
- Hybrid retrieval over a governed knowledge base
- Citation-backed answers
- Prompt-injection risk checks and tool allowlists
- Agent trace and latency observability
- Groundedness, retrieval-confidence, and safety metrics
- REST API routes plus an SSE streaming endpoint
- Next.js 16 + React 19 + TypeScript frontend
- FastAPI reference service
- MCP 2.x server using the current official Python SDK
- Docker Compose architecture
- GitHub Actions CI
- Optional provider adapters for real LLM APIs

## Product architecture

```text
Browser / Next.js UI
        |
        +--> /api/run ---------> Agent Orchestrator
        |                          |
        |                          +--> Planner
        |                          +--> Hybrid Retriever
        |                          +--> Tool Policy / Guardrails
        |                          +--> Analyst
        |                          +--> Reviewer / Evals
        |
        +--> /api/stream ------> Server-Sent Events
        |
        +--> /api/knowledge ---> Governed Knowledge Base

Production extension:
Next.js -> FastAPI -> PostgreSQL + pgvector
                    -> MCP tools/resources
                    -> LLM provider adapters
                    -> Background jobs / webhooks
                    -> Observability / eval store
```

## Why this is more than a chatbot wrapper

The demo runs deterministically without a paid API key, but the architecture separates retrieval, tools, evaluation, and provider integration so a real model can be swapped in without rewriting the application.

The project includes:
- provider-neutral LLM adapter interfaces
- production-oriented agent boundaries
- security checks before tool execution
- structured citations and quality metrics
- an MCP server for interoperable tools/resources
- a separate FastAPI service for Python-first deployments

## Web stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide icons
- Server route handlers
- Server-Sent Events
- Vitest

## AI / backend stack

- Agent orchestration
- Hybrid lexical + vector-style retrieval demo
- RAG architecture
- LLM provider adapters
- FastAPI
- MCP 2.x official Python SDK
- pgvector-ready production architecture
- Evaluation and guardrails
- REST + streaming APIs

## Local run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Tests

Web:

```bash
npm test
npm run build
```

FastAPI:

```bash
python -m pip install -r services/api/requirements.txt
python -m pytest -q services/api/tests
```

MCP:

```bash
python -m pip install -r services/mcp/requirements.txt
python services/mcp/server.py
```

## API examples

Run the agent workflow:

```bash
curl -X POST http://localhost:3000/api/run \
  -H "Content-Type: application/json" \
  -d "{\"input\":\"Design a secure RAG system with MCP tools\"}"
```

Streaming endpoint:

```text
POST /api/stream
Content-Type: text/event-stream
```

FastAPI reference service:

```text
GET  /health
GET  /knowledge
POST /agents/run
```

## Production extensions

- PostgreSQL + pgvector HNSW indexes
- Supabase/Auth0/Clerk authentication
- tenant-isolated knowledge bases
- OpenAI / Anthropic / Gemini provider adapters
- reranking and embedding models
- Redis-backed durable workflows
- human approval checkpoints
- background queues
- Stripe subscriptions and usage metering
- tracing / token-cost dashboards
- object storage for uploaded documents
- OCR and multimodal document ingestion

## Security

The portfolio demo deliberately avoids storing third-party API keys. See [SECURITY.md](SECURITY.md) for the security model.

## Research

The project scope was selected after reviewing current full-stack AI/LLM Upwork requirements and current official platform documentation. See [docs/MARKET_RESEARCH.md](docs/MARKET_RESEARCH.md).

## License

MIT
