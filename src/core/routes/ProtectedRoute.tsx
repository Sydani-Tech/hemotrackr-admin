import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import type { UserRole } from "../types/user";

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { role, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>; // Replace with a proper loading spinner

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (role && !allowedRoles.includes(role)) {
    // User requested strict redirect to login if unauthorized for a route
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};
