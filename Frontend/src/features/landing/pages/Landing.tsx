
import { Sparkles, Target, Zap, Map as MapIcon, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router';

export default function Landing() {
  return (
    <div className="w-full">
      <div className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 flex-1 flex flex-col justify-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#1ed760] opacity-10 dark:opacity-[0.06] blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#272727] shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <Sparkles size={16} className="text-[#1ed760]" />
               <span className="text-[11px] font-bold uppercase tracking-[2px] text-gray-600 dark:text-[#b3b3b3]">TalentMatchAI</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700">
              Optimize your resume for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1ed760] to-[#10b981]">ATS</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-[#b3b3b3] mb-12 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              Paste a job description and your resume. Our AI instantly reveals missing keywords, skill gaps, and generates a custom interview preparation roadmap.
            </p>

            <div className="flex justify-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
              <Link to="/generate-report">
                <Button 
                  className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-[#1ed760] hover:bg-[#1db954] text-black font-bold uppercase tracking-[2px] px-12 h-14 text-[13px] shadow-[0px_8px_24px_rgba(30,215,96,0.25)] transition-all duration-300 dark:bg-[#1ed760] dark:text-black dark:hover:bg-[#1db954]"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Start Generating Report
                    <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#181818] border-t border-gray-200 dark:border-[#272727] py-24 transition-colors duration-300">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How TalentMatchAI Helps You Win</h2>
               <p className="text-gray-600 dark:text-[#b3b3b3] max-w-2xl mx-auto">Stop guessing what recruiters want. Use data-driven insights to prepare for your next big opportunity.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
               
               <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#539df5]/10 flex items-center justify-center mb-2">
                     <Target size={32} className="text-[#539df5]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Bypass the ATS</h3>
                  <p className="text-gray-600 dark:text-[#b3b3b3] leading-relaxed text-[15px]">
                     Discover exactly which keywords your resume is missing before you submit your application.
                  </p>
               </div>

               <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#ffa42b]/10 flex items-center justify-center mb-2">
                     <Zap size={32} className="text-[#ffa42b]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Interview Prep</h3>
                  <p className="text-gray-600 dark:text-[#b3b3b3] leading-relaxed text-[15px]">
                     Get a customized list of technical & behavioral questions tailored to the specific job description.
                  </p>
               </div>

               <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#1ed760]/10 flex items-center justify-center mb-2">
                     <MapIcon size={32} className="text-[#1ed760]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Custom Roadmap</h3>
                  <p className="text-gray-600 dark:text-[#b3b3b3] leading-relaxed text-[15px]">
                     Receive a step-by-step preparation plan to bridge your skill gaps and ace the final interview.
                  </p>
               </div>

            </div>
         </div>
      </div>
    </div>
  );
}
