import { useInterviewContext } from "@/context/InterviewContext";
import { useState } from "react";
import { generateInterviewReport } from "@/api/interview/generateInterviewReport";


export const useGenerateInterviewReport = () => {
  const { setInterviewReport } = useInterviewContext();
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async (jobDescription: string, file: File | null, selfDescription: string) => {
    try {
      setLoading(true);
      const data = await generateInterviewReport(jobDescription, file, selfDescription);
      setInterviewReport(data.interviewReport);
      return data;
    } finally {
      setLoading(false);
    }
  };

  return { handleGenerateReport, loading };
};