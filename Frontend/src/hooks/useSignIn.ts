import { useState } from "react";
import { signInUser } from "@/api/auth/signInUser";

import type { SignInInput } from "@/schemas/signInInputSchema";

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
 

  const handleSignIn = async (data: SignInInput) => {
    try {
      setLoading(true);

      const response = await signInUser(data);
      return response; 
    } catch (error: any) {
      throw error.response?.data?.message || "Something went wrong";
    } finally {
      setLoading(false);
    }
  };

  return { handleSignIn,loading };
};