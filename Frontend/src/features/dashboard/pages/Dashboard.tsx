import { useEffect, useState } from "react";
import { useGetUserAllInterviewReports } from "@/hooks/useGetUserAllInterviewReports";
import { useInterviewContext } from "@/context/InterviewContext";
import { useNavigate } from "react-router";
import { FileText, Calendar, Target, Award, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export default function Dashboard() {
  const { handleGetUserAllInterviewReports, loading } = useGetUserAllInterviewReports();
  const { allReports } = useInterviewContext();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetUserAllInterviewReports(currentPage, 10);
  }, [currentPage]);

  const handleRowClick = (id: string) => {
    navigate(`/report/${id}`);
  };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-[#121212] p-6 font-sans transition-colors duration-300 flex flex-col min-h-0">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col min-h-0">
        <header className="mb-6 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Interview Reports</h1>
            <p className="text-gray-500 dark:text-[#b3b3b3] mt-1 text-sm">Review your past performance and roadmaps</p>
          </div>
        </header>

        <div className="bg-white dark:bg-[#181818] rounded-2xl shadow-md dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-[#272727] flex-1 flex flex-col overflow-hidden transition-colors duration-300 min-h-0">
          
          <div className="overflow-x-auto overflow-y-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gray-100 dark:bg-[#1f1f1f] border-b border-gray-200 dark:border-[#272727]">
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#7c7c7c]">Job Title</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#7c7c7c]">Date Generated</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#7c7c7c]">Match Score</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#7c7c7c]">ATS Score</th>
                </tr>
              </thead>
              <tbody>
                {loading && allReports.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-20 text-center">
                      <Loader2 className="animate-spin mx-auto text-[#1ed760] mb-3" size={32} />
                      <p className="text-sm font-bold text-gray-500 dark:text-[#b3b3b3]">Loading your reports...</p>
                    </td>
                  </tr>
                ) : allReports.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-20 text-center text-gray-500 dark:text-[#b3b3b3]">
                      No reports found. Generate one to see it here!
                    </td>
                  </tr>
                ) : (
                  allReports.map((report) => (
                    <tr 
                      key={report._id} 
                      onClick={() => handleRowClick(report._id)}
                      className="border-b border-gray-100 dark:border-[#272727] hover:bg-gray-50 dark:hover:bg-[#1f1f1f] transition-colors group cursor-pointer"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white dark:bg-[#121212] rounded-lg border border-gray-200 dark:border-[#272727] group-hover:border-[#1ed760] group-hover:text-[#1ed760] transition-colors">
                            <FileText size={18} />
                          </div>
                          <span className="font-bold text-[15px] text-gray-900 dark:text-white group-hover:text-[#1ed760] transition-colors">{report.title}</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-[#b3b3b3]">
                          <Calendar size={16} />
                          {new Date(report.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2">
                          <Target size={18} className={report.matchScore >= 80 ? "text-[#1ed760]" : "text-[#ffa42b]"} />
                          <span className="font-bold text-[15px] text-gray-900 dark:text-white">{report.matchScore}%</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2">
                          <Award size={18} className={report.atsScore >= 80 ? "text-[#539df5]" : "text-[#ffa42b]"} />
                          <span className="font-bold text-[15px] text-gray-900 dark:text-white">{report.atsScore}%</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-[#272727] flex items-center justify-between bg-gray-50 dark:bg-[#1f1f1f] shrink-0">
            <p className="text-[13px] font-bold text-gray-500 dark:text-[#7c7c7c]">Showing page {currentPage}</p>
            <div className="flex items-center gap-1">
              <button 
                disabled={currentPage === 1 || loading}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="p-2 rounded-lg text-gray-600 dark:text-[#b3b3b3] hover:bg-gray-200 dark:hover:bg-[#272727] disabled:opacity-50 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-sm font-bold flex items-center justify-center transition-colors ${
                    currentPage === page 
                      ? "bg-[#1ed760] text-black" 
                      : "text-gray-600 dark:text-[#b3b3b3] hover:bg-gray-200 dark:hover:bg-[#272727]"
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="text-gray-500 px-1 font-bold">...</span>
              <button
                onClick={() => setCurrentPage(10)}
                className={`w-8 h-8 rounded-lg text-sm font-bold flex items-center justify-center transition-colors ${
                  currentPage === 10 ? "bg-[#1ed760] text-black" : "text-gray-600 dark:text-[#b3b3b3] hover:bg-gray-200 dark:hover:bg-[#272727]"
                }`}
              >
                10
              </button>
              
              <button 
                disabled={loading || allReports.length < 10}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="p-2 rounded-lg text-gray-600 dark:text-[#b3b3b3] hover:bg-gray-200 dark:hover:bg-[#272727] disabled:opacity-50 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
