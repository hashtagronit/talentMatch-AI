import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const logOutUser = async () => {
    try {
        const res = await axios.post(`${API_URL}/api/auth/logout`,{},{
            withCredentials: true,
        });
        return res.data;
    } catch (error: any) {
        throw error.response?.data?.message || "Something went wrong";
    }
};