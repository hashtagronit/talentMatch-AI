import { Routes, Route } from "react-router";
import SignIn from "./features/auth/pages/signIn";
import SignUp from "./features/auth/pages/signUp";
import Landing from "./features/landing/pages/Landing";
import GenerateReport from "./features/interview/pages/GenerateReport";
import InterviewReport from "./features/interview/pages/interviewReport";
import Dashboard from "./features/dashboard/pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { MainLayout } from "./components/layout/MainLayout";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Landing />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/generate-report" element={<GenerateReport />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report/:id" element={<InterviewReport />} />
        </Route>
      </Route>

      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  );
}
