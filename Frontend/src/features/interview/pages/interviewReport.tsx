import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { 
  FileText, 
  Code, 
  Users, 
  Map as MapIcon, 
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  Target,
  Award,
  Loader2
} from 'lucide-react';
import { useGetInterviewReportById } from '@/hooks/useGetInterviewReportById';
import { useInterviewContext } from '@/context/InterviewContext';

export default function InterviewReport() {
  const { id } = useParams<{ id: string }>();
  const { handleGetInterviewReportById, loading } = useGetInterviewReportById();
  const { interviewReport } = useInterviewContext();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      handleGetInterviewReportById(id);
    }
  }, [id]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'technical', label: 'Technical Questions', icon: Code },
    { id: 'behavioral', label: 'Behavioral Questions', icon: Users },
    { id: 'roadmap', label: 'Roadmap', icon: MapIcon },
    { id: 'resume', label: 'Resume Improvements', icon: TrendingUp },
  ];

  if (loading || !interviewReport) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-[#121212]">
        <Loader2 className="animate-spin text-[#1ed760] mb-4" size={48} />
        <p className="text-gray-500 dark:text-[#b3b3b3] font-bold">Loading your report...</p>
      </div>
    );
  }
  const report = interviewReport;

  return (
    <div className="flex-1 bg-gray-50 dark:bg-[#121212] text-gray-900 dark:text-[#ffffff] p-6 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        <header className="mb-8">
          <h1 className="text-2xl font-bold">{report.title} - Interview Report</h1>
          <p className="text-gray-500 dark:text-[#b3b3b3] mt-1 text-sm">Generated specifically for your profile</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-3 space-y-2">
            <div className="bg-white dark:bg-[#181818] rounded-lg p-3 shadow-md dark:shadow-[rgba(0,0,0,0.3)_0px_8px_8px] border border-gray-100 dark:border-none transition-colors duration-300">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-colors ${
                        isActive 
                          ? 'bg-gray-100 dark:bg-[#1f1f1f] text-gray-900 dark:text-[#ffffff] font-bold' 
                          : 'text-gray-500 dark:text-[#b3b3b3] font-normal hover:text-gray-900 dark:hover:text-[#ffffff] hover:bg-gray-100 dark:hover:bg-[#1f1f1f]'
                      }`}
                    >
                      <Icon size={18} className={isActive ? "text-[#1ed760]" : ""} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="bg-white dark:bg-[#181818] rounded-lg p-6 shadow-md dark:shadow-[rgba(0,0,0,0.3)_0px_8px_8px] border border-gray-100 dark:border-none min-h-[600px] transition-colors duration-300">
              
              {activeTab === 'overview' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <section>
                    <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-[#ffffff]">Summary</h2>
                    <p className="text-gray-600 dark:text-[#b3b3b3] text-sm leading-relaxed">{report.summary || "No summary provided."}</p>
                  </section>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-[#1f1f1f] p-5 rounded-lg border-t-2 border-[#1ed760] shadow-sm dark:shadow-none transition-colors duration-300">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 size={16} className="text-[#1ed760]" />
                        <h3 className="text-gray-900 dark:text-[#ffffff] font-bold text-sm">Strengths</h3>
                      </div>
                      <ul className="text-gray-600 dark:text-[#b3b3b3] text-sm space-y-2">
                        {report.strengths?.map((s: string, i: number) => <li key={i} className="flex items-start gap-2"><span className="text-gray-300 dark:text-[#4d4d4d] mt-1">•</span>{s}</li>)}
                      </ul>
                    </div>
                    <div className="bg-gray-50 dark:bg-[#1f1f1f] p-5 rounded-lg border-t-2 border-[#f3727f] shadow-sm dark:shadow-none transition-colors duration-300">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle size={16} className="text-[#f3727f]" />
                        <h3 className="text-gray-900 dark:text-[#ffffff] font-bold text-sm">Weaknesses</h3>
                      </div>
                      <ul className="text-gray-600 dark:text-[#b3b3b3] text-sm space-y-2">
                        {report.weaknesses?.map((w: string, i: number) => <li key={i} className="flex items-start gap-2"><span className="text-gray-300 dark:text-[#4d4d4d] mt-1">•</span>{w}</li>)}
                      </ul>
                    </div>
                  </div>

                  <section>
                    <h3 className="font-bold text-sm mb-3 text-gray-900 dark:text-[#ffffff]">Missing ATS Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {report.missingKeywords?.map((kw: string, i: number) => (
                        <span key={i} className="px-3 py-1.5 bg-gray-100 dark:bg-[#1f1f1f] text-gray-700 dark:text-[#ffffff] text-xs font-bold rounded-full border border-gray-200 dark:border-[#4d4d4d] transition-colors duration-300">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'technical' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-[#ffffff]">Technical Questions</h2>
                  <div className="space-y-4">
                    {report.technicalQuestions?.map((q: any, i: number) => (
                      <div key={i} className="bg-gray-50 dark:bg-[#1f1f1f] p-5 rounded-lg border border-gray-200 dark:border-[#4d4d4d] hover:border-gray-300 dark:hover:border-[#7c7c7c] transition-colors duration-300 shadow-sm dark:shadow-none">
                        <p className="font-bold text-[15px] mb-3 text-gray-900 dark:text-[#ffffff]">{q.question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'behavioral' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-[#ffffff]">Behavioral Questions</h2>
                  <div className="space-y-4">
                    {report.behavioralQuestions?.map((q: any, i: number) => (
                      <div key={i} className="bg-gray-50 dark:bg-[#1f1f1f] p-5 rounded-lg border border-gray-200 dark:border-[#4d4d4d] hover:border-gray-300 dark:hover:border-[#7c7c7c] transition-colors duration-300 shadow-sm dark:shadow-none">
                        <p className="font-bold text-[15px] mb-2 text-gray-900 dark:text-[#ffffff]">{q.question}</p>
                        <p className="text-xs text-gray-500 dark:text-[#b3b3b3] flex items-center gap-2">
                          <Target size={14} className="text-[#1ed760]" />
                          {q.context || "Assessing behavioral skills"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'roadmap' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-[#ffffff]">Preparation Roadmap</h2>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 dark:before:via-[#4d4d4d] before:to-transparent">
                    {report.preparationPlan?.map((step: any, i: number) => (
                      <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#1ed760] bg-white dark:bg-[#121212] text-[#1ed760] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-md dark:shadow-[rgba(0,0,0,0.5)_0px_4px_12px] transition-colors duration-300">
                          <span className="text-sm font-bold">{i + 1}</span>
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-lg border border-gray-200 dark:border-[#4d4d4d] bg-white dark:bg-[#1f1f1f] shadow-md dark:shadow-[rgba(0,0,0,0.3)_0px_8px_8px] hover:border-gray-300 dark:hover:border-[#7c7c7c] transition-colors duration-300">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-[15px] text-gray-900 dark:text-[#ffffff]">{step.topic || "Preparation Step"}</h3>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-[#b3b3b3]">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'resume' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-[#ffffff]">Resume Improvements</h2>
                  <div className="space-y-4">
                    {report.resumeImprovements?.map((imp: any, i: number) => (
                      <div key={i} className="bg-white dark:bg-[#1f1f1f] p-5 rounded-lg border-l-4 border-[#539df5] shadow-sm dark:shadow-[rgba(0,0,0,0.3)_0px_8px_8px] border-y border-r border-gray-100 dark:border-y-0 dark:border-r-0 transition-colors duration-300">
                        <h3 className="text-[11px] uppercase tracking-[2px] text-[#539df5] font-bold mb-2">{imp.section || "General"}</h3>
                        <p className="text-sm text-gray-800 dark:text-[#ffffff] leading-relaxed">{imp.suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-3 space-y-6">
            
            <div className="bg-white dark:bg-[#181818] rounded-lg p-6 shadow-md dark:shadow-[rgba(0,0,0,0.3)_0px_8px_8px] border border-gray-100 dark:border-none flex flex-col items-center text-center transition-colors duration-300">
              <h3 className="text-gray-900 dark:text-[#ffffff] font-bold mb-6 w-full text-left">Overall Scores</h3>
              
              <div className="flex w-full justify-between px-2 mb-8">
                <div className="flex flex-col items-center">
                  <div className="relative w-[88px] h-[88px] flex items-center justify-center rounded-full border-[6px] border-[#1ed760] mb-3 shadow-[0_0_15px_rgba(30,215,96,0.3)] bg-white dark:bg-transparent">
                    <span className="text-2xl font-bold text-gray-900 dark:text-[#ffffff]">{report.matchScore || 0}<span className="text-sm">%</span></span>
                  </div>
                  <span className="text-[11px] text-gray-500 dark:text-[#b3b3b3] uppercase tracking-[1.5px] font-bold">Match Score</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="relative w-[88px] h-[88px] flex items-center justify-center rounded-full border-[6px] border-[#539df5] mb-3 shadow-[0_0_15px_rgba(83,157,245,0.3)] bg-white dark:bg-transparent">
                    <span className="text-2xl font-bold text-gray-900 dark:text-[#ffffff]">{report.atsScore || 0}<span className="text-sm">%</span></span>
                  </div>
                  <span className="text-[11px] text-gray-500 dark:text-[#b3b3b3] uppercase tracking-[1.5px] font-bold">ATS Score</span>
                </div>
              </div>

              <div className="w-full bg-gray-50 dark:bg-[#1f1f1f] rounded-lg p-4 flex items-center gap-3 border border-gray-200 dark:border-[#4d4d4d] transition-colors duration-300">
                <div className="p-2 bg-white dark:bg-[#121212] rounded-full border border-gray-200 dark:border-none shadow-sm dark:shadow-none">
                  <Clock size={18} className="text-[#1ed760]" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 dark:text-[#b3b3b3] uppercase tracking-wider font-bold mb-0.5">Est. Prep Time</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-[#ffffff]">{report.estimatedPreparationTime || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#181818] rounded-lg p-6 shadow-md dark:shadow-[rgba(0,0,0,0.3)_0px_8px_8px] border border-gray-100 dark:border-none transition-colors duration-300">
              <div className="flex items-center gap-2 mb-5">
                <Award size={18} className="text-[#ffa42b]" />
                <h3 className="text-gray-900 dark:text-[#ffffff] font-bold">Skill Gaps</h3>
              </div>
              
              <div className="space-y-4">
                {report.skillGaps?.map((gap: any, i: number) => (
                  <div key={i} className="border-b border-gray-200 dark:border-[#4d4d4d] pb-4 last:border-0 last:pb-0 transition-colors duration-300">
                    <h4 className="text-[14px] font-bold text-gray-900 dark:text-[#ffffff] mb-1.5">{gap.skill || "Unknown"}</h4>
                    <p className="text-xs text-gray-600 dark:text-[#b3b3b3] leading-relaxed">{gap.description || ""}</p>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
}