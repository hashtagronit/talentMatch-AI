import { useState } from "react";
import { logOutUser } from "@/api/auth/logOutUser";


export const useLogout = () => {   
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true);
            const response = await logOutUser();
            return response;
        } catch (error: any) {
            throw error.response?.data?.message || "Something went wrong";
        } finally {
            setLoading(false);
        }
    };

    return { handleLogout, loading };
};
