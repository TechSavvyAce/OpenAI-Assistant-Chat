//app/page.tsx
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { useChat } from "ai/react";
import va from "@vercel/analytics";
import clsx from "clsx";
import { VercelIcon, GithubIcon, LoadingCircle, SendIcon } from "./icons";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Textarea from "react-textarea-autosize";

let FileIds: String[] = [];
let directory: string[] = [];

// Chat component that manages the chat interface and interactions
export default function Chat() {
  // Refs for form and input elements
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Custom hook to manage chat state and interactions
  const { messages, input, setInput, handleSubmit, isLoading } = useChat({
    // Error handling callback
    onError: (error) => {
      va.track("Chat errored", {
        input,
        error: error.message,
      });
    },
  });

  // Determine if the chat interface should be disabled
  const disabled = isLoading || input.length === 0;

  // State variables for managing various aspects of the chat assistant
  const [assistantName, setAssistantName] = useState("");
  const [assistantModel, setAssistantModel] = useState("gpt-4-1106-preview");
  const [assistantDescription, setAssistantDescription] = useState("");
  const [inputmessage, setInputmessage] = useState(
    "discussion for monday.com workflow",
  );
  const [chatMessages, setChatMessages] = useState<
    { role: string; content: any }[]
  >([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [file, setFile] = useState<File>();
  const [assistantId, setAssistantId] = useState<string | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [isStartLoading, setStartLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  interface UploadResponse {
    success: boolean;
    fileIds?: string[]; // Assuming fileIds is an optional array of strings
    // Other properties if present in the response
  }

  interface CheckResponse {
    success: boolean;
    directory: string[];
  }

  // Handler for file input changes
  const handleFileChange = async (selectedFile: File) => {
    setFile(selectedFile);

    // Preparing file data for upload
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    const file = fileInput && fileInput.files ? fileInput.files[0] : null;

    const fileData = new FormData();
    if (file) {
      fileData.set("File", file);
    } else {
      console.log("File is not exist");
      setIsUpload(false);
      return;
    }

    console.log("Checking file data.");
    const checkResponse = fetch("/api/check", {
      method: "POST",
      body: fileData,
    });

    const cResponse: CheckResponse = await (await checkResponse).json();
    if (cResponse.success === true) {
      directory = cResponse.directory;
    }

    const pathData = new FormData();
    if (directory) {
      pathData.set("path", directory);
    } else {
      console.log("Directory is not defined");
      return;
    }

    // Uploading file data
    console.log("Uploading file data.");
    const uploadResponse = fetch("/api/upload", {
      method: "POST",
      body: pathData,
    });

    const response: UploadResponse = await (await uploadResponse).json();
    if (response.success === true) {
      if (response.fileIds) {
        FileIds = response.fileIds;
        // Operation was successful, proceed with fileIds or other data
        console.log("File IDs:", FileIds);
        setIsUpload(true);
      } else {
        // Handle scenario where fileIds might be absent even on success
        console.log("No File IDs present");
        setIsUpload(false);
      }
    } else {
      // Operation failed or success was false
      console.log("Upload failed");
      setIsUpload(false);
    }
  };

  // Handler for form submissions
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Handling form submission.");

    setIsSending(true);
    // Update chat messages with user input
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: input },
    ]);
    setInput("");
    console.log("User message added to chat.");

    // Preparing data for API calls
    let formData = new FormData();
    if (threadId) {
      formData.append("threadId", threadId);
    }
    formData.append("input", input);

    // Call the addMessage API route
    console.log("Sending message to addMessage API endpoint.");
    const addMessageResponse = await fetch("/api/addMessage", {
      method: "POST",
      body: formData,
    });
    const addMessageData = await addMessageResponse.json();
    console.log("Message sent to addMessage API endpoint.");

    // Call the runAssistant API route
    console.log("Invoking runAssistant API endpoint.");
    let formData_run = new FormData();
    if (assistantId) {
      formData_run.append("assistantId", assistantId);
    }
    if (threadId) {
      formData_run.append("threadId", threadId);
    }
    const runAssistantResponse = await fetch("/api/runAssistant", {
      method: "POST",
      body: formData_run,
    });
    const runAssistantData = await runAssistantResponse.json();
    console.log("Received response from runAssistant API endpoint.");

    // Checking the status of the assistant's response
    let status = runAssistantData.status;
    let formData_checkStatus = new FormData();
    if (threadId) {
      formData_checkStatus.append("threadId", threadId);
    }
    if (runAssistantData.runId) {
      formData_checkStatus.append("runId", runAssistantData.runId);
    }

    while (status !== "completed") {
      const statusResponse = await fetch("/api/checkRunStatus", {
        method: "POST",
        body: formData_checkStatus,
      });
      const statusData = await statusResponse.json();
      status = statusData.status;

      console.log("Checking assistant response status:", status);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    console.log("Assistant response processing completed.");

    // Retrieve messages from the assistant
    console.log("Fetching messages from listMessages API endpoint.");
    let formData_listMessage = new FormData();
    if (threadId) {
      formData_listMessage.append("threadId", threadId);
    }

    const listMessagesResponse = await fetch("/api/listMessages", {
      method: "POST",
      body: formData_listMessage,
    });
    const listMessagesData = await listMessagesResponse.json();
    console.log("Messages retrieved from listMessages API endpoint.");
    setIsSending(false);
    // Update chat with the assistant's response
    if (listMessagesResponse.ok) {
      const lastMessage = listMessagesData.messages[0];
      console.log("Adding assistant's message to the chat.");

      setChatMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: lastMessage.content[0].text.value },
      ]);
    } else {
      console.error("Error retrieving messages:", listMessagesData.error);
    }
  };

  // Function to initialize the chat assistant
  async function startAssistant() {
    // Check if all fields are filled
    if (!assistantName || !assistantDescription) {
      console.error("All fields must be filled");
      return;
    }

    console.log("Initializing chat assistant.");
    setStartLoading(true);
    setIsButtonDisabled(true);

    // Preparing data to start chat
    const chatData = new FormData();
    chatData.set("assistantName", assistantName);
    chatData.set("assistantModel", assistantModel);
    chatData.set("assistantDescription", assistantDescription);
    chatData.set("inputmessage", inputmessage);

    // Assuming FileIds is an array of strings
    if (FileIds && FileIds.length > 0) {
      const fileIdsAsString = FileIds.join(","); // Convert array to comma-separated string
      chatData.set("fileIds", fileIdsAsString);
    }

    // Starting the chat
    console.log("Starting chat with the assistant.");
    const startChatResponse = await fetch("/api/startChat", {
      method: "POST",
      body: chatData,
    });
    const startChatData = await startChatResponse.json();

    if (startChatResponse.ok) {
      setAssistantId(startChatData.assistantId);
      setThreadId(startChatData.threadId);

      setIsButtonDisabled(false);
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: startChatData.response },
      ]);
      setChatStarted(true);
      console.log("Chat with assistant started successfully.");
    } else {
      console.error("Error starting chat:", startChatData.error);
      setIsButtonDisabled(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-between bg-space-grey-light pb-40">
      <div className="absolute top-5 hidden w-full justify-between px-5 sm:flex">
        <a
          href="/deploy"
          target="_blank"
          className="rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto"
        >
          <VercelIcon />
        </a>
        {/* <a
          href="/github"
          target="_blank"
          className="rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto"
        >
          <GithubIcon />
        </a> */}
      </div>
      {chatMessages.length > 0 ? (
        chatMessages.map((message, i) => (
          <div
            key={i}
            className={clsx(
              "flex w-full items-center justify-center border-b border-gray-200 py-8",
              message.role === "user" ? "bg-white" : "bg-gray-100",
            )}
          >
            <div className="flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0">
              <div
                className={clsx(
                  "p-1.5 text-white",
                  message.role === "assistant" ? "bg-green-500" : "bg-black",
                )}
              >
                {message.role === "user" ? (
                  <User width={20} />
                ) : (
                  <Bot width={20} />
                )}
              </div>
              <ReactMarkdown
                className="prose mt-1 w-full break-words prose-p:leading-relaxed"
                remarkPlugins={[remarkGfm]}
                components={{
                  // open links in new tab
                  a: (props) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        ))
      ) : (
        <div className="mx-5 mt-20 max-w-screen-md rounded-md border-2 border-gray-500 bg-gray-200 sm:mx-0 sm:w-full">
          <div className="flex flex-col space-y-4 p-7 sm:p-10">
            <h1 className="text-lg font-semibold text-black">
              Welcome to Monday.com Assistant!
            </h1>
            <form className="flex flex-col space-y-3">
              <input
                type="text"
                placeholder="Assistant Name"
                value={assistantName}
                onChange={(e) => setAssistantName(e.target.value)}
                required
                className="rounded-md border border-gray-200 p-2"
              />

              <input
                type="text"
                placeholder="Assistant Description"
                value={assistantDescription}
                onChange={(e) => setAssistantDescription(e.target.value)}
                required
                className="rounded-md border border-gray-200 p-2"
              />
              {/* <div>
                <button
                  onClick={() => setAssistantModel("gpt-4-1106-preview")}
                  className={`rounded-md border border-gray-400 p-1 ${
                    assistantModel === "gpt-4-1106-preview"
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                >
                  GPT-4
                </button>
                <button
                  onClick={() => setAssistantModel("gpt-3.5-turbo-1106")}
                  className={`rounded-md border border-gray-400 p-1 ${
                    assistantModel === "gpt-3.5-turbo-1106"
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                >
                  GPT-3.5
                </button>
              </div> */}
              <div
                className="drop-area rounded-md border-2 border-dashed border-gray-400 p-4 text-center"
                onClick={() => {
                  const fileInput = document.getElementById("file-input");
                  if (fileInput) {
                    fileInput.click();
                  }
                }}
              >
                <input
                  id="file-input"
                  type="file"
                  // accept=".c,.cpp,.csv,.docx,.html,.java,.json,.md,.pdf,.pptx,.txt,.tex"
                  accept=".zip,.rar,.7zip"
                  onChange={(e) => {
                    if (e.target.files) {
                      handleFileChange(e.target.files[0]);
                    }
                  }}
                  required
                  style={{ display: "none" }}
                />
                {file ? (
                  <>
                    <FontAwesomeIcon
                      icon={faFileUpload}
                      className="mb-2 text-green-500"
                    />
                    <p className="text-lg font-bold text-gray-700">
                      {file.name}
                    </p>
                    <i className="fas fa-file-upload text-green-500"></i>
                  </>
                ) : (
                  <p className="text-gray-500">
                    Please select exported ZIP Data from Monday.com
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={startAssistant}
                disabled={
                  isButtonDisabled ||
                  !assistantName ||
                  !assistantDescription ||
                  !file ||
                  !isUpload
                }
                className={`flex items-center justify-center rounded-md p-2 ${
                  isButtonDisabled
                    ? "bg-gray-500 text-gray-300"
                    : "bg-green-500 text-white"
                }`}
              >
                {isStartLoading ? <LoadingCircle /> : "Start"}
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="fixed bottom-0 flex w-full flex-col items-center space-y-3 bg-gradient-to-b from-transparent via-gray-100 to-gray-100 p-5 pb-3 sm:px-0">
        <form
          ref={formRef}
          onSubmit={handleFormSubmit}
          className="relative w-full max-w-screen-md rounded-xl border border-gray-200 bg-white px-4 pb-2 pt-3 shadow-lg sm:pb-3 sm:pt-4"
        >
          <Textarea
            ref={inputRef}
            tabIndex={0}
            required
            rows={1}
            autoFocus
            placeholder="Send a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && chatStarted) {
                formRef.current?.requestSubmit();
                e.preventDefault();
              }
            }}
            spellCheck={false}
            className="w-full pr-10 focus:outline-none"
          />
          <button
            className={clsx(
              "absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-md transition-all",
              disabled || !chatStarted
                ? "cursor-not-allowed bg-white"
                : "bg-green-500 hover:bg-green-600",
            )}
            disabled={disabled || !chatStarted}
          >
            {isSending ? (
              <LoadingCircle />
            ) : (
              <SendIcon
                className={clsx(
                  "h-4 w-4",
                  input.length === 0 ? "text-gray-300" : "text-white",
                )}
              />
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
