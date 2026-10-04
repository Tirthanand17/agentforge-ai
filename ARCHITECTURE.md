# Architecture

## System goals

AgentForge AI demonstrates how to build an AI-native SaaS product where agents are observable, retrieval is grounded, tools are governed, and the web application can scale beyond a single chat endpoint.

## Application layers

### 1. Experience layer
The Next.js App Router frontend provides:
- SaaS dashboard
- agent task entry
- live trace visualization
- retrieval citations
- quality metrics
- knowledge-base status
- architecture/runtime visibility

### 2. Orchestration layer
The workflow is separated into:
1. Planner
2. Retriever
3. Analyst
4. Reviewer

The boundaries are intentional so each stage can later be replaced by LangGraph, a queue worker, or another orchestration framework.

### 3. Retrieval layer
The portfolio demo combines lexical overlap and deterministic vector-style hashing so it runs without external services.

Production design:
- PostgreSQL
- pgvector
- HNSW index
- metadata filters
- hybrid full-text + vector search
- optional reranker

### 4. Tool layer
Tools are allowlisted and selected based on request intent.

Current examples:
- knowledge.search
- metrics.calculator
- security.policy_check
- mcp.registry_lookup

An MCP 2.x server exposes interoperable tools and a resource.

### 5. Provider layer
The TypeScript provider interface supports:
- deterministic demo mode
- OpenAI-compatible endpoints
- production extensions for Gemini, Anthropic, and open models

### 6. Quality and safety
Every workflow exposes:
- citations
- retrieval confidence
- groundedness proxy
- safety score
- trace latency
- tool calls

Prompt-injection patterns reduce the safety score and demonstrate a policy gate.

## Deployment topology

### Portfolio deployment
Next.js can run as a single server deployment.

### Production deployment
Recommended:
- Vercel or container platform for Next.js
- FastAPI workers for Python AI services
- PostgreSQL + pgvector
- Redis for job state / queues
- object storage for documents
- managed secrets
- OpenTelemetry-compatible traces

## MCP
The MCP server targets the current 2.x Python SDK and provides:
- search_knowledge tool
- safe calculator tool
- agentforge://architecture resource

## CI
GitHub Actions validates:
- Node installation
- web tests
- production web build
- Python dependency install
- FastAPI tests
