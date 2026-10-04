from __future__ import annotations

import ast
import operator as op

from mcp.server.mcpserver import MCPServer

mcp = MCPServer("agentforge-mcp", version="0.1.0")

KNOWLEDGE = {
    "security": "Use least privilege, allowlisted tools, isolated secrets, audit logs, and human approval for high-impact actions.",
    "rag": "Track retrieval recall, groundedness, citation coverage, latency, and cost. Use hybrid retrieval and reranking when needed.",
    "agents": "Separate planning, retrieval, execution, and review. Validate tool arguments and use checkpoints for long workflows.",
}

OPS = {
    ast.Add: op.add,
    ast.Sub: op.sub,
    ast.Mult: op.mul,
    ast.Div: op.truediv,
    ast.Mod: op.mod,
    ast.Pow: op.pow,
    ast.USub: op.neg,
}


def _eval(node):
    if isinstance(node, ast.Constant) and isinstance(node.value, (int, float)):
        return node.value
    if isinstance(node, ast.UnaryOp) and type(node.op) in OPS:
        return OPS[type(node.op)](_eval(node.operand))
    if isinstance(node, ast.BinOp) and type(node.op) in OPS:
        return OPS[type(node.op)](_eval(node.left), _eval(node.right))
    raise ValueError("Unsupported expression")


@mcp.tool()
def search_knowledge(topic: str) -> str:
    """Search AgentForge's governed knowledge for a short topic."""
    key = topic.lower().strip()
    for name, content in KNOWLEDGE.items():
        if key in name or key in content.lower():
            return content
    return "No direct match found. Available topics: security, rag, agents."


@mcp.tool()
def calculate(expression: str) -> str:
    """Safely evaluate simple arithmetic expressions."""
    try:
        tree = ast.parse(expression, mode="eval")
        return str(_eval(tree.body))
    except Exception:
        return "Invalid or unsupported expression."


@mcp.resource("agentforge://architecture")
def architecture() -> str:
    """Describe the production architecture exposed to MCP clients."""
    return (
        "Next.js web app + agent orchestration + RAG retrieval + FastAPI service + "
        "MCP tools + PostgreSQL/pgvector-ready storage + evaluation + guardrails."
    )


if __name__ == "__main__":
    mcp.run()
