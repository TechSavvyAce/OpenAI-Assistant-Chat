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

let filepaths: String[] = [];

// Function to convert XLSX to PDF
async function convertXlsxToCSVAndUpload(
  xlsxFilePath: string,
  csvFilePath: string,
) {
  try {
    console.log("convertXlsxToCSVAndUpload");
    let obj = xlsx.parse(xlsxFilePath);
    var rows = [];
    var writeStr = "";
    console.log("obj=", obj);
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
        console.log(err);
      }
    });
    filepaths.push(csvFilePath);
    console.log("writeStr===", writeStr);
  } catch (error) {
    console.log(`Error while converting ${xlsxFilePath} to CSV:`, error);
    throw error; // Propagate the error further if needed
  }
}

// Function to recursively convert XLSX files in subdirectories to PDFs
async function convertXlsxFilesToCSVAndUpload(directory: string) {
  try {
    console.log("directory", directory);
    const files = fs.readdirSync(directory);
    for (const file of files) {
      const filePath = pathModule.join(directory, file);
      const fileStat = fs.statSync(filePath);
      console.log("filePath", filePath);
      if (fileStat.isDirectory()) {
        try {
        } catch (e) {}
        await convertXlsxFilesToCSVAndUpload(filePath); // Recursively handle subdirectories
      } else if (file.endsWith(".xlsx")) {
        const csvFileName = `${pathModule.basename(file, ".xlsx")}.csv`;
        const csvFilePath = pathModule.join(directory, csvFileName);
        console.log("csvFileName", csvFileName);
        console.log("csvFilePath", csvFilePath);
        await convertXlsxToCSVAndUpload(filePath, csvFilePath);
      }
    }
  } catch (error) {
    console.log(`Error while processing directory ${directory}:`, error);
    throw error; // Propagate the error further if needed
  }
}

export async function POST(request: NextRequest) {
  try {
    // Logging the start of the upload process
    console.log(`Check API call started`);

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
    const Path = "../../tmp";

    // fs.promises
    //   .access(Path)
    //   .then(() => {
    //     console.log("Path exists. Deleting files inside...");
    //     return fs.promises.readdir(Path);
    //   })
    //   .then((files) => {
    //     const unlinkPromises = files.map((file) =>
    //       fs.promises.unlink(pathModule.join(Path, file)),
    //     );
    //     return Promise.all(unlinkPromises);
    //   })
    //   .catch(() => {
    //     console.log("Path does not exist. Creating...");
    //     return fs.promises.mkdir(Path, { recursive: true });
    //   })
    //   .then(() => console.log("Operation completed successfully."))
    //   .catch((err) => console.error("Error:", err));

    const uploadedFilePath = Path + `/${uploadedfile.name}`;
    await writeFile(uploadedFilePath, buffer);
    console.log(`File written to ${uploadedFilePath}`);

    ////////// FILE CHANGE IS STARTED /////////////
    const uploadedFileType = pathModule.extname(uploadedfile.name).slice(1);
    if (uploadedFileType === "zip") {
      const zip = new AdmZip(uploadedFilePath);
      const extractDir = Path + `/${pathModule.parse(uploadedfile.name).name}`;
      zip.extractAllTo(extractDir, true);
      console.log(`zipFile is extracted to ${extractDir}`);
      try {
        await convertXlsxFilesToCSVAndUpload(extractDir);
      } catch (e) {
        console.log(`Convert Xlsx to CSV Error:`, e);
      }
      if (filepaths.length > 0) {
        return NextResponse.json({ success: true, directory: filepaths });
      } else {
        return NextResponse.json({ success: false, directory: filepaths });
      }
    } else {
      filepaths.push(uploadedFilePath);
      return NextResponse.json({ success: true, directory: filepaths });
    }
  } catch (error) {
    // Log and handle any errors during file upload
    console.log("Error Checking file:", error);
    return NextResponse.json({
      success: false,
      message: "Error Checking file",
    });
  }
}
