import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Sun, Moon, LogOut, LayoutDashboard, User } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@/hooks/useLogout";
import { Button } from "@/components/ui/button";
import { useInterviewContext } from "@/context/InterviewContext";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, loading, setUser } = useAuth();
  const { handleLogout } = useLogout();
  const { setAllReports, setInterviewReport } = useInterviewContext();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onLogout = async () => {
    setUser(null);
    setAllReports([]);
    setInterviewReport(null);
    await handleLogout();
    setDropdownOpen(false);
    navigate("/login",{ replace: true });
  };

  if (loading) {
    return (
      <div className="h-16 border-b dark:bg-[#121212]" />
    );
  }

  return (
    <nav className="border-b border-gray-200 dark:border-[#272727] bg-white dark:bg-[#121212] transition-colors duration-300 z-50 relative">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#1ed760] flex items-center justify-center">
            <span className="text-black font-extrabold text-sm">TM</span>
          </div>
          <span className="font-bold text-lg text-gray-900 dark:text-white tracking-tight">
            TalentMatch<span className="text-[#1ed760]">AI</span>
          </span>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1f1f1f] text-gray-600 dark:text-[#b3b3b3] transition-colors"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {!isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-600 dark:text-[#b3b3b3] hover:text-gray-900 dark:hover:text-white">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-[#1ed760] hover:bg-[#1db954] text-black font-bold uppercase tracking-wider text-xs px-6 rounded-full shadow-md shadow-[#1ed760]/20">
                  Sign up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#1f1f1f] border-2 border-transparent hover:border-[#1ed760] transition-colors flex items-center justify-center overflow-hidden"
              >
                <span className="font-bold text-gray-700 dark:text-[#ffffff] uppercase">
                  {user?.username ? user.username.charAt(0) : <User size={18} />}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#272727] rounded-xl shadow-lg dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)] py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-[#272727] mb-2">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.username}</p>
                    <p className="text-xs text-gray-500 dark:text-[#b3b3b3] truncate">{user?.email}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-[#b3b3b3] hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1f1f1f] transition-colors"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#f3727f] hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
