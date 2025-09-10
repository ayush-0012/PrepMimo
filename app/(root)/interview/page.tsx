import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/server.actions";

async function page() {
  const result = await getCurrentUser();

  console.log(result.user);

  const userId = result?.user?.id;

  return (
    <div>
      <Agent
        userId={userId}
        type="generate"
        interviewId={null}
        questions={null}
      />
    </div>
  );
}

export default page;
