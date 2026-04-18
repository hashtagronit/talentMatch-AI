import z from "zod";

export const signUpInputSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

export type SignUpInput = z.infer<typeof signUpInputSchema>;