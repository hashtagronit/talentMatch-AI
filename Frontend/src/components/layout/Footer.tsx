

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-[#272727] bg-white dark:bg-[#121212] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-gray-500 dark:text-[#b3b3b3]">
          &copy; {new Date().getFullYear()} TalentMatchAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
