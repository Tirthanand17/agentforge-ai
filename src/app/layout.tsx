import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentForge AI — Agentic KnowledgeOps Cloud",
  description:
    "Production-style full-stack AI SaaS portfolio demo with agents, RAG, MCP-ready tools, evaluation, guardrails, and observability.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
