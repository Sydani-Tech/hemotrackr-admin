import { authInstance } from "../api/apiInstances";

export class AdminAPI {
  static async getDashboardStats() {
    return authInstance.get("/admin/dashboard/stats");
  }

  static async getProfile() {
      return authInstance.get("/admin/profile");
  }
}
