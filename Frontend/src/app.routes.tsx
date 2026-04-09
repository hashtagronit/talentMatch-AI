import { Routes, Route } from "react-router";
import SignIn from "./features/pages/signIn";
import SignUp from "./features/pages/signUp";
import { Homepage } from "./features/pages/homepage";
import { ProtectedRoute } from "./components/ProtectedRoute";

export function AppRoutes() {
  return (
    <Routes>
      {/*Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Homepage />} />
      </Route>

      {/*Public Routes */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  );
}
