"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Github, Chrome } from "lucide-react";

export default function AuthPage() {
  // github auth handler
  async function handleGithubAuth() {
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
      });

      console.log("data", data);
      console.log("error", error);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <Card className="w-full max-w-md rounded-lg shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">
            Sign in to your account
          </CardTitle>
          <CardDescription>
            Choose your preferred method to sign in
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            className="w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white shadow-lg hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 transition-all duration-200 relative overflow-hidden group"
            onClick={handleGithubAuth}
          >
            <span className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></span>
            <Github className="mr-2 h-5 w-5" />
            Sign in with GitHub
          </Button>
          <Button className="w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white shadow-lg hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 transition-all duration-200 relative overflow-hidden group">
            <span className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></span>
            <Chrome className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
