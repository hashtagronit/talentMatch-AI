import axios from "axios";

type SignUpData = {
    username: string;
    email: string;
    password: string;
};

const API_URL = import.meta.env.VITE_API_URL;

export const signUpUser = async (data: SignUpData) => {
    try {
        const res = await axios.post(`${API_URL}/api/auth/register`, data, {
            withCredentials: true,
        });
        return res.data;
    } catch (error: any) {
        throw error.response?.data?.message || "Something went wrong";
    }
}