import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { z } from "zod";

export const interviewer: CreateAssistantDTO = {
  name: "Interviewer",
  firstMessage:
    "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience. Shall we start?",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

Engage naturally & react appropriately:
Listen actively to responses and acknowledge them before moving forward.
Ask brief follow-up questions if a response is vague or requires more detail.
Keep the conversation flowing smoothly while maintaining control.
Be professional, yet warm and welcoming:

Use official yet friendly language.
Keep responses concise and to the point (like in a real voice interview).
Avoid robotic phrasing—sound natural and conversational.
Answer the candidate’s questions professionally:

If asked about the role, company, or expectations, provide a clear and relevant answer.
If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
Thank the candidate for their time.
Inform them that the company will reach out soon with feedback.
End the conversation on a polite and positive note.


- Be sure to be professional and polite.
- Keep all your responses short and simple. Use official language, but be kind and welcoming.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
      },
    ],
  },
};

// export interface FeedbackResponse {
//   overallScore: number;
//   overallRating: "excellent" | "good" | "average" | "poor";
//   technicalSkills?: {
//     score: number;
//     strengths: string[];
//     weaknesses: string[];
//     areasForImprovement: string[];
//     specificFeedback: string;
//   };
//   communicationSkills?: {
//     score: number;
//     clarity: number;
//     articulation: number;
//     listeningSkills: number;
//     strengths: string[];
//     weaknesses: string[];
//     areasForImprovement: string[];
//     specificFeedback: string;
//   };
//   problemSolving?: {
//     score: number;
//     analyticalThinking: number;
//     creativity: number;
//     approachToProblems: number;
//     strengths: string[];
//     weaknesses: string[];
//     areasForImprovement: string[];
//     specificFeedback: string;
//   };
//   behavioralCompetencies?: {
//     score: number;
//     leadership: number;
//     teamwork: number;
//     adaptability: number;
//     timeManagement: number;
//     conflictResolution: number;
//     strengths: string[];
//     weaknesses: string[];
//     areasForImprovement: string[];
//     specificFeedback: string;
//   };
//   keyStrengths: string[];
//   keyWeaknesses: string[];
//   criticalAreasForImprovement: string[];
//   detailedFeedback: string;
//   positiveHighlights?: string[];
//   developmentAreas?: string[];
//   recommendations?: {
//     nextSteps: string[];
//     resourcesSuggested: string[];
//     skillsToFocus: string[];
//     trainingRecommendations: string[];
//   };
//   responseQuality?: {
//     completeness: number;
//     relevance: number;
//     depth: number;
//     examples: number;
//   };
//   questionResponses?: Array<{
//     questionId: string;
//     questionText: string;
//     response: string;
//     score: number;
//     feedback: string;
//     strengths: string[];
//     improvements: string[];
//   }>;
// }

export const feedbackSchema = z.object({
  overallScore: z.number().min(1).max(10),
  overallRating: z.enum(["excellent", "good", "average", "poor"]),
  technicalSkills: z.object({
    score: z.number(),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    areasForImprovement: z.array(z.string()),
    specificFeedback: z.string(),
  }),
  communicationSkills: z.object({
    score: z.number(),
    clarity: z.number(),
    articulation: z.number(),
    listeningSkills: z.number(),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    areasForImprovement: z.array(z.string()),
    specificFeedback: z.string(),
  }),
  problemSolving: z.object({
    score: z.number(),
    analyticalThinking: z.number(),
    creativity: z.number(),
    approachToProblems: z.number(),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    areasForImprovement: z.array(z.string()),
    specificFeedback: z.string(),
  }),
  behavioralCompetencies: z.object({
    score: z.number(),
    leadership: z.number(),
    teamwork: z.number(),
    adaptability: z.number(),
    timeManagement: z.number(),
    conflictResolution: z.number(),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    areasForImprovement: z.array(z.string()),
    specificFeedback: z.string(),
  }),
  keyStrengths: z.array(z.string()),
  keyWeaknesses: z.array(z.string()),
  criticalAreasForImprovement: z.array(z.string()),
  detailedFeedback: z.string(),
  positiveHighlights: z.array(z.string()),
  developmentAreas: z.array(z.string()),
  recommendations: z.object({
    nextSteps: z.array(z.string()),
    resourcesSuggested: z.array(z.string()),
    skillsToFocus: z.array(z.string()),
    trainingRecommendations: z.array(z.string()),
  }),
  responseQuality: z.object({
    completeness: z.number(),
    relevance: z.number(),
    depth: z.number(),
    examples: z.number(),
  }),
  questionResponses: z.array(
    z.object({
      questionId: z.string(),
      questionText: z.string(),
      response: z.string(),
      score: z.number(),
      feedback: z.string(),
      strengths: z.array(z.string()),
      improvements: z.array(z.string()),
    })
  ),
});

export type FeedbackResponse = z.infer<typeof feedbackSchema>;
