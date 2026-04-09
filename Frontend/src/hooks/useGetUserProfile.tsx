import { getUserProfile } from "@/api/auth/getUserprofile";
import { useState } from "react";

export const useGetUserProfile = () => {

    const [loading, setLoading] = useState(false);

    const handleGetUserProfile = async () => {
        try {
            setLoading(true);
            const response = await getUserProfile();
            return response;
        } catch (error: any) {
            throw error.response?.data?.message || "Something went wrong";
        } finally {
            setLoading(false);
        }
    };

    return { handleGetUserProfile, loading };
};
