import db from "@/app/db/db";
import { interview } from "@/app/db/schema";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

interface reqBody {
  level: string;
  amount: number;
  techstack: string;
  role: string;
  type: string;
  userId: string;
}

export function GET() {
  return Response.json({ message: "hello", success: true });
}

export async function POST(request: Request) {
  const { level, amount, techstack, role, type, userId }: reqBody =
    await request.json();

  const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  });

  console.log("interviewer made a req", {
    level,
    amount,
    techstack,
    role,
    type,
    userId,
  });

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.5-pro"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });

    //storing the interview related data
    const interView = await db
      .insert(interview)
      .values({
        level,
        amount,
        role,
        type,
        techstack: techstack.split(","),
        questions: JSON.parse(questions),
        userId,
      })
      .returning();

    console.log("interview", interView);

    return Response.json({ success: true, interView }, { status: 200 });
  } catch (error) {
    return Response.json({ sucess: false, error }, { status: 500 });
  }
}
