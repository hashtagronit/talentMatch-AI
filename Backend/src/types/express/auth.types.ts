import { signInInputSchema, signUpInputSchema } from "../../schemas/auth.validator.js";
import z from "zod";

export type SignInInput = z.infer<typeof signInInputSchema>;
export type SignUpInput = z.infer<typeof signUpInputSchema>;