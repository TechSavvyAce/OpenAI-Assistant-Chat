// app/api/addMessage/route.ts

// This file defines the API route for adding a new message to a thread using
// the OpenAI API. It is designed to handle POST requests, taking 'threadId' and
// 'input' from the form data to create a new message in the specified thread.

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    // Extract thread ID and input content from form data
    const formData = await req.formData();
    const threadId = formData.get('threadId') as string;
    const input = formData.get('input') as string;

    // Log the received thread ID and input for debugging purposes
    console.log(`inside add_Message -Thread ID: ${threadId}`);
    console.log(`inside add_Message -Input: ${input}`);

    // Validate the input data
    if (typeof input !== 'string') {
      throw new Error('Input is not a string');
    }

    // If input is provided, create a new message in the thread using the OpenAI API
    if (input) {
      await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: input,
      });
      console.log("add_Message successfully");
      return NextResponse.json({ message: "Message created successfully" });
    }

    // Respond with a message indicating no action was performed if input is empty
    return NextResponse.json({ message: 'No action performed' });
  } catch (error) {
    // Error handling with detailed logging
    if (error instanceof Error) {
      console.error('Error:', error);
      return NextResponse.json({ error: error.message });
    } else {
      console.error('Unknown error:', error);
      return NextResponse.json({ error: 'An unknown error occurred' });
    }
  }
}