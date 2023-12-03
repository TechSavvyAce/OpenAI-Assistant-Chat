// app/api/startChat/route.ts

// This file defines the API route for starting a chat session in an application.
// It handles POST requests for uploading a file to the OpenAI API for a chat session.
// The route processes the file from the request, saves it temporarily, and then
// uploads it to OpenAI, returning the file ID for further operations.

import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { createReadStream } from "fs";
import AdmZip from "adm-zip";
import OpenAI from "openai";
import xlsx from "node-xlsx";
import pathModule from "path";
import fs from "fs";

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
    const directory: string[] | null = data.get("path");

    // Handle the case where no file is found in the request
    if (!directory) {
      console.log("No Directory found in the request");
      return NextResponse.json({ success: false });
    }

    if (directory !== null) {
      for (const path of directory) {
        try {
          console.log(`uploadtoOpenAI: filepath = ${path}`);
          const fileForRetrieval = await openai.files.create({
            file: createReadStream(path),
            purpose: "assistants",
          });
          FileIds.push(fileForRetrieval.id);
          console.log(`File uploaded, ID: ${fileForRetrieval.id}`);
        } catch (e) {
          console.log(`Uploading file to OpenAI:`, e);
          throw e; // Propagate the error further if needed
        }
      }
    } else {
      console.log('Directory is null');
      // Handle the null case accordingly
    }
    
    if (FileIds && FileIds.length > 0) {
      return NextResponse.json({ success: true, fileIds: FileIds });
    } else {
      return NextResponse.json({ success: false, fileIds: FileIds });
    }
  } catch (error) {
    // Log and handle any errors during file upload
    console.log("Error uploading file:", error);
    return NextResponse.json({
      success: false,
      message: "Error uploading file",
    });
  }
}
