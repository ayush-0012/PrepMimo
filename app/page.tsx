"use client";

import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Brain,
  Code,
  Mic,
  TrendingUp,
  Settings,
  MessageSquare,
} from "lucide-react";
import { redirect, RedirectType } from "next/navigation";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 lg:py-40 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background Grid/Noise */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-10 pointer-events-none"></div>
        {/* Neon Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/30 via-black to-cyan-900/30 animate-pulse-slow"></div>

        <div className="relative z-10 max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-lime-400">
            PrepMimo
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Elevate your interview game with cutting-edge AI. Practice, analyze,
            and perfect your responses for any role.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="px-8 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-black shadow-lg shadow-fuchsia-500/50 hover:from-fuchsia-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
              onClick={() => redirect("/auth", RedirectType.push)}
            >
              Start Free Practice
            </Button>
            <Button
              variant="outline"
              className="px-8 py-3 text-lg font-semibold rounded-full border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-900/20 hover:text-cyan-300 transition-all duration-300 transform hover:scale-105 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-lime-400">
            Unleash Your Interview Potential
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-8 w-8 text-gray-400" />}
              title="AI-Powered Feedback"
              description="Receive instant, data-driven insights on your communication, technical accuracy, and overall performance."
            />
            <FeatureCard
              icon={<Code className="h-8 w-8 text-gray-400" />}
              title="Technical Interview Simulations"
              description="Practice coding challenges, system design, and algorithm discussions with an AI that understands code."
            />
            <FeatureCard
              icon={<Mic className="h-8 w-8 text-gray-400" />}
              title="Voice & Tone Analysis"
              description="Get detailed reports on your speaking pace, clarity, filler words, and confidence levels."
            />
            <FeatureCard
              icon={<TrendingUp className="h-8 w-8 text-gray-400" />}
              title="Progress Tracking & Analytics"
              description="Monitor your improvement over time with comprehensive dashboards and performance metrics."
            />
            <FeatureCard
              icon={<Settings className="h-8 w-8 text-gray-400" />}
              title="Customizable Scenarios"
              description="Tailor interview questions and scenarios to specific companies, roles, or technical stacks."
            />
            <FeatureCard
              icon={<MessageSquare className="h-8 w-8 text-gray-400" />}
              title="Behavioral Interview Mastery"
              description="Refine your STAR method responses and ace common behavioral questions with AI guidance."
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-950 to-black text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-fuchsia-400">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-lg text-gray-300 mb-10">
            Join thousands of developers who are transforming their interview
            preparation with our AI-powered platform.
          </p>
          <Button className="px-10 py-4 text-xl font-bold rounded-full bg-gradient-to-r from-lime-500 to-fuchsia-500 text-black shadow-lg shadow-lime-500/50 hover:from-lime-600 hover:to-fuchsia-600 transition-all duration-300 transform hover:scale-105">
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-800">
        <p>
          &copy; {new Date().getFullYear()} AI Interviewer. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Link href="#" className="hover:text-cyan-400 transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-cyan-400 transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-cyan-400 transition-colors">
            Contact
          </Link>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col items-start text-left shadow-md shadow-gray-950 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-gray-700">
      <CardHeader className="p-0 mb-4">
        <div className="p-3 rounded-full bg-gray-800 border border-gray-700">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <CardTitle className="text-2xl font-bold mb-3 text-white">
          {title}
        </CardTitle>
        <p className="text-gray-300 text-base">{description}</p>
      </CardContent>
    </Card>
  );
}
