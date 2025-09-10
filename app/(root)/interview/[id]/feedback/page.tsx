import db from "@/app/db/db";
import { feedback } from "@/app/db/schema";
import { eq, and } from "drizzle-orm";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/server.actions";

interface FeedbackPageProps {
  params: {
    id: string;
  };
  userId: string | undefined;
}

// Server component to fetch feedback data
async function getFeedback(interviewId: string, userId: string) {
  try {
    const feedbackData = await db
      .select()
      .from(feedback)
      .where(
        and(eq(feedback.interviewId, interviewId), eq(feedback.userId, userId))
      );

    console.log("Query result (array):", feedbackData);
    console.log("Array length:", feedbackData.length);
    console.log("First item:", feedbackData[0]);

    return feedbackData[0] || null;
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return null;
  }
}

// Main feedback page component
async function FeedbackPage({ params }: FeedbackPageProps) {
  const { id: interviewId } = params;
  const result = await getCurrentUser();

  const userId = result?.user?.id;

  console.log("userid", userId);
  console.log("interiewid", interviewId);

  if (!userId && !interviewId) return;

  const feedbackData = await getFeedback(interviewId, userId);

  if (!feedbackData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
            Interview Feedback
          </h1>
          <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          {/* Overall Score Hero Section */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 sm:p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-purple-600 mb-4">
                <span className="text-2xl sm:text-4xl font-bold text-white">
                  {feedbackData.overallScore}/10
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                Overall Performance
              </h2>
              <p className="text-lg text-slate-300 capitalize">
                {feedbackData.overallRating}
              </p>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                <h3 className="text-xl font-semibold text-white">
                  Key Strengths
                </h3>
              </div>
              <div className="space-y-3">
                {feedbackData.keyStrengths.map((strength, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-slate-300 leading-relaxed">
                      {strength}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
                <h3 className="text-xl font-semibold text-white">
                  Areas for Improvement
                </h3>
              </div>
              <div className="space-y-3">
                {feedbackData.criticalAreasForImprovement.map((area, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-slate-300 leading-relaxed">
                      {area}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Assessment */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
              Detailed Assessment
            </h2>

            {/* Technical Skills */}
            {feedbackData.technicalSkills && (
              <SkillSection
                title="Technical Skills"
                data={feedbackData.technicalSkills}
                color="cyan"
              />
            )}

            {/* Communication Skills */}
            {feedbackData.communicationSkills && (
              <CommunicationSection data={feedbackData.communicationSkills} />
            )}

            {/* Problem Solving */}
            {feedbackData.problemSolving && (
              <SkillSection
                title="Problem Solving"
                data={feedbackData.problemSolving}
                color="purple"
              />
            )}

            {/* Behavioral Competencies */}
            {feedbackData.behavioralCompetencies && (
              <BehavioralSection data={feedbackData.behavioralCompetencies} />
            )}
          </div>

          {/* Response Quality */}
          {feedbackData.responseQuality && (
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                Response Quality Metrics
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  label="Completeness"
                  value={feedbackData.responseQuality.completeness}
                />
                <MetricCard
                  label="Relevance"
                  value={feedbackData.responseQuality.relevance}
                />
                <MetricCard
                  label="Depth"
                  value={feedbackData.responseQuality.depth}
                />
                <MetricCard
                  label="Examples"
                  value={feedbackData.responseQuality.examples}
                />
              </div>
            </div>
          )}

          {/* Recommendations */}
          {feedbackData.recommendations && (
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <h3 className="text-xl font-semibold text-white">
                  Recommendations
                </h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-emerald-400 mb-3 text-lg">
                    Next Steps
                  </h4>
                  <div className="space-y-2">
                    {feedbackData.recommendations.nextSteps?.map(
                      (step, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span className="text-slate-300">{step}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-3 text-lg">
                    Suggested Resources
                  </h4>
                  <div className="space-y-2">
                    {feedbackData.recommendations.resourcesSuggested?.map(
                      (resource, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span className="text-slate-300">{resource}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Feedback */}
          {feedbackData.detailedFeedback && (
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
                Detailed Feedback
              </h3>
              <p className="text-slate-300 leading-relaxed text-center max-w-4xl mx-auto">
                {feedbackData.detailedFeedback}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper Components
interface SkillSectionProps {
  title: string;
  data: {
    score: number;
    strengths: string[];
    weaknesses: string[];
    areasForImprovement: string[];
    specificFeedback: string;
  };
  color: string;
}

function SkillSection({ title, data, color }: SkillSectionProps) {
  const colorMap = {
    cyan: "bg-cyan-600",
    purple: "bg-purple-600",
    emerald: "bg-emerald-600",
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center mb-2 sm:mb-0">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <div
          className={`inline-flex items-center px-4 py-2 rounded-full ${colorMap[color]} text-white font-bold`}
        >
          {data.score}/100
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-semibold text-emerald-400 mb-3">Strengths</h4>
          <div className="space-y-2">
            {data.strengths.map((strength, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="text-slate-300">{strength}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-amber-400 mb-3">
            Areas for Improvement
          </h4>
          <div className="space-y-2">
            {data.areasForImprovement.map((area, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="text-slate-300">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {data.specificFeedback && (
        <div className="border-t border-slate-700 pt-4">
          <h4 className="font-semibold text-white mb-2">Specific Feedback</h4>
          <p className="text-slate-300 leading-relaxed">
            {data.specificFeedback}
          </p>
        </div>
      )}
    </div>
  );
}

function CommunicationSection({ data }: { data: any }) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center mb-2 sm:mb-0">
          <h3 className="text-xl font-semibold text-white">
            Communication Skills
          </h3>
        </div>
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-600 text-white font-bold">
          {data.score}/100
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <MetricCard label="Clarity" value={data.clarity} />
        <MetricCard label="Articulation" value={data.articulation} />
        <MetricCard label="Listening" value={data.listeningSkills} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-semibold text-emerald-400 mb-3">Strengths</h4>
          <div className="space-y-2">
            {data.strengths.map((strength: string, index: number) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="text-slate-300">{strength}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-amber-400 mb-3">
            Areas for Improvement
          </h4>
          <div className="space-y-2">
            {data.areasForImprovement.map((area: string, index: number) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="text-slate-300">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {data.specificFeedback && (
        <div className="border-t border-slate-700 pt-4">
          <h4 className="font-semibold text-white mb-2">Specific Feedback</h4>
          <p className="text-slate-300 leading-relaxed">
            {data.specificFeedback}
          </p>
        </div>
      )}
    </div>
  );
}

function BehavioralSection({ data }: { data: any }) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center mb-2 sm:mb-0">
          <h3 className="text-xl font-semibold text-white">
            Behavioral Competencies
          </h3>
        </div>
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-600 text-white font-bold">
          {data.score}/100
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <MetricCard label="Leadership" value={data.leadership} />
        <MetricCard label="Teamwork" value={data.teamwork} />
        <MetricCard label="Adaptability" value={data.adaptability} />
        <MetricCard label="Time Mgmt" value={data.timeManagement} />
        <MetricCard
          label="Conflict Resolution"
          value={data.conflictResolution}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-semibold text-emerald-400 mb-3">Strengths</h4>
          <div className="space-y-2">
            {data.strengths.map((strength: string, index: number) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="text-slate-300">{strength}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-amber-400 mb-3">
            Areas for Improvement
          </h4>
          <div className="space-y-2">
            {data.areasForImprovement.map((area: string, index: number) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="text-slate-300">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {data.specificFeedback && (
        <div className="border-t border-slate-700 pt-4">
          <h4 className="font-semibold text-white mb-2">Specific Feedback</h4>
          <p className="text-slate-300 leading-relaxed">
            {data.specificFeedback}
          </p>
        </div>
      )}
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: number;
}

function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-xl p-3 text-center">
      <div className="text-xl sm:text-2xl font-bold text-white mb-1">
        {value}/10
      </div>
      <div className="text-xs sm:text-sm text-slate-400">{label}</div>
    </div>
  );
}

export default FeedbackPage;
