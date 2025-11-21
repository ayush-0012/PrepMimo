"use client";

import { Calendar, Code, Layers, Play, Plus, Users } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { authClient } from "@/lib/auth-client";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Interview {
  id: string;
  level: string;
  amount: number;
  type: string;
  techstack: string[] | any;
  questions: any;
  status: string;
  createdAt: string;
  duration: number;
  candidates: number;
  title: string;
  description: string;
}

// Loading skeleton component
function InterviewCardSkeleton() {
  return (
    <Card className="bg-gray-900 border-gray-800 animate-pulse">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
          </div>
          <div className="h-8 w-8 bg-gray-700 rounded"></div>
        </div>
        <div className="h-6 bg-gray-700 rounded w-20 mt-2"></div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        <div className="flex flex-wrap gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-5 bg-gray-700 rounded w-16"></div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded flex-1"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Memoized Interview Card Component
const InterviewCard = React.memo(
  ({
    interview,
    onStartInterview,
    getLevelColor,
    getTechStackArray,
  }: {
    interview: Interview;
    onStartInterview: (id: string) => void;
    getLevelColor: (level: string) => string;
    getTechStackArray: (techstack: any) => string[];
  }) => {
    const techStack = useMemo(
      () => getTechStackArray(interview.techstack),
      [interview.techstack, getTechStackArray]
    );
    const displayedTech = useMemo(() => techStack.slice(0, 3), [techStack]);
    const remainingCount = techStack.length - 3;

    return (
      <Card className="group hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-gray-900 to-gray-800 border-0 shadow-xl hover:scale-[1.02] cursor-pointer overflow-hidden">
        <CardHeader className="pb-3 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-base text-white group-hover:text-blue-300 transition-colors mb-1">
                {interview.title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-400 line-clamp-2">
                {interview.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center gap-2">
            <Badge
              className={`${getLevelColor(
                interview.level
              )} border text-xs font-medium`}
              variant="outline"
            >
              <Layers className="mr-1 h-3 w-3" />
              {interview.level}
            </Badge>
            <Badge
              className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 border text-xs"
              variant="outline"
            >
              {interview.type}
            </Badge>
          </div>

          {interview.techstack && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-300">
                <Code className="h-4 w-4" />
                <span className="text-sm font-medium">Tech Stack</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {displayedTech.map((tech, index) => (
                  <Badge
                    key={index}
                    className="bg-gray-700/50 text-gray-300 border-gray-600 text-xs hover:bg-gray-600/50 transition-colors"
                    variant="outline"
                  >
                    {tech}
                  </Badge>
                ))}
                {remainingCount > 0 && (
                  <Badge
                    className="bg-gray-700/50 text-gray-400 border-gray-600 text-xs"
                    variant="outline"
                  >
                    +{remainingCount} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="flex items-center text-gray-400 bg-gray-800/50 rounded-lg p-2 hover:bg-gray-800/70 transition-colors">
              <Calendar className="mr-2 h-3 w-3 text-blue-400" />
              <div>
                <p className="text-xs text-gray-500">Created</p>
                <p className="text-xs font-medium">
                  {new Date(interview.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center text-gray-400 bg-gray-800/50 rounded-lg p-2 hover:bg-gray-800/70 transition-colors">
              <Users className="mr-2 h-3 w-3 text-purple-400" />
              <div>
                <p className="text-xs text-gray-500">Candidates</p>
                <p className="text-xs font-medium">{interview.candidates}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-gray-800/30 rounded-lg p-2">
            <div className="flex items-center text-gray-400">
              <span className="mr-2 text-orange-400 text-sm">❓</span>
              <span className="text-sm">Questions</span>
            </div>
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
              {interview.questions?.length || 0}
            </Badge>
          </div>

          <Button
            onClick={() => onStartInterview(interview.id)}
            className="w-full bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-600 hover:to-purple-600 transition-all duration-200 group-hover:shadow-lg"
            size="sm"
          >
            <Play className="mr-2 h-3 w-3" />
            Start Interview
          </Button>
        </CardContent>
      </Card>
    );
  }
);

InterviewCard.displayName = "InterviewCard";

function Interviews() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [interviewsLoading, setInterviewsLoading] = useState(true);
  const { data: session, isPending, error } = authClient.useSession();
  const router = useRouter();

  // Memoize utility functions to prevent unnecessary re-renders
  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "draft":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  }, []);

  const getLevelColor = useCallback((level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "intermediate":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "advanced":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    }
  }, []);

  const getTechStackArray = useCallback((techstack: any): string[] => {
    if (Array.isArray(techstack)) return techstack;
    if (typeof techstack === "string") {
      try {
        return JSON.parse(techstack);
      } catch {
        return techstack.split(",").map((tech: string) => tech.trim());
      }
    }
    return [];
  }, []);

  const handleStartInterview = useCallback(
    (id: string) => {
      console.log("Start interview:", id);
      router.push(`/interview/${id}`);
    },
    [router]
  );

  const handleCreateInterview = useCallback(() => {
    router.push("/interview");
  }, [router]);

  const handleLogin = useCallback(() => {
    router.push("/auth");
  }, [router]);

  // Fetch interviews only when session.user.id changes
  useEffect(() => {
    // Skip if no user ID or still loading session
    if (isPending || !session?.user?.id) {
      if (!isPending) {
        setInterviewsLoading(false);
      }
      return;
    }

    let isMounted = true;

    async function fetchUserInterviews() {
      setInterviewsLoading(true);

      if (!session) return;

      try {
        const response = await axiosInstance.get(
          `/api/interview?userId=${session.user.id}`
        );

        if (isMounted) {
          console.log(response);
          setInterviews(response.data.interviews);
        }
      } catch (err) {
        console.error("Error fetching interviews:", err);
      } finally {
        if (isMounted) {
          setInterviewsLoading(false);
        }
      }
    }

    fetchUserInterviews();

    return () => {
      isMounted = false;
    };
  }, [session?.user?.id, isPending]); // Only depend on user ID and isPending

  // Handle session states
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-xl">⚠️</div>
          <p className="text-red-400">Failed to load session</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <p className="text-gray-300 text-xl">
            Please log in to view your interviews
          </p>
          <Button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Create Interview Section */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Plus className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  Create New Interview
                </h3>
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Set up a new AI interview with custom questions, time limits,
                and evaluation criteria to streamline your hiring process
              </p>
              <Button
                onClick={handleCreateInterview}
                size="lg"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Plus className="mr-2 h-5 w-5" />
                Create Interview
              </Button>
            </div>

            <div className="flex-shrink-0 relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></div>
              <Image
                src="/react.svg"
                alt="AI Interview Robot"
                width={120}
                height={120}
                className="rounded-lg relative z-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Interviews Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Your Interviews
            </h2>
            <p className="text-gray-400">
              Manage and track your interview sessions
            </p>
          </div>
          {interviews.length > 0 && (
            <Badge variant="outline" className="text-gray-300 border-gray-600">
              {interviews.length} total
            </Badge>
          )}
        </div>

        {interviewsLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <InterviewCardSkeleton key={i} />
            ))}
          </div>
        ) : interviews.length === 0 ? (
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-0 shadow-xl">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gray-500/20 rounded-full blur-xl"></div>
                <Users className="h-16 w-16 text-gray-500 relative z-10" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                No interviews yet
              </h3>
              <p className="text-gray-400 text-center max-w-md leading-relaxed">
                Create your first interview to get started with AI-powered
                candidate assessment and streamline your hiring workflow
              </p>
              <Button
                onClick={handleCreateInterview}
                className="mt-6 bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create First Interview
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {interviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                interview={interview}
                onStartInterview={handleStartInterview}
                getLevelColor={getLevelColor}
                getTechStackArray={getTechStackArray}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Interviews;
