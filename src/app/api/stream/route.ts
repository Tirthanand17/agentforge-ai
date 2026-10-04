import { runAgentWorkflow } from "@/lib/agents";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json();
  const input = typeof body?.input === "string" ? body.input.trim() : "";

  if (!input) {
    return new Response("input required", { status: 400 });
  }

  const encoder = new TextEncoder();
  const result = runAgentWorkflow(input);

  const stream = new ReadableStream({
    async start(controller) {
      for (const trace of result.traces) {
        controller.enqueue(
          encoder.encode("data: " + JSON.stringify({ type: "trace", payload: trace }) + "\n\n")
        );
        await new Promise((resolve) => setTimeout(resolve, 80));
      }

      controller.enqueue(
        encoder.encode("data: " + JSON.stringify({ type: "result", payload: result }) + "\n\n")
      );
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
