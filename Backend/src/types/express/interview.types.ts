import { z } from "zod";
import { interviewReportSchema } from "../../models/interviewReport.js";
import { interviewInputSchema } from "../../schemas/interview.validator.js";

export type InterviewReportType = z.infer<typeof interviewReportSchema>

export type InterviewInputType = z.infer<typeof interviewInputSchema>
