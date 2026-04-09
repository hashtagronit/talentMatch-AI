import { useState } from "react";
import { signUpUser } from "@/api/auth/signUpUser";

import type { SignUpInput } from "@/schemas/signUpInputSchema";

export const useSignUp = () => {
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (data: SignUpInput) => {
        try {
            setLoading(true);
            const response = await signUpUser(data);
            setLoading(false);
            return response;
        } catch (error: any) {
            throw error.response?.data?.message || "Something went wrong";
        } finally {
            setLoading(false);
        }
    };

    return { handleSignUp, loading };
}  