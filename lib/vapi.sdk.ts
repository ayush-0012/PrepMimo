// vapi-config.js or similar file
import Vapi from "@vapi-ai/web";

// Client-side environment variable access
const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;

if (!apiKey) {
  console.error("NEXT_PUBLIC_VAPI_API_KEY is missing");
  throw new Error("Vapi API key is required");
}

export const vapi = new Vapi(apiKey);
// Start voice conversation
// vapi.start(process.env.NEXT_PUBLIC_VAPI_API_KEY);

// // Listen for events
// vapi.on("call-start", () => console.log("Call started"));
// vapi.on("call-end", () => console.log("Call ended"));
// vapi.on("message", (message) => {
//   if (message.type === "transcript") {
//     console.log(`${message.role}: ${message.transcript}`);
//   }
// });
