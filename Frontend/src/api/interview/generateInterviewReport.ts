import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * @description Service to generate interview report based on job description, resume and self description
 * @param jobDescription {string}
 * @param resumeFile {File}
 * @param selfDescription {string}
 * @returns promise of {message:string, interviewReport:InterviewReportType}
 */
export const generateInterviewReport = async (jobDescription: string, resumeFile: File | null, selfDescription: string) => {
    try {
        const formData = new FormData();
        formData.append("jobDescription", jobDescription.trim());
        if (resumeFile) {
            formData.append("resume", resumeFile);
        }
        if (selfDescription.trim()) {
            formData.append("selfDescription", selfDescription.trim());
        }
        const response = await axios.post(`${API_URL}/api/interview/generate`, formData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || "Something went wrong";
    }
};