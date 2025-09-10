import { getInterviewById } from "@/lib/actions/general.actions";
import Agent from "@/components/Agent";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/server.actions";

async function Interview({ params }: { params: { id: string } }) {
  const interviewId = params.id;

  console.log("interview id", interviewId);

  const interview = await getInterviewById(interviewId);
  console.log(interview?.questions);

  const result = await getCurrentUser();

  const userId = result?.user?.id;

  if (!interview) redirect("/dashboard");

  return (
    <>
      <Agent
        userId={userId}
        type="interview"
        interviewId={interviewId}
        questions={interview.questions}
      />
    </>
  );
}

export default Interview;
