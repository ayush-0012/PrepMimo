import {
  varchar,
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  jsonb,
  boolean,
  json,
} from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: text("id").primaryKey(),
  image: varchar(),
  name: varchar({ length: 225 }).notNull(),
  email: text().unique().notNull(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const interview = pgTable("interview", {
  id: uuid().defaultRandom().primaryKey(),
  level: text().notNull(),
  amount: integer().notNull(),
  role: text().notNull(),
  type: text().notNull(),
  techstack: jsonb("techstack").notNull(),
  questions: jsonb("questions"),
  userId: text()
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const feedback = pgTable("feedback", {
  id: uuid().defaultRandom().primaryKey(),
  interviewId: uuid()
    .notNull()
    .references(() => interview.id),
  userId: text()
    .notNull()
    .references(() => user.id),

  // Overall Performance Metrics
  overallScore: integer("overall_score").notNull(), // 1-10 scale
  overallRating: varchar("overall_rating", { length: 20 }).notNull(), // "excellent", "good", "average", "poor"

  // Core Feedback Categories
  technicalSkills: json("technical_skills").$type<{
    score: number;
    strengths: string[];
    weaknesses: string[];
    areasForImprovement: string[];
    specificFeedback: string;
  }>(),

  communicationSkills: json("communication_skills").$type<{
    score: number;
    clarity: number;
    articulation: number;
    listeningSkills: number;
    strengths: string[];
    weaknesses: string[];
    areasForImprovement: string[];
    specificFeedback: string;
  }>(),

  problemSolving: json("problem_solving").$type<{
    score: number;
    analyticalThinking: number;
    creativity: number;
    approachToProblems: number;
    strengths: string[];
    weaknesses: string[];
    areasForImprovement: string[];
    specificFeedback: string;
  }>(),

  behavioralCompetencies: json("behavioral_competencies").$type<{
    score: number;
    leadership: number;
    teamwork: number;
    adaptability: number;
    timeManagement: number;
    conflictResolution: number;
    strengths: string[];
    weaknesses: string[];
    areasForImprovement: string[];
    specificFeedback: string;
  }>(),

  // Overall Summary
  keyStrengths: json("key_strengths").$type<string[]>().notNull(),
  keyWeaknesses: json("key_weaknesses").$type<string[]>().notNull(),
  criticalAreasForImprovement: json("critical_areas_for_improvement")
    .$type<string[]>()
    .notNull(),

  detailedFeedback: text("detailed_feedback"),
  positiveHighlights: json("positive_highlights").$type<string[]>(),
  developmentAreas: json("development_areas").$type<string[]>(),

  recommendations: json("recommendations").$type<{
    nextSteps: string[];
    resourcesSuggested: string[];
    skillsToFocus: string[];
    trainingRecommendations: string[];
  }>(),
  responseQuality: json("response_quality").$type<{
    completeness: number; // 1-10
    relevance: number; // 1-10
    depth: number; // 1-10
    examples: number; // 1-10
  }>(),
  questionResponses: json("question_responses").$type<
    Array<{
      questionId: string;
      questionText: string;
      response: string;
      score: number;
      feedback: string;
      strengths: string[];
      improvements: string[];
    }>
  >(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});
