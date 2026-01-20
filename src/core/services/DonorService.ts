import { authInstance } from "../api/apiInstances";

export class DonorAPI {
  static async getDashboardStats() {
    return authInstance.get("/donors/dashboard/stats");
  }

  static async getProfile() {
      return authInstance.get("/donors/profile");
  }
}
