"use client";
import { interviewer } from "@/constants";
import { authClient } from "@/lib/auth-client";
import axiosInstance from "@/lib/axiosInstance";
import Vapi from "@vapi-ai/web";
import { MessageCircle, Phone, PhoneOff, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

interface SavedMessages {
  role: "user" | "system" | "assistant";
  content: string;
}

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

export default function Agent({ userId, type, interviewId, questions }) {
  // Get user session for profile data
  const { data: session } = authClient.useSession();

  // handling call logic with vapi here
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [messages, setMessages] = useState<SavedMessages[]>([]);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [error, setError] = useState<string | null>(null);
  const [vapi, setVapi] = useState<any>(null);

  const router = useRouter();

  // Memoize user data
  const userProfile = useMemo(() => {
    if (!session?.user) return null;
    return {
      name: session.user.name || "User",
      image: session.user.image || null,
      email: session.user.email || "",
    };
  }, [session?.user]);

  // Initialize Vapi instance
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_VAPI_API_KEY) {
      console.error("VAPI API key is missing");
      setError("VAPI configuration is missing");
      return;
    }

    // Dynamic import to avoid SSR issues
    const initVapi = async () => {
      try {
        const vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
        setVapi(vapiInstance);
        console.log("Vapi initialized successfully");
      } catch (error) {
        console.error("Failed to initialize Vapi:", error);
        setError("Failed to initialize VAPI");
      }
    };

    initVapi();
  }, []);

  // Memoize event handlers to prevent recreation
  const onCallStart = useCallback(() => {
    console.log("Call started");
    setCallStatus(CallStatus.ACTIVE);
    setIsConnected(true);
  }, []);

  const onCallEnd = useCallback(() => {
    console.log("Call ended");
    setCallStatus(CallStatus.FINISHED);
    setIsConnected(false);
  }, []);

  const onMessage = useCallback((message: any) => {
    console.log("Received message:", message);

    // Check for transcript messages
    if (message.type === "transcript" && message.transcriptType === "final") {
      const newMessage: SavedMessages = {
        role: message.role,
        content: message.transcript,
      };
      console.log("Adding transcript message:", newMessage);
      setMessages((prev) => {
        const updated = [...prev, newMessage];
        console.log("Updated messages array:", updated);
        return updated;
      });
    }

    // Also check for other message types that might contain conversation data
    if (
      message.type === "conversation-update" ||
      message.type === "function-call"
    ) {
      console.log("Other message type received:", message.type);
      // Handle other message types if needed
    }
  }, []);

  const onSpeechStart = useCallback(() => {
    console.log("Speech started");
    setIsSpeaking(true);
  }, []);

  const onSpeechEnd = useCallback(() => {
    console.log("Speech ended");
    setIsSpeaking(false);
  }, []);

  const onError = useCallback((error: Error) => {
    console.error("Vapi Error:", error);
    setError(error.message);
  }, []);

  // Set up event listeners
  useEffect(() => {
    if (!vapi) return;

    console.log("Setting up Vapi event listeners");

    // Add event listeners
    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    // Clean up event listeners on component unmount or when vapi changes
    return () => {
      console.log("Cleaning up Vapi event listeners");
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, [
    vapi,
    onCallStart,
    onCallEnd,
    onMessage,
    onSpeechStart,
    onSpeechEnd,
    onError,
  ]);

  // Memoize feedback generation function
  const handleGenerateFeedback = useCallback(
    async (messages: SavedMessages[]) => {
      console.log("Generating feedback with messages:", messages);

      if (!userId) {
        console.error("No userId provided");
        return;
      }

      if (!messages || messages.length === 0) {
        console.warn("No messages to generate feedback from");
      }

      try {
        const response = await axiosInstance.post("/api/feedback", {
          userId,
          interviewId,
          transcript: messages,
        });
        console.log("Feedback generation result:", response);

        if (response) {
          console.log("Feedback generated successfully");
          router.push(`/interview/${interviewId}/feedback`);
        } else {
          console.error("Failed to generate feedback");
          setError("Failed to generate feedback");
          router.push("/");
        }
      } catch (error) {
        console.error("Error generating feedback:", error);
        setError("Error generating feedback");
        router.push("/");
      }
    },
    [userId, interviewId, router]
  );

  // Handle call status changes
  useEffect(() => {
    console.log("Call status changed:", callStatus);
    console.log("Current messages:", messages);

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [callStatus, type, router, handleGenerateFeedback, messages]);

  const handleStartCall = useCallback(async () => {
    if (!vapi) {
      console.error("Vapi not initialized");
      return;
    }

    console.log("Starting call...");
    console.log("Workflow ID:", process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID);

    try {
      setCallStatus(CallStatus.CONNECTING);

      if (type === "generate") {
        await vapi.start(
          undefined,
          undefined,
          undefined,
          process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID,
          {
            variableValues: {
              userId,
            },
          }
        );
      } else {
        let formattedQuestions = "";

        if (questions && Array.isArray(questions)) {
          formattedQuestions = questions
            .map((question) => `- ${question}`)
            .join("\n");
        }

        await vapi.start(interviewer, {
          variableValues: {
            questions: formattedQuestions,
          },
        });
      }

      console.log("Call started successfully");
    } catch (error) {
      console.error("Call start failed:", error);
      setError("Failed to start call");
      setCallStatus(CallStatus.INACTIVE);
      setIsConnected(false);
    }
  }, [vapi, type, userId, questions]);

  const handleEndCall = useCallback(() => {
    if (!vapi) return;

    console.log("Ending call...");
    vapi.stop();

    // Don't immediately redirect, let the call-end event handler do it
    // The call status will be updated by the "call-end" event
  }, [vapi]);

  console.log("Current messages state:", messages);
  console.log("Current call status:", callStatus);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Enhanced grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="relative max-w-5xl mx-auto p-4 md:p-8">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-8 md:mb-16">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-200 rounded-xl flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 text-gray-800" />
            </div>
            <div>
              <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                PrepMimo
              </span>
              <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 mt-1" />
            </div>
          </div>
        </div>
        {/* Enhanced Cards container */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
          {/* AI Interviewer Card */}
          <div className="group relative">
            <div className="relative bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-blue-900/40 border border-purple-500/20 rounded-3xl p-4 md:p-10 flex flex-col items-center justify-center min-h-[200px] md:min-h-[320px] hover:border-purple-400/30 transition-all duration-300 group-hover:transform group-hover:scale-[1.02] shadow-xl">
              <div className="relative mb-4 md:mb-8">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-purple-300 via-purple-200 to-indigo-200 rounded-2xl flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-8 h-8 md:w-12 md:h-12 text-purple-900" />
                </div>
              </div>
              <h2 className="text-lg md:text-2xl font-semibold mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                AI Interviewer
              </h2>
            </div>
          </div>
          {/* User Profile Card */}
          <div className="group relative">
            <div className="relative bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-blue-900/40 border border-purple-500/20 rounded-3xl p-4 md:p-10 flex flex-col items-center justify-center min-h-[200px] md:min-h-[320px] hover:border-purple-400/30 transition-all duration-300 group-hover:transform group-hover:scale-[1.02] shadow-xl">
              <div className="relative mb-4 md:mb-8">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-lg ring-2 ring-purple-500/20 bg-gradient-to-br from-blue-500 to-purple-600">
                  {userProfile?.image ? (
                    <img
                      src={userProfile.image}
                      alt="User profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling?.classList.remove(
                          "hidden"
                        );
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 ${
                      userProfile?.image ? "hidden" : ""
                    }`}
                  >
                    <User className="w-8 h-8 md:w-12 md:h-12 text-white" />
                  </div>
                </div>
              </div>
              <h2 className="text-lg md:text-2xl font-semibold mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                You
              </h2>
            </div>
          </div>
        </div>
        {/* Enhanced Call Toggle Button */}
        <div className="flex justify-center">
          <button
            className={`group relative px-6 py-3 md:px-8 md:py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-xl ${
              isConnected
                ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:shadow-red-500/25"
                : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:shadow-green-500/25"
            }`}
            onClick={isConnected ? handleEndCall : handleStartCall}
            disabled={callStatus === CallStatus.CONNECTING}
          >
            <div className="relative flex items-center gap-3">
              {callStatus === CallStatus.CONNECTING ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : isConnected ? (
                <>
                  <PhoneOff className="w-5 h-5" />
                  <span>End Call</span>
                </>
              ) : (
                <>
                  <Phone className="w-5 h-5" />
                  <span>Call</span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-center">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Speaking Indicator */}
        {isSpeaking && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-purple-600/90 backdrop-blur-sm rounded-full shadow-lg">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-white rounded-full animate-pulse" />
                <div className="w-1 h-4 bg-white rounded-full animate-pulse delay-75" />
                <div className="w-1 h-4 bg-white rounded-full animate-pulse delay-150" />
              </div>
              <span className="text-white text-sm font-medium">
                Speaking...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
