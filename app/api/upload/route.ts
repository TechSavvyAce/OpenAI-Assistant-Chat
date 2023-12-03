// app/api/startChat/route.ts

// This file defines the API route for starting a chat session in an application.
// It handles POST requests for uploading a file to the OpenAI API for a chat session.
// The route processes the file from the request, saves it temporarily, and then
// uploads it to OpenAI, returning the file ID for further operations.

import { NextRequest, NextResponse } from "next/server";
import { createReadStream } from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let FileIds: String[] = [];

export async function POST(request: NextRequest) {
  try {
    // Logging the start of the upload process
    console.log(`Upload API call started`);

    // Retrieving the file from the form data
    const data = await request.formData();
    const directoryString = data.get("path") as string | null;

    // Handle the case where no file is found in the request
    if (!directoryString) {
      console.log("No Directory found in the request");
      return NextResponse.json({ success: false });
    }

    try {
      console.log(`uploadtoOpenAI: filepath = ${directoryString}`);
      const fileForRetrieval = await openai.files.create({
        file: createReadStream(directoryString),
        purpose: "assistants",
      });
      console.log(`File uploaded, ID: ${fileForRetrieval.id}`);
      return NextResponse.json({ success: true, fileId: fileForRetrieval.id });
    } catch (e) {
      console.log(`Uploading file to OpenAI:`, e);
      throw e; // Propagate the error further if needed
    }

    return NextResponse.json({ success: false });
  } catch (error) {
    // Log and handle any errors during file upload
    console.log("Error uploading file:", error);
    return NextResponse.json({
      success: false,
      message: "Error uploading file",
    });
  }
}
