import React, { useState } from 'react';
import { UploadCloud, FileText, Award, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useGenerateInterviewReport } from '@/hooks/useGenerateInterviewReport';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

export default function GenerateReport() {
  const [jobDescription, setJobDescription] = useState('');
  const [selfDescription, setSelfDescription] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  
  const { handleGenerateReport, loading } = useGenerateInterviewReport();
  const navigate = useNavigate();

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setResumeFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  const isFormValid = jobDescription.trim().length > 0 && (selfDescription.trim().length > 0 || resumeFile !== null);

  const onSubmit = async () => {
    if (!isFormValid) return;
    try {
      setError('');
      const data = await handleGenerateReport(jobDescription, resumeFile, selfDescription);
      if (data?.interviewReport?._id) {
        toast.success("Report generated successfully!");
        navigate(`/report/${data.interviewReport._id}`);
      } else {
        setError("Failed to generate report. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-[#121212] text-gray-900 dark:text-[#ffffff] font-sans selection:bg-[#1ed760] selection:text-black transition-colors duration-300 p-6 flex flex-col min-h-0">
      
    
      <div className="max-w-6xl mx-auto w-full h-full flex flex-col pb-6 relative z-20">
         
         <div className="mb-6 shrink-0 text-center md:text-left">
           <h1 className="text-2xl font-bold">Generate Interview Plan</h1>
           <p className="text-gray-500 dark:text-[#b3b3b3] mt-1 text-sm">
             Provide the target job description and your profile details to get started.
           </p>
         </div>

    
         <div className="bg-white dark:bg-[#181818] rounded-2xl shadow-md dark:shadow-[rgba(0,0,0,0.3)_0px_8px_8px] border border-gray-200 dark:border-[#272727] p-5 md:p-8 transition-colors duration-300 flex-1 flex flex-col min-h-0">
            
            {error && (
               <div className="mb-6 p-4 text-sm font-medium text-[#f3727f] bg-[#f3727f]/10 border border-[#f3727f]/30 rounded-xl flex items-center justify-between animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-3">
                     {error}
                  </div>
                  <button onClick={() => setError('')} className="text-[#f3727f] hover:text-red-500 font-bold uppercase tracking-widest text-[10px] transition-colors">
                     Dismiss
                  </button>
               </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 flex-1 min-h-0">
               
               <div className="space-y-4 flex flex-col h-full">
                  <div className="flex items-center justify-between shrink-0">
                     <h3 className="text-lg font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                        <div className="p-1.5 bg-gray-100 dark:bg-[#1f1f1f] rounded-lg">
                           <FileText size={18} className="text-[#1ed760]" />
                        </div>
                        Target Job
                     </h3>
                     <span className="text-[10px] font-bold text-[#f3727f] bg-[#f3727f]/10 px-3 py-1 rounded-full uppercase tracking-widest">
                        * Required
                     </span>
                  </div>
                  <textarea 
                     value={jobDescription}
                     onChange={(e) => setJobDescription(e.target.value)}
                     placeholder="Paste the full job description here. Include requirements, responsibilities, and qualifications..."
                     className="w-full flex-1 resize-none bg-gray-50 dark:bg-[#1f1f1f] text-gray-900 dark:text-[#ffffff] text-sm leading-relaxed rounded-xl p-5 border border-gray-200 dark:border-[#4d4d4d] focus:outline-none hover:border-gray-300 dark:hover:border-[#7c7c7c] focus:border-gray-900 dark:focus:border-[#7c7c7c] placeholder:text-gray-400 dark:placeholder:text-[#7c7c7c] transition-all duration-300 shadow-inner min-h-[200px]"
                  />
               </div>


               <div className="space-y-4 h-full flex flex-col">
                  <h3 className="text-lg font-bold flex items-center gap-3 text-gray-900 dark:text-white shrink-0">
                     <div className="p-1.5 bg-gray-100 dark:bg-[#1f1f1f] rounded-lg">
                        <Award size={18} className="text-[#1ed760]" />
                     </div>
                     Your Profile
                  </h3>
                  
                  <div className="flex-1 flex flex-col gap-4 min-h-0">
                     <div 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleFileDrop}
                        className="bg-gray-50 dark:bg-[#1f1f1f] border-2 border-dashed border-gray-300 dark:border-[#4d4d4d] rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-100 dark:hover:bg-[#252525] transition-all duration-300 cursor-pointer group relative overflow-hidden shrink-0 min-h-[160px]"
                     >
                        <input 
                           type="file" 
                           accept=".pdf,.doc,.docx" 
                           onChange={handleFileInput}
                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                           title="Upload Resume"
                        />
                        {resumeFile ? (
                           <div className="flex flex-col items-center gap-2 relative z-10 animate-in zoom-in duration-300">
                              <div className="p-2 bg-[#1ed760]/10 rounded-full">
                                 <CheckCircle2 size={24} className="text-[#1ed760]" />
                              </div>
                              <span className="text-sm font-bold text-gray-900 dark:text-[#ffffff] truncate max-w-[250px]">
                                 {resumeFile.name}
                              </span>
                              <button 
                                 onClick={(e) => { e.preventDefault(); e.stopPropagation(); setResumeFile(null); }}
                                 className="text-[10px] text-[#f3727f] hover:text-red-500 mt-1 relative z-30 uppercase tracking-widest font-bold transition-colors"
                              >
                                 Remove file
                              </button>
                           </div>
                        ) : (
                           <>
                              <UploadCloud size={28} className="text-gray-400 dark:text-[#7c7c7c] mb-3 group-hover:text-gray-600 dark:group-hover:text-white transition-colors group-hover:scale-110 duration-300" />
                              <p className="text-sm text-gray-900 dark:text-[#ffffff] font-bold mb-1">
                                 Click or drag your resume
                              </p>
                              <p className="text-[10px] text-gray-500 dark:text-[#b3b3b3] uppercase tracking-wider font-bold">
                                 PDF, DOCX up to 5MB
                              </p>
                           </>
                        )}
                     </div>

                     <div className="flex items-center gap-4 shrink-0">
                        <hr className="flex-1 border-gray-200 dark:border-[#4d4d4d]" />
                        <span className="text-[10px] font-bold uppercase tracking-[2px] text-gray-400 dark:text-[#7c7c7c]">Or use text</span>
                        <hr className="flex-1 border-gray-200 dark:border-[#4d4d4d]" />
                     </div>
  
                     <div className="flex-1 min-h-[120px]">
                        <textarea 
                           value={selfDescription}
                           onChange={(e) => setSelfDescription(e.target.value)}
                           placeholder="Briefly describe your skills, experience, and background here..."
                           className="w-full h-full resize-none bg-gray-50 dark:bg-[#1f1f1f] text-gray-900 dark:text-[#ffffff] text-sm leading-relaxed rounded-xl p-5 border border-gray-200 dark:border-[#4d4d4d] focus:outline-none hover:border-gray-300 dark:hover:border-[#7c7c7c] focus:border-gray-900 dark:focus:border-[#7c7c7c] placeholder:text-gray-400 dark:placeholder:text-[#7c7c7c] transition-all duration-300 shadow-inner"
                        />
                     </div>
                  </div>
               </div>

            </div>

            <div className="mt-8 flex flex-col items-center border-t border-gray-100 dark:border-[#272727] pt-6 shrink-0">
               <Button 
                  disabled={!isFormValid || loading}
                  onClick={onSubmit}
                  className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-[#1ed760] hover:bg-[#1db954] text-black font-bold uppercase tracking-[2px] px-12 h-14 text-[13px] shadow-[0px_8px_24px_rgba(30,215,96,0.25)] disabled:opacity-50 disabled:shadow-none transition-all duration-300 dark:bg-[#1ed760] dark:text-black dark:hover:bg-[#1db954]"
               >
                  <span className="relative z-10 flex items-center gap-3">
                     {loading ? (
                       <>
                         <Loader2 size={18} className="animate-spin" />
                         Analyzing...
                       </>
                     ) : (
                       <>
                         Generate Match Report 
                         <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                       </>
                     )}
                  </span>
               </Button>
            </div>

         </div>
      </div>
    </div>
  );
}
