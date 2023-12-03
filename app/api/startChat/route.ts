// app/api/startChat/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  console.log("STARTET STARTCHAT API ROUTE INSIDE!!!!");
  if (req.method === "POST") {
    try {
      const formData = await req.formData();
      console.log("Form Data:", formData); // Log form data

      const assistantId = formData.get("assistantId") as string;
      const threadId = formData.get("threadId") as string;
      const runId = formData.get("runId") as string;
      // const inputmessage = formData.get("inputmessage") as string;
      // const fileIdsString = formData.get("fileIds") as string | null;

      // Poll for the completion of the run
      let completedRun;
      do {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for 1 second

        completedRun = await openai.beta.threads.runs.retrieve(
          threadId,
          runId,
        );
        console.log("Run status:", completedRun.status); // Log the status each time

        // Return if the run appears dead
        if (
          completedRun.status === "cancelled" ||
          completedRun.status === "cancelling" ||
          completedRun.status === "failed" ||
          completedRun.status === "expired"
        ) {
          return NextResponse.json({
            error: `Run stopped due to status: ${completedRun.status}`,
          });
        }
      } while (completedRun.status !== "completed");

      // After the run has completed
      const messages = await openai.beta.threads.messages.list(threadId);
      // Log the content of each message
      messages.data.forEach((message, index) => {
        console.log(`Message ${index + 1} content:`, message.content);
      });

      // A bunch of boring safety checks
      const assistantMessage = messages.data.at(-2);
      if (!assistantMessage) {
        return NextResponse.json({ error: "No last message found" });
      }

      const assistantMessageContent = assistantMessage.content.at(0);
      if (!assistantMessageContent) {
        return NextResponse.json({ error: "No assistant message found" });
      }

      if (assistantMessageContent.type !== "text") {
        return NextResponse.json({
          error:
            "Assistant message is not text, only text supported in this demo",
        });
      }

      return NextResponse.json({
        response: assistantMessageContent.text.value,
        assistantId: assistantId,
        threadId: threadId,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.message });
      } else {
        console.error("Unknown error:", error);
        return NextResponse.json({ error: "An unknown error occurred" });
      }
    }
  }
}
