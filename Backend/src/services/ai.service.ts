import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY as string,
});

async function invokeGeminiAI(prompt: string) {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
    });
    return response.text;
}

const interviewReportSchema = z.object({
  title: z.string().describe(
    "Concise job title extracted from the job description (e.g. 'Frontend Developer', 'Backend Engineer')"
  ),
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "Overall match score (0-100) indicating how well the candidate fits the job based on skills, experience, and relevance to the job description"
    ),

  atsScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "ATS score (0-100) based on keyword match, resume structure, formatting, and alignment with job description keywords"
    ),

  summary: z
    .string()
    .min(50)
    .max(500)
    .describe(
      "A concise 3-5 line summary explaining the candidate's overall fit for the role, including key strengths and major gaps"
    ),

  strengths: z
    .array(
      z
        .string()
        .min(10)
        .describe(
          "Specific, non-generic strength derived from the resume and job description (e.g., 'Strong experience in building REST APIs using Node.js')"
        )
    )
    .min(3)
    .max(6),

  weaknesses: z
    .array(
      z
        .string()
        .min(10)
        .describe(
          "Specific, real weakness or gap based on missing skills or experience (e.g., 'Limited exposure to system design and scalability concepts')"
        )
    )
    .min(2)
    .max(5),

  missingKeywords: z
    .array(
      z
        .string()
        .min(2)
        .describe(
          "Exact important keywords from the job description that are missing in the resume (e.g., 'Docker', 'GraphQL')"
        )
    )
    .min(3)
    .max(10),

  resumeImprovements: z
    .array(
      z.object({
        section: z
          .string()
          .describe(
            "Resume section that needs improvement (e.g., 'Projects', 'Experience', 'Skills')"
          ),
        suggestion: z
          .string()
          .min(15)
          .describe(
            "Clear, actionable suggestion to improve that section of the resume"
          ),
      })
    )
    .min(3)
    .max(6),

  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .min(10)
          .describe(
            "Realistic technical interview question relevant to the job role"
          ),
        intention: z
          .string()
          .min(10)
          .describe(
            "What the interviewer is trying to evaluate with this question (e.g., problem-solving, system design, fundamentals)"
          ),
        answer: z
          .string()
          .min(30)
          .describe(
            "Structured answer guidance with key points, approach, and explanation (not just a one-line answer)"
          ),
        difficulty: z
          .enum(["easy", "medium", "hard"])
          .describe("Difficulty level of the question"),
      })
    )
    .min(5)
    .max(8),

  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .min(10)
          .describe("Common behavioral interview question relevant to the role"),
        intention: z
          .string()
          .min(10)
          .describe(
            "What trait is being evaluated (e.g., teamwork, leadership, conflict resolution)"
          ),
        answer: z
          .string()
          .min(30)
          .describe(
            "Guidance on answering using STAR method (Situation, Task, Action, Result)"
          ),
      })
    )
    .min(3)
    .max(5),

  skillGaps: z
    .array(
      z.object({
        skill: z
          .string()
          .min(2)
          .describe("Important skill missing or weak in candidate profile"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("How critical this skill gap is for the role"),
        recommendation: z
          .string()
          .min(15)
          .describe(
            "Specific and actionable recommendation to improve this skill"
          ),
      })
    )
    .min(3)
    .max(8),

  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .min(1)
          .describe("Day number in preparation plan (starting from 1)"),

        focus: z
          .string()
          .min(10)
          .describe(
            "Main topic to focus on for the day (e.g., 'Data Structures - Arrays & Strings')"
          ),

        tasks: z
          .array(
            z
              .string()
              .min(10)
              .describe(
                "Specific actionable task (e.g., 'Solve 5 LeetCode problems on arrays')"
              )
          )
          .min(2)
          .max(5),

        resources: z
          .array(
            z
              .string()
              .min(5)
              .describe(
                "Helpful resource like a link, platform, or topic (e.g., 'NeetCode Array Playlist')"
              )
          )
          .min(1)
          .max(3),
      })
    )
    .min(3)
    .max(7),

  estimatedPreparationTime: z
    .string()
    .min(5)
    .describe(
      "Realistic estimate of preparation time (e.g., '7-10 days', '2 weeks')"
    ),
});


async function generateInterviewReport(resume: string, selfDescription: string, jobDescription: string) {

   const prompt = `
You are an expert technical interviewer, ATS system, and career coach.

Your task is to analyze the candidate profile and generate a HIGH-QUALITY, REALISTIC, and ACTIONABLE interview report.

-------------------------
INPUT DATA
-------------------------

RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}

-------------------------
SCORING LOGIC (STRICT)
-------------------------

TITLE
- Extract a clear job title from the job description
- Example: "Frontend Developer", "Backend Engineer"


MATCH SCORE (0–100):
Calculate using weighted evaluation:
- Skills Match (40%) → Required technical skills present
- Experience Match (25%) → Relevant projects, internships, real work
- Keyword Match (20%) → Overlap with important job keywords
- Role Relevance (15%) → Alignment with responsibilities

Be STRICT:
- 80+ only if strong alignment
- 60–80 if partial match
- below 60 if major gaps

ATS SCORE (0–100):
Calculate based on:
- Keyword presence (50%)
- Resume structure & sections (25%)
- Clarity & readability (15%)
- Formatting (10%)

IMPORTANT:
ATS score is about resume quality, NOT candidate skill.

-------------------------
INSTRUCTIONS
-------------------------

1. SUMMARY
- 3–5 lines
- Mention overall fit, key strengths, and biggest gaps

2. STRENGTHS
- 3–6 points
- Must be SPECIFIC (no generic statements)
- Derived directly from resume + JD

3. WEAKNESSES
- 2–5 points
- Real, honest gaps only (no soft filler text)

4. MISSING KEYWORDS
- Extract exact important keywords from job description
- Only include keywords NOT present in resume

5. RESUME IMPROVEMENTS
- Provide 3–6 actionable suggestions
- Mention section (Projects, Experience, Skills, etc.)
- Must be practical and implementable

6. TECHNICAL QUESTIONS
- Generate 5–8 REAL interview questions
- Each must include:
  - question (role-specific)
  - intention (what interviewer tests)
  - answer (structured approach, key points—not paragraphs)
  - difficulty (easy / medium / hard)

7. BEHAVIORAL QUESTIONS
- Generate 3–5 questions
- Answers must follow STAR method guidance

8. SKILL GAPS
- Identify 3–8 real missing or weak skills
- Assign severity:
  - high → critical for role
  - medium → important but not critical
  - low → good to have
- Provide actionable recommendation

9. PREPARATION PLAN
- 3–7 days plan
- Each day must include:
  - focus (clear topic)
  - 2–5 specific tasks
  - 1–3 useful resources (platforms, topics, links)

10. ESTIMATED PREPARATION TIME
- Realistic timeline (e.g. "7–10 days", "2–3 weeks")

-------------------------
QUALITY RULES (VERY IMPORTANT)
-------------------------

- Do NOT generate generic content
- Do NOT repeat similar points
- Keep answers concise but meaningful
- Use real-world, practical suggestions
- Avoid vague phrases like "improve skills" or "learn more"

-------------------------
OUTPUT RULES
-------------------------

- Output MUST be valid JSON ONLY
- Follow the provided schema strictly
- Do NOT include markdown, explanation, or extra text
- Do NOT skip any field
- Ensure all arrays meet required length constraints

`;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: interviewReportSchema.toJSONSchema(),
        },
    });
    if (!response.text) {
        throw new Error("No response from AI");
    }
    return JSON.parse(response.text);
}

export { invokeGeminiAI, generateInterviewReport }
