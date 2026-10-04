import { NextResponse } from "next/server";
import { runAgentWorkflow } from "@/lib/agents";

export async function POST(request: Request) {
  const body = await request.json();
  const input = typeof body?.input === "string" ? body.input.trim() : "";

  if (!input) {
    return NextResponse.json({ error: "Input is required." }, { status: 400 });
  }

  return NextResponse.json(runAgentWorkflow(input));
}
