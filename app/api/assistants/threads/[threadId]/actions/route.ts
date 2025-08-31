import { NextRequest } from "next/server";
import { openai } from "@/app/openai";

export async function POST(request: NextRequest, context: { params?: Record<string, string> }) {
  const { toolCallOutputs, runId } = await request.json();

  const threadId = context.params?.threadId;
  if (!threadId) {
    return new Response("Missing threadId", { status: 400 });
  }

  const stream = openai.beta.threads.runs.submitToolOutputsStream(
    threadId,
    runId,
    { tool_outputs: toolCallOutputs }
  );

  return new Response(stream.toReadableStream());
}
