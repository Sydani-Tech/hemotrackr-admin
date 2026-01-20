import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export const PublicRoute = () => {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (isAuthenticated && role) {
    // If authenticated, redirect to their dashboard
    const normalizedRole = role ? role.toLowerCase() : "";
    console.log("PublicRoute Redirect Check:", { role, normalizedRole });

    switch (normalizedRole) {
      case "blood_banks":
      case "blood_bank": // Handle potential singular/plural mismatch
        return <Navigate to="/blood-bank/dashboard" replace />;
      case "donor":
      case "donors":
        return <Navigate to="/donor/dashboard" replace />;
      case "facilities":
      case "facility":
      case "hospital": // Handle potential alias
        return <Navigate to="/hospital/dashboard" replace />;
      case "admin":
      case "regulatory":
        return <Navigate to="/regulation/dashboard" replace />;
      default:
        // If role is unknown/invalid, we shouldn't redirect to "/" which might redirect back here.
        // Safest option is to let them see the content (which is the Login page)
        // OR explicitly logout them out so they can fix it.
        return <Outlet />;
    }
  }

  return <Outlet />;
};
