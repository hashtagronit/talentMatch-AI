import { useState } from "react";
import { getInterviewReportById } from "@/api/interview/getInterviewReportById";
import { useInterviewContext } from "@/context/InterviewContext";

export const useGetInterviewReportById = () => {
  const { setInterviewReport } = useInterviewContext();
  const [loading, setLoading] = useState(false);

  const handleGetInterviewReportById = async (id: string) => {
    try {
      setLoading(true);
      const data = await getInterviewReportById(id);
      setInterviewReport(data.interviewReport);
    } finally {
      setLoading(false);
    }
  };

  return { handleGetInterviewReportById, loading };
};