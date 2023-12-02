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
// import { load } from "@pspdfkit/nodejs";
// import { PromptTemplate } from "langchain/prompts";
// import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { PDFLoader } from "langchain/document_loaders/fs/pdf";
// import { TextLoader } from "langchain/document_loaders/fs/text";
// import { DocxLoader } from "langchain/document_loaders/fs/docx";
// import { CSVLoader } from "langchain/document_loaders/fs/csv";
// import { Document } from "langchain/document";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let FileIds: String[] = [];

// async function uploadFileLangChain(path: string) {
//   try {
//     let type = pathModule.extname(path).slice(1);

//     let combinedDecompSPR = "";
//     let docs_raw: Document<Record<string, any>>[] = [];
//     const textSplitter = new RecursiveCharacterTextSplitter({
//       //chunkSize: 9999,
//       chunkSize: 133333,
//       chunkOverlap: 250,
//     });
//     // Read the file
//     //try {
//     if (type === "pdf") {
//       const pdfLoader = new PDFLoader(path);
//       docs_raw = await pdfLoader.loadAndSplit(textSplitter);
//     } else if (type === "text") {
//       const txtLoader = new TextLoader(path);
//       docs_raw = await txtLoader.loadAndSplit(textSplitter);
//     } else if (type === "csv") {
//       const csvLoader = new CSVLoader(path);
//       docs_raw = await csvLoader.loadAndSplit(textSplitter);
//     } else if (type === "doc" || type === "docx") {
//       const docxLoader = new DocxLoader(path);
//       docs_raw = await docxLoader.loadAndSplit(textSplitter);
//     } else {
//       sendData("[Processing]:" + "Unsupported File. Please try again.");
//       sendData("[DONE]");
//       response.end();
//       return;
//     }
//   } catch (e) {
//     console.log("Uploading with LangChain Error:", e);
//   }
// }

async function uploadtoOpenAI(filepath: string) {
  try {
    const fileForRetrieval = await openai.files.create({
      file: createReadStream(filepath),
      purpose: "assistants",
    });
    FileIds.push(fileForRetrieval.id);
    console.log(`File uploaded, ID: ${fileForRetrieval.id}`);
  } catch (e) {
    console.log(`Uploading file to OpenAI:`, e);
  }
}

// Function to convert XLSX to PDF
async function convertXlsxToCSV(xlsxFilePath: string, csvFilePath: string) {
  try {
    let obj = xlsx.parse(xlsxFilePath);
    var rows = [];
    var writeStr = "";

    //looping through all sheets
    for (var i = 0; i < obj.length; i++) {
      var sheet = obj[i];
      //loop through all rows in the sheet
      for (var j = 0; j < sheet["data"].length; j++) {
        //add the row to the rows array
        rows.push(sheet["data"][j]);
      }
    }

    //creates the csv string to write it to a file
    for (var i = 0; i < rows.length; i++) {
      writeStr += rows[i].join(",") + "\n";
    }

    //writes to a file, but you will presumably send the csv as a
    //response instead
    fs.writeFile(csvFilePath, writeStr, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log(`Converted from ${xlsxFilePath} to CSV successfully!`);

      uploadtoOpenAI(csvFilePath);
    });
  } catch (error) {
    console.error(`Error while converting ${xlsxFilePath} to CSV:`, error);
    throw error; // Propagate the error further if needed
  }
}

// Function to recursively convert XLSX files in subdirectories to PDFs
async function convertXlsxFilesToPdf(directory: string) {
  try {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const filePath = pathModule.join(directory, file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isDirectory()) {
        await convertXlsxFilesToPdf(filePath); // Recursively handle subdirectories
      } else if (file.endsWith(".xlsx")) {
        const csvFileName = `${pathModule.basename(file, ".xlsx")}.csv`;
        const csvFilePath = pathModule.join(directory, csvFileName);

        await convertXlsxToCSV(filePath, csvFilePath);
        console.log(`Converted ${file} to ${csvFileName}`);
      } else {
        uploadtoOpenAI(filePath);
      }
    }
  } catch (error) {
    console.error(`Error while processing directory ${directory}:`, error);
    throw error; // Propagate the error further if needed
  }
}

export async function POST(request: NextRequest) {
  try {
    // Logging the start of the upload process
    console.log(`Upload API call started`);

    // Retrieving the file from the form data
    const data = await request.formData();
    const uploadedfile: File | null = data.get("File") as unknown as File;

    // Handle the case where no file is found in the request
    if (!uploadedfile) {
      console.log("No File found in the request");
      return NextResponse.json({ success: false });
    }

    // Convert file to buffer and write to a temporary location
    const bytes = await uploadedfile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadedFilePath = `/tmp/${uploadedfile.name}`;
    await writeFile(uploadedFilePath, buffer);
    console.log(`File written to ${uploadedFilePath}`);

    ////////// FILE CHANGE IS STARTED /////////////
    const uploadedFileType = pathModule.extname(uploadedfile.name).slice(1);
    if (uploadedFileType === "zip") {
      // Extract the contents of the uploaded ZIP file
      const zip = new AdmZip(uploadedFilePath); // or use 'unzipper' for extraction
      const extractDir = `/tmp/${pathModule.parse(uploadedfile.name).name}`; // Directory to extract files
      zip.extractAllTo(extractDir, /*overwrite*/ true);

      console.log(`zipFile is extracted to ${extractDir}`);
      // Start conversion process
      convertXlsxFilesToPdf(extractDir)
        .then(() => console.log("All XLSX files converted to PDFs"))
        .catch((err) => console.error("Conversion error:", err));
    }

    ////////// FILE CHANGE IS FINISHED /////////////

    // Start uploading the file to OpenAI
    console.log("Starting file upload to OpenAI");
    const fileForRetrieval = await openai.files.create({
      file: createReadStream(uploadedFilePath),
      purpose: "assistants",
    });
    FileIds.push(fileForRetrieval.id);
    console.log(`File uploaded, ID: ${fileForRetrieval.id}`);

    // Respond with success and the file ID
    return NextResponse.json({ success: true, fileIds: FileIds });
  } catch (error) {
    // Log and handle any errors during file upload
    console.error("Error uploading file:", error);
    return NextResponse.json({
      success: false,
      message: "Error uploading file",
    });
  }
}