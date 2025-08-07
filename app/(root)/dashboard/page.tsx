import Interviews from "@/components/Interviews";

export default function Dashboard() {
  // const router = useRouter();

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Interview Dashboard</h1>
          <p className="mt-2 text-gray-300">
            Manage your AI-powered interviews and track candidate progress
          </p>
        </div>

        {/* Interviews Section  */}
        <Interviews />

        <div className="mt-10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white">Take an Interview</h2>
          </div>
          <div>
            <p className="text-white">There are no interviews right now</p>
          </div>
        </div>
      </div>
    </div>
  );
}
