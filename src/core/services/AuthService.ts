import { unAuthInstance, authInstance } from "../api/apiInstances";
import type { User, UserRole } from "../types/user";

export interface LoginResponse {
  message: string;
  user: User;
  token?: string;
  role: UserRole;
  token_type: string;
}

export class AuthService {
  static async login(data: any): Promise<LoginResponse> {
    // The user mentioned the login endpoint is /auth/login, but also gave examples of /admins/auth/login
    // effectively suggesting path based on role or context. 
    // However, usually login happens before we know the role if it's a unified portal.
    // If the input `data` contains role information or if we are using separate login pages
    // we might need to route to different endpoints.
    
    // For now, I'll implement a generic login that defaults to /auth/login
    // If the UI passes a role hint, we could switch endpoints.
    // Given the prompt: "use the login page to handle the login... create files that will handle calls for each user type"
    // and "create authenticated and unauthenticated instances... class AuthAPI... login"
    
    // I will use a default endpoint but allow overriding if specific logic is needed later.
    // Based on standard Laravel/API structures, it might be /auth/login for all or specific.
    // I will try the generic one first.
    
    try {
        const response = await unAuthInstance.post("/auth/login", data);
        return response.data;
    } catch (error) {
        throw error;
    }
  }

  static async logout() {
    try {
      const response = await authInstance.post("/auth/logout");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
