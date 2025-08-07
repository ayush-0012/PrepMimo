"use client";

import React from "react";
import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  MoreHorizontal,
  Play,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Mock data for existing interviews
const mockInterviews = [
  {
    id: 1,
    title: "Frontend Developer Interview",
    description: "React, TypeScript, and JavaScript fundamentals",
    status: "active",
    createdAt: "2024-01-15",
    duration: 45,
    candidates: 12,
    questions: 15,
  },
  {
    id: 2,
    title: "Backend Engineer Assessment",
    description: "Node.js, databases, and system design",
    status: "draft",
    createdAt: "2024-01-14",
    duration: 60,
    candidates: 8,
    questions: 20,
  },
  {
    id: 3,
    title: "Full Stack Developer",
    description: "Complete web development skills evaluation",
    status: "completed",
    createdAt: "2024-01-10",
    duration: 90,
    candidates: 25,
    questions: 30,
  },
];

function Interviews() {
  const [interviews, setInterviews] = useState(mockInterviews);

  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-900 text-green-300 hover:bg-green-800";
      case "draft":
        return "bg-yellow-900 text-yellow-300 hover:bg-yellow-800";
      case "completed":
        return "bg-blue-900 text-blue-300 hover:bg-blue-800";
      default:
        return "bg-gray-800 text-gray-300 hover:bg-gray-700";
    }
  };

  const handleCreateInterview = async () => {
    // This would typically navigate to a create interview page or open a modal
    console.log("Create new interview");

    router.push("/interview");
  };

  const handleStartInterview = (id: number) => {
    console.log("Start interview:", id);
  };

  const handleEditInterview = (id: number) => {
    console.log("Edit interview:", id);
  };

  const handleDeleteInterview = (id: number) => {
    setInterviews(interviews.filter((interview) => interview.id !== id));
  };

  return (
    <>
      {/* Create Interview Section */}
      <div className="mb-8">
        <Card className="border border-gray-800 shadow-sm bg-gray-900">
          <CardContent className="p-8">
            <div className="flex items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Create New Interview
                </h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Set up a new AI interview with custom questions, time limits,
                  and evaluation criteria
                </p>
                <Button
                  onClick={handleCreateInterview}
                  size="lg"
                  className="px-8 bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Interview
                </Button>
              </div>

              <div className="flex-shrink-0">
                <Image
                  src="/public/react.svg"
                  alt="AI Interview Robot"
                  width={20}
                  height={20}
                  className="w-30 h-30 rounded-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Interviews Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Your Interviews</h2>
          {/* <div className="text-sm text-gray-400">
              {interviews.length} interview{interviews.length !== 1 ? "s" : ""}{" "}
              total
            </div> */}
        </div>

        {interviews.length === 0 ? (
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-gray-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                No interviews yet
              </h3>
              <p className="text-gray-400 text-center">
                Create your first interview to get started with AI-powered
                candidate assessment
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {interviews.map((interview) => (
              <Card
                key={interview.id}
                className="hover:shadow-lg transition-shadow bg-gray-900 border-gray-800"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1 text-white">
                        {interview.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-400">
                        {interview.description}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-gray-800 border-gray-700"
                      >
                        <DropdownMenuItem
                          onClick={() => handleStartInterview(interview.id)}
                          className="text-gray-300 hover:text-white hover:bg-gray-700"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Start Interview
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditInterview(interview.id)}
                          className="text-gray-300 hover:text-white hover:bg-gray-700"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteInterview(interview.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-gray-700"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Badge
                    className={getStatusColor(interview.status)}
                    variant="secondary"
                  >
                    {interview.status.charAt(0).toUpperCase() +
                      interview.status.slice(1)}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-400">
                      <Calendar className="mr-2 h-4 w-4" />
                      {new Date(interview.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Clock className="mr-2 h-4 w-4" />
                      {interview.duration} min
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Users className="mr-2 h-4 w-4" />
                      {interview.candidates} candidates
                    </div>
                    <div className="flex items-center text-gray-400">
                      <span className="mr-2">❓</span>
                      {interview.questions} questions
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleStartInterview(interview.id)}
                    >
                      <Play className="mr-2 h-3 w-3" />
                      Start
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
                      onClick={() => handleEditInterview(interview.id)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Interviews;
