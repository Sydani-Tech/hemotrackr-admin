import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useMemo,
} from "react";
import type { User, UserRole } from "../types/user";
import { AuthService, type LoginResponse } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  logout: () => void;
  setAuthData: (data: LoginResponse) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      const storedRole = localStorage.getItem("role") as UserRole | null;

      if (storedToken && storedUser && storedRole) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setRole(storedRole);
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (data: any) => {
    setIsLoading(true);
    try {
      const response: LoginResponse = await AuthService.login(data);

      const { user: responseUser, token: responseToken } = response;

      // Extract role from the user object as per updated requirement
      const responseRole = responseUser.role;
      console.log("AuthProvider: Login success", {
        responseRole,
        responseUser,
      });

      // Ensure token exists before proceeding (since it's now optional in interface)
      if (!responseToken) {
        throw new Error("No token received from login");
      }

      setToken(responseToken);
      setUser(responseUser);
      setRole(responseRole);

      localStorage.setItem("token", responseToken);
      localStorage.setItem("user", JSON.stringify(responseUser));
      localStorage.setItem("role", responseRole);

      handleNavigation(responseRole);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = (role: UserRole) => {
    console.log(
      "AuthProvider: State updated, navigating based on role...",
      role,
    );

    // Redirect based on role
    switch (role) {
      case "blood_banks":
        navigate("/blood-bank/dashboard");
        break;
      case "donor":
        navigate("/donor/dashboard");
        break;
      case "facilities":
        navigate("/hospital/dashboard");
        break;
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "regulatory_body":
        navigate("/regulation/dashboard");
        break;
      default:
        console.warn("AuthProvider: Unknown role, navigating to /");
        navigate("/");
        break;
    }
  };


  /* New method to set auth data from external sources (like React Query mutation) */
  const setAuthData = (data: LoginResponse) => {
    const { user: responseUser, token: responseToken } = data;

    // Extract role from the user object
    const responseRole = responseUser.role;

    // Ensure token exists
    if (!responseToken) {
      console.error("No token provided in setAuthData");
      return;
    }

    setToken(responseToken);
    setUser(responseUser);
    setRole(responseRole);

    localStorage.setItem("token", responseToken);
    localStorage.setItem("user", JSON.stringify(responseUser));
    localStorage.setItem("role", responseRole);

    // Trigger navigation
    handleNavigation(responseRole);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/auth/login");
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      user,
      token,
      role,
      isAuthenticated: !!token,
      isLoading,
      login,
      logout,
      setAuthData,
    }),
    [user, token, role, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
