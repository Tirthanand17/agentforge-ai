import { NextResponse } from "next/server";
import { getKnowledgeBase } from "@/lib/retrieval";

export async function GET() {
  return NextResponse.json({
    documents: getKnowledgeBase(),
    mode: "portfolio-demo",
    retrieval: "hybrid lexical + hashed-vector",
  });
}
