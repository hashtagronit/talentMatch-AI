import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getUserProfile = async () => {
    try {
        const res = await axios.get(`${API_URL}/api/auth/userProfile`, {
            withCredentials: true,
        });
        return res.data;
    } catch (error: any) {
        throw error.response?.data?.message || "Something went wrong";
    }
};