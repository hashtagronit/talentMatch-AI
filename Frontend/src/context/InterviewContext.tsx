import { createContext, useState, useContext } from "react";
import { type InterviewContextType, type AllReportsType, type InterviewReportType } from "../types/interviewTypes";



export const InterviewContext = createContext<InterviewContextType | null>(null);

export const useInterviewContext = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterviewContext must be used within InterviewContextProvider");
  }
  return context;
};


export const InterviewContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [interviewReport, setInterviewReport] = useState<InterviewReportType | null>(null);

  const [allReports, setAllReports] = useState<AllReportsType[]>([]);

  return (
    <InterviewContext.Provider
      value={{
        interviewReport,
        setInterviewReport,
        allReports,
        setAllReports,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};


