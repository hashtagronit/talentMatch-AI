import mongoose from "mongoose";

/**
 * =========================
 * Sub Schemas
 * =========================
 */

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
    },
  },
  { _id: false }
);

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Behavioral question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { _id: false }
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is required"],
    },
    recommendation: {
      type: String,
      required: [true, "Recommendation is required"],
    },
  },
  { _id: false }
);

const preparationPlanSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: [true, "Day is required"],
    },
    focus: {
      type: String,
      required: [true, "Focus is required"],
    },
    tasks: [
      {
        type: String,
        required: [true, "Task is required"],
      },
    ],
    resources: [
      {
        type: String, // links, topics, etc.
      },
    ],
  },
  { _id: false }
);

const resumeImprovementSchema = new mongoose.Schema(
  {
    section: {
      type: String, // e.g. "Projects", "Experience"
      required: true,
    },
    suggestion: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

/**
 * =========================
 * Main Schema
 * =========================
 */

const interviewReportSchema = new mongoose.Schema(
  {
    // Input
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },

    title: {
      type: String,
      required: [true, "Job title is required"],
    },

    // Scores
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    atsScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    // Summary
    summary: {
      type: String,
    },

    // Insights
    strengths: [String],
    weaknesses: [String],

    missingKeywords: [String],

    // Resume suggestions
    resumeImprovements: [resumeImprovementSchema],

    // Core analysis
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],

    // Meta insights
    estimatedPreparationTime: {
      type: String, // e.g. "7 days", "2 weeks"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * =========================
 * Model Export
 * =========================
 */

const interviewReportModel = mongoose.model("InterviewReport",interviewReportSchema);

export {interviewReportModel, interviewReportSchema}