
import axios from "axios";

type SigninData = {
    email: string;
    password: string;
};

const API_URL = import.meta.env.VITE_API_URL;

export const signInUser = async (data: SigninData) => {
    try {
        const res = await axios.post(
            `${API_URL}/api/auth/login`,
            data,
            {
                withCredentials: true,
            }
        );

        return res.data;
    } catch (error: any) {
        throw error.response?.data?.message || "Something went wrong";
    }
}