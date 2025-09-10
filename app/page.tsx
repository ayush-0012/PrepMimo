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
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { redirect, RedirectType } from "next/navigation";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-black text-white font-sans overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-lime-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-lime-500/10 to-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 w-full py-6 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-cyan-400">
            PrepMimo
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <Link
              href="#features"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              About
            </Link>
          </div>
          {/* <Button
            variant="outline"
            className="hidden md:inline-flex border-fuchsia-500/50 text-fuchsia-400 hover:bg-fuchsia-500/10 hover:border-fuchsia-400 transition-all duration-300"
          >
            Sign In
          </Button> */}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full py-5 md:py-24 lg:py-20 flex flex-col items-center justify-center text-center">
        <div className="relative z-10 max-w-5xl px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 border border-fuchsia-500/20 backdrop-blur-sm mb-8">
            <Sparkles className="h-4 w-4 text-fuchsia-400" />
            <span className="text-sm font-medium text-gray-300">
              AI-Powered Interview Preparation
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-fuchsia-200 to-cyan-200 drop-shadow-2xl">
              Prep
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-lime-400 animate-gradient-x">
              Mimo
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Master your interviews with cutting-edge AI that analyzes your
            performance,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">
              {" "}
              provides instant feedback
            </span>
            , and helps you land your dream job.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
              className="group px-10 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-cyan-500 text-white shadow-2xl shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
              onClick={() => redirect("/auth", RedirectType.push)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative flex items-center gap-2">
                Start Free Practice
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>

            <Button
              variant="ghost"
              className="px-8 py-4 text-lg font-semibold rounded-full border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-pink-400">
                10K+
              </div>
              <div className="text-gray-400 text-sm">Interviews Practiced</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                95%
              </div>
              <div className="text-gray-400 text-sm">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-green-400">
                4.9★
              </div>
              <div className="text-gray-400 text-sm">User Rating</div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="lg:py-5 md:py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-lime-500/10 border border-cyan-500/20 backdrop-blur-sm mb-6">
              <Zap className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-medium text-gray-300">
                Powerful Features
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                Unleash Your
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-lime-400 to-fuchsia-400">
                Interview Potential
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Advanced AI technology meets intuitive design to create the
              ultimate interview preparation experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-10 w-10" />}
              title="AI-Powered Feedback"
              description="Receive instant, data-driven insights on your communication, technical accuracy, and overall performance with advanced natural language processing."
              gradient="from-fuchsia-500 to-pink-500"
              delay="0"
            />
            <FeatureCard
              icon={<Code className="h-10 w-10" />}
              title="Technical Interview Simulations"
              description="Practice coding challenges, system design, and algorithm discussions with an AI that understands multiple programming languages."
              gradient="from-cyan-500 to-blue-500"
              delay="100"
            />
            <FeatureCard
              icon={<Mic className="h-10 w-10" />}
              title="Voice & Tone Analysis"
              description="Get detailed reports on your speaking pace, clarity, filler words, and confidence levels with advanced speech recognition."
              gradient="from-lime-500 to-green-500"
              delay="200"
            />
            <FeatureCard
              icon={<TrendingUp className="h-10 w-10" />}
              title="Progress Tracking"
              description="Monitor your improvement over time with comprehensive dashboards, performance metrics, and personalized recommendations."
              gradient="from-orange-500 to-red-500"
              delay="300"
            />
            <FeatureCard
              icon={<Settings className="h-10 w-10" />}
              title="Customizable Scenarios"
              description="Tailor interview questions and scenarios to specific companies, roles, or technical stacks with our extensive question database."
              gradient="from-purple-500 to-indigo-500"
              delay="400"
            />
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10" />}
              title="Behavioral Mastery"
              description="Refine your STAR method responses and ace common behavioral questions with AI-guided coaching and feedback."
              gradient="from-teal-500 to-cyan-500"
              delay="500"
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-900/20 via-transparent to-cyan-900/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 border border-fuchsia-500/20 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border border-cyan-500/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-lime-500/20 rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
              Ready to Ace Your
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-400 via-cyan-400 to-fuchsia-400">
              Next Interview?
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of developers who are transforming their interview
            preparation with our AI-powered platform. Start your journey to
            success today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button className="group px-12 py-5 text-xl font-bold rounded-full bg-gradient-to-r from-lime-500 via-green-500 to-fuchsia-500 text-black shadow-2xl shadow-lime-500/25 hover:shadow-lime-500/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-lime-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative flex items-center gap-2">
                Get Started Now
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>

            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">
                No credit card required
              </div>
              <div className="text-sm text-gray-500">Free 7-day trial</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-gray-800/50 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-cyan-400 mb-2">
                PrepMimo
              </div>
              <p className="text-gray-400 max-w-md">
                Empowering developers to ace their interviews with cutting-edge
                AI technology.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 text-center sm:text-left">
              <div>
                <h4 className="font-semibold text-white mb-3">Product</h4>
                <div className="space-y-2">
                  <Link
                    href="#"
                    className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    Features
                  </Link>
                  <Link
                    href="#"
                    className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="#"
                    className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    API
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Company</h4>
                <div className="space-y-2">
                  <Link
                    href="#"
                    className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    About
                  </Link>
                  <Link
                    href="#"
                    className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    Blog
                  </Link>
                  <Link
                    href="#"
                    className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    Careers
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Support</h4>
                <div className="space-y-2">
                  <Link
                    href="#"
                    className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    Help Center
                  </Link>
                  <Link
                    href="#"
                    className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    Contact
                  </Link>
                  <Link
                    href="#"
                    className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    Status
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} PrepMimo. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="#"
                className="text-gray-500 hover:text-cyan-400 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-cyan-400 transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-cyan-400 transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay: string;
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
  delay,
}: FeatureCardProps) {
  return (
    <Card
      className={`group bg-gray-950/80 border border-gray-800/60 rounded-2xl p-8 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-900/50 hover:border-gray-700/80 relative overflow-hidden animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Subtle hover overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-3 transition-opacity duration-500`}
      ></div>

      <CardHeader className="p-0 mb-6 relative z-10">
        <div
          className={`inline-flex p-4 rounded-2xl bg-gray-900/80 border border-gray-700/50 group-hover:scale-110 transition-all duration-300 group-hover:border-gray-600/70`}
        >
          <div
            className={`text-transparent bg-clip-text bg-gradient-to-br ${gradient}`}
          >
            {icon}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 relative z-10">
        <CardTitle className="text-2xl font-bold mb-4 text-gray-100 group-hover:text-white transition-all duration-300">
          {title}
        </CardTitle>
        <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
