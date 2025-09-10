import db from "@/app/db/db";
import { feedback, interview } from "@/app/db/schema";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { eq } from "drizzle-orm";
import { FeedbackResponse } from "@/constants";

export async function getInterviewById(interviewId: string) {
  if (!interviewId) return;

  try {
    const [result] = await db
      .select()
      .from(interview)
      .where(eq(interview.id, interviewId));

    return result;
  } catch (error) {
    console.log("error occurred while fetching interview ", error);
  }
}

export async function generateFeedback(
  userId: string,
  interviewId: string,
  transcript: any
) {
  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    console.log(
      "google api",
      process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY
    );

    const google = createGoogleGenerativeAI({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY,
    });

    const { text } = await generateText({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      prompt: `
      You are an expert AI interviewer conducting a thorough analysis of a mock interview. Analyze the following transcript and provide feedback in valid JSON format.
      
      **Interview Transcript:**
      ${formattedTranscript}
      
      **Required JSON Structure:**
      Return ONLY a valid JSON object with the following structure (no additional text, no markdown formatting, no code blocks):
      
      {
        "overallScore": number (1-10),
        "overallRating": "excellent" | "good" | "average" | "poor",
        "technicalSkills": {
          "score": number (0-100),
          "strengths": ["strength1", "strength2"],
          "weaknesses": ["weakness1", "weakness2"],
          "areasForImprovement": ["area1", "area2"],
          "specificFeedback": "detailed feedback string"
        },
        "communicationSkills": {
          "score": number (0-100),
          "clarity": number (1-10),
          "articulation": number (1-10),
          "listeningSkills": number (1-10),
          "strengths": ["strength1", "strength2"],
          "weaknesses": ["weakness1", "weakness2"],
          "areasForImprovement": ["area1", "area2"],
          "specificFeedback": "detailed feedback string"
        },
        "problemSolving": {
          "score": number (0-100),
          "analyticalThinking": number (1-10),
          "creativity": number (1-10),
          "approachToProblems": number (1-10),
          "strengths": ["strength1", "strength2"],
          "weaknesses": ["weakness1", "weakness2"],
          "areasForImprovement": ["area1", "area2"],
          "specificFeedback": "detailed feedback string"
        },
        "behavioralCompetencies": {
          "score": number (0-100),
          "leadership": number (1-10),
          "teamwork": number (1-10),
          "adaptability": number (1-10),
          "timeManagement": number (1-10),
          "conflictResolution": number (1-10),
          "strengths": ["strength1", "strength2"],
          "weaknesses": ["weakness1", "weakness2"],
          "areasForImprovement": ["area1", "area2"],
          "specificFeedback": "detailed feedback string"
        },
        "keyStrengths": ["strength1", "strength2", "strength3"],
        "keyWeaknesses": ["weakness1", "weakness2", "weakness3"],
        "criticalAreasForImprovement": ["area1", "area2", "area3"],
        "detailedFeedback": "comprehensive feedback summary (minimum 200 words)",
        "positiveHighlights": ["highlight1", "highlight2"],
        "developmentAreas": ["area1", "area2"],
        "recommendations": {
          "nextSteps": ["step1", "step2"],
          "resourcesSuggested": ["resource1", "resource2"],
          "skillsToFocus": ["skill1", "skill2"],
          "trainingRecommendations": ["training1", "training2"]
        },
        "responseQuality": {
          "completeness": number (1-10),
          "relevance": number (1-10),
          "depth": number (1-10),
          "examples": number (1-10)
        },
        "questionResponses": [
          {
            "questionId": "q1",
            "questionText": "What was the question?",
            "response": "Summary of candidate's response",
            "score": number (0-100),
            "feedback": "specific feedback",
            "strengths": ["strength1"],
            "improvements": ["improvement1"]
          }
        ]
      }
      
      **Evaluation Guidelines:**
      - Be rigorous and honest - don't be overly lenient
      - Provide specific, actionable feedback
      - Use concrete examples from the transcript
      - Focus on professional growth opportunities
      - Ensure all scores are within specified ranges
      - Include at least 3-5 items in each array field
      - Make detailed feedback comprehensive (200+ words)
      
      Please provide your response as a valid JSON object.`,
      system:
        "You are a professional interview assessor. Provide detailed feedback analysis in JSON format based on the interview transcript.",
    });

    // helper func to clean and extract JSON from AI response
    function extractJSON(text: string): string {
      // remove markdown code blocks if present
      let cleanedText = text.replace(/```json\s*/g, "").replace(/```\s*/g, "");

      // trimming whitespace
      cleanedText = cleanedText.trim();

      // Find the JSON object boundaries
      const startIndex = cleanedText.indexOf("{");
      const lastIndex = cleanedText.lastIndexOf("}");

      if (startIndex !== -1 && lastIndex !== -1 && lastIndex > startIndex) {
        cleanedText = cleanedText.substring(startIndex, lastIndex + 1);
      }

      return cleanedText;
    }

    // parsing json response
    let feedbackObject: FeedbackResponse;
    try {
      const cleanedText = extractJSON(text);
      feedbackObject = JSON.parse(cleanedText) as FeedbackResponse;
    } catch (error) {
      console.error("Failed to parse AI response as JSON:", error);
      console.error("AI Response:", text); // Log the actual response for debugging
      throw new Error("Invalid JSON response from AI");
    }

    console.log(feedbackObject);
    const feedbackData = await db.insert(feedback).values({
      interviewId,
      userId,
      ...feedbackObject,
    });

    console.log("feedback data", feedbackData);
    return feedbackData;
  } catch (error) {
    console.log("error occurred while generating feedback", error);
    throw error;
  }
}
