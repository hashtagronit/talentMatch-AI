import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * @description Service to get all interview reports of user
 * @param page {number}
 * @param limit {number}
 * @returns promise of {message:string, interviewReports:Array<{title:string, matchScore:number, atsScore:number, createdAt:Date}>, page:number, limit:number}
 */
export const getUserAllInterviewReport = async (
  page: number = 1,
  limit: number = 10
) => {
  try {
    const response = await axios.get(`${API_URL}/api/interview/all`, {
      params: {
        page,
        limit,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Something went wrong";
  }
};