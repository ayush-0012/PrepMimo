"use client";
import { MessageCircle, Phone, PhoneOff } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { vapi } from "@/lib/vapi.sdk";
import Vapi from "@vapi-ai/web";

export default function Agent() {
  // handling call logic with vapi here
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  let vapi: any = null;

  // import Vapi from "@vapi-ai/web";

  if (!process.env.NEXT_PUBLIC_VAPI_API_KEY) {
    console.log("vapi env is missing");
    throw new Error("vapi env is missing");
  }

  vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);

  console.log("public key", process.env.NEXT_PUBLIC_VAPI_API_KEY);

  useEffect(() => {
    console.log("vapi", vapi);

    vapi.on("call-start", () => {
      console.log("call started");
      setIsConnected(true);
    });
    vapi.on("speech-start", () => {
      console.log("Assistant started speaking");
      setIsSpeaking(true);
    });
    vapi.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setIsSpeaking(false);
    });
    vapi.on("error", (error) => {
      console.log("Vapi error:", error);
    });
    vapi.on("call-end", () => {
      console.log("call ended");
      setIsConnected(false);
    });

    // Clean up event listeners on component unmount
    return () => {
      vapi.off("call-start", () => {});
      vapi.off("speech-start", () => {});
      vapi.off("speech-end", () => {});
      vapi.off("error", () => {});
      vapi.off("call-end", () => {});
    };
  }, []); // Empty dependency array means this runs once on mount

  async function handleStartCall() {
    console.log("workflowId ", process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID);
    try {
      await vapi.start(
        undefined,
        undefined,
        undefined,
        process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID
      );
      setIsConnected(true);
    } catch (error) {
      console.error("Call start failed:", error);
      setIsConnected(false);
    }
  }

  const handleEndCall = () => {
    if (vapi) {
      vapi.stop();
    }
    // isConnected state will be updated by vapi.on("call-end")
    setIsConnected(false);
  };

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
          {/* Removed the Plus button as it was not in the original design and not requested */}
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
          {/* JS Mastery Card */}
          <div className="group relative">
            <div className="relative bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-blue-900/40 border border-purple-500/20 rounded-3xl p-4 md:p-10 flex flex-col items-center justify-center min-h-[200px] md:min-h-[320px] hover:border-purple-400/30 transition-all duration-300 group-hover:transform group-hover:scale-[1.02] shadow-xl">
              <div className="relative mb-4 md:mb-8">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-lg ring-2 ring-purple-500/20">
                  <Image
                    src="/js-mastery-profile.png"
                    alt="JS Mastery profile"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
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
          >
            <div className="relative flex items-center gap-3">
              {isConnected ? (
                <PhoneOff className="w-5 h-5" />
              ) : (
                <Phone className="w-5 h-5" />
              )}
              <span>{isConnected ? "End Call" : "Call"}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
