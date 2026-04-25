import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
/**
 * @description Service to get interview report by ID
 * @param id {string}
 * @returns promise of {message:string, interviewReport:InterviewReportType}
 */
export const getInterviewReportById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/interview/${id}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || "Something went wrong";
    }
};