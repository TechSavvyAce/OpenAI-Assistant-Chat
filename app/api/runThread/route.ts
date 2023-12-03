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

      const assistantName = formData.get("assistantName") as string;
      const assistantModel = formData.get("assistantModel") as string;
      const assistantDescription = formData.get(
        "assistantDescription",
      ) as string;
      const inputmessage = formData.get("inputmessage") as string;
      const fileIdsString = formData.get("fileIds") as string | null;

      // Check if 'fileIds' exists and is a non-null string
      let fileIds: string[] = [];

      if (fileIdsString) {
        // Split the string by a delimiter (comma in this case) to get an array of file IDs
        fileIds = fileIdsString.split(",");
      }
      console.log("Received File ID:", fileIds); // Log the received file ID

      if (!assistantName || !assistantModel || !assistantDescription) {
        throw new Error("Missing required assistant parameters");
      }

      if (inputmessage === null || typeof inputmessage !== "string") {
        throw new Error("inputmessage is missing or not a string");
      }

      const assistantOptions: any = {
        name: assistantName,
        instructions: assistantDescription,
        model: assistantModel,
        tools: [{ type: "retrieval" }],
      };
      if (fileIds) {
        assistantOptions.file_ids = fileIds;
      }
      console.log("Assistant Options:", assistantOptions); // Log assistant options

      const assistant = await openai.beta.assistants.create(assistantOptions);
      const assistantId = assistant.id;
      console.log("Assistant ID:", assistantId); // Log assistant ID

      const thread = await openai.beta.threads.create({
        messages: [
          {
            role: "user",
            content: inputmessage,
          },
        ],
      });
      const threadId = thread.id;
      console.log("Thread ID:", threadId); // Log thread ID

      // Start a conversation with the assistant
      const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId,
      });
      console.log("Started run with Id:", run.id);

      return NextResponse.json({
        assistantId: assistantId,
        threadId: threadId,
        runId: run.id
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
