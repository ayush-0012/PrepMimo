import { generateFeedback } from "@/lib/actions/general.actions";

export async function POST(request: Request) {
  const { userId, interviewId, transcript } = await request.json();

  try {
    const feedbackData = await generateFeedback(
      userId,
      interviewId,
      transcript
    );

    console.log("feedbackdtta", feedbackData);

    return Response.json({ success: true, feedbackData }, { status: 200 });
  } catch (error) {
    console.log("Error Occurred while generating feedback", error);
    return Response.json(
      {
        success: 500,
        message: "Error occurred while generating feedback",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
