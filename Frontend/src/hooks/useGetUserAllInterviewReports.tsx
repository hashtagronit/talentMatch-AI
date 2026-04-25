import { useState } from "react";
import { getUserAllInterviewReport } from "@/api/interview/getUserAllInterviewReport";
import { useInterviewContext } from "@/context/InterviewContext";

export const useGetUserAllInterviewReports = () => {
  const { setAllReports } = useInterviewContext();
  const [loading, setLoading] = useState(false);

  const handleGetUserAllInterviewReports = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const data = await getUserAllInterviewReport(page, limit);
      setAllReports(data.interviewReports);
    } finally {
      setLoading(false);
    }
  };

  return { handleGetUserAllInterviewReports, loading };
};