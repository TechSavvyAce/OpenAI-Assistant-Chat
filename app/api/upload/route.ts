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
    throw e; // Propagate the error further if needed
  }
}

// Function to convert XLSX to PDF
async function convertXlsxToCSVAndUpload(xlsxFilePath: string, csvFilePath: string) {
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

    // writes to a file, but you will presumably send the csv as a
    // response instead
    fs.writeFile(csvFilePath, writeStr, function (err) {
      if (err) {
        console.error(err);
        throw err; // Handle the error if needed
      }
      console.log(
        `Converted from ${xlsxFilePath} to ${csvFilePath} successfully!`,
      );

      return uploadtoOpenAI(csvFilePath);
    });
  } catch (error) {
    console.error(`Error while converting ${xlsxFilePath} to CSV:`, error);
    throw error; // Propagate the error further if needed
  }
}

// Function to recursively convert XLSX files in subdirectories to PDFs
async function convertXlsxFilesToCSVAndUpload(directory: string) {
  try {
    const files = fs.readdirSync(directory);
    const uploadPromises = [];

    for (const file of files) {
      const filePath = pathModule.join(directory, file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isDirectory()) {
        await convertXlsxFilesToCSVAndUpload(filePath); // Recursively handle subdirectories
      } else if (file.endsWith(".xlsx")) {
        const csvFileName = `${pathModule.basename(file, ".xlsx")}.csv`;
        const csvFilePath = pathModule.join(directory, csvFileName);

        uploadPromises.push(convertXlsxToCSVAndUpload(filePath, csvFilePath));
        await convertXlsxToCSVAndUpload(filePath, csvFilePath);
      } else {
        // uploadtoOpenAI(filePath);
        console.log("Unsupported file type:", file);
      }
    }

    return Promise.all(uploadPromises);
  } catch (error) {
    console.error(`Error while processing directory ${directory}:`, error);
    throw error; // Propagate the error further if needed
  }
}

async function POST(request: NextRequest) {
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
      const zip = new AdmZip(uploadedFilePath);
      const extractDir = `/tmp/${pathModule.parse(uploadedfile.name).name}`;
      zip.extractAllTo(extractDir, true);
    
      console.log(`zipFile is extracted to ${extractDir}`);
      await convertXlsxFilesToCSVAndUpload(extractDir);
    } else {
      await uploadtoOpenAI(uploadedFilePath);
    }

    const fileRetrievalPromises: Promise<any>[] = FileIds.map((fileId) => openai.files.retrieve(fileId));
    await Promise.all(fileRetrievalPromises);

    if (FileIds && FileIds.length > 0) {
      return NextResponse.json({ success: true, fileIds: FileIds });
    } else {
      return NextResponse.json({ success: false, fileIds: FileIds });
    }
  } catch (error) {
    // Log and handle any errors during file upload
    console.error("Error uploading file:", error);
    return NextResponse.json({
      success: false,
      message: "Error uploading file",
    });
  }
}
