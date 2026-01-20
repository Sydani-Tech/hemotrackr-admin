import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../services/AuthService";
import { useAuth } from "../provider/AuthProvider";
import { toast } from "react-toastify";

export const useLogin = () => {
    const { setAuthData } = useAuth();
    
    return useMutation({
        mutationFn: AuthService.login,
        onSuccess: (data) => {
            setAuthData(data);
            toast.success("Login successful!");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
        }
    });
};

export const useLogout = () => {
    const { logout: contextLogout } = useAuth();
    
    return useMutation({
        mutationFn: AuthService.logout,
        onSuccess: () => {
             contextLogout();
             toast.success("Logged out successfully");
        },
        onError: (error: any) => {
            console.error("Logout error", error);
            // Even if server logout fails, we should clear local state
            contextLogout();
            toast.error("Logged out (Server offline)");
        }
    });
};
