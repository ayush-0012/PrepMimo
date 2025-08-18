import db from "@/app/db/db";
import { interview } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json(
      { success: false, error: "Missing userId" },
      { status: 400 }
    );
  }

  try {
    const interviews = await db
      .select()
      .from(interview)
      .where(eq(interview.userId, userId));

    console.log(interviews);

    return Response.json({ success: true, interviews }, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: `Error occured while fetching interview, ${error}`,
      },
      { status: 500 }
    );
  }
}
