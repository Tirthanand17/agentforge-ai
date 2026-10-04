# Security Model

AgentForge AI is a portfolio demo designed to show secure AI application patterns.

## Controls demonstrated

- tool allowlisting
- prompt-injection pattern checks
- provider key isolation
- citation-backed responses
- explicit reviewer stage
- deterministic demo mode
- safe AST-based arithmetic tool
- no secrets committed to the repository
- runtime dependency audit
- CI tests for web and API layers

## Production recommendations

For a real tenant-facing deployment:
- store secrets only in managed environment variables
- use authenticated users and role-based access
- isolate data by tenant ID at every query boundary
- use signed upload URLs
- scan uploaded files
- rate limit agent and model endpoints
- require human approval for irreversible actions
- log tool calls and authorization decisions
- encrypt sensitive data in transit and at rest
- add CSP, CSRF protections, and secure headers
- run dependency and container scanning in CI
- perform prompt-injection testing against retrieved content

## Important portfolio note

The public demo does not require or expose an OpenAI, Anthropic, or Gemini API key. Real provider integrations are intentionally opt-in.
