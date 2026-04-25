export type InterviewReportType = {
  _id: string;
  title: string;
  matchScore: number;
  atsScore: number;
  createdAt: string;
  [key: string]: any;
};

export type AllReportsType = {
  _id: string;
  title: string;
  matchScore: number;
  atsScore: number;
  createdAt: string; 
};

export interface InterviewContextType {
  interviewReport: InterviewReportType | null;
  setInterviewReport: (report: InterviewReportType | null) => void;

  allReports: AllReportsType[];
  setAllReports: (reports: AllReportsType[]) => void;
}


