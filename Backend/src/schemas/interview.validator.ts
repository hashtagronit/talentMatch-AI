import { z } from "zod";

export const interviewInputSchema = z.object({
  jobDescription: z.string().min(10),
  selfDescription: z.string().optional(),
});