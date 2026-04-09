//if user is not authenticated then redirect to login page, this will protect the private routes
import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
        </div>
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}