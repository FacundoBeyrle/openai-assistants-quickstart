import { NextRequest } from "next/server";
import { openai } from "@/app/openai";

export async function POST(request: NextRequest, { params }: { params: { threadId: string } }) {
  const { toolCallOutputs, runId } = await request.json();

  const stream = openai.beta.threads.runs.submitToolOutputsStream(
    params.threadId,
    runId,
    { tool_outputs: toolCallOutputs }
  );

  return new Response(stream.toReadableStream());
}
