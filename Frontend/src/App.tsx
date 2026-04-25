import { BrowserRouter } from "react-router";
import { AppRoutes } from "./app.routes";
import { useLoadUser } from "./hooks/useLoadUser";
import { useAuth } from "./context/AuthContext";

function AppContent() {
  useLoadUser(); //this will load the user data in user context on reload
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#121212]">
        <div className="w-8 h-8 border-4 border-[#1ed760] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function App() {
  return <AppContent />;
}

export default App;
