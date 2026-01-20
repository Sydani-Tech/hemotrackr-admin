import { authInstance } from "../api/apiInstances";

export class HospitalAPI {
  static async getDashboardStats() {
    return authInstance.get("/facilities/dashboard/stats");
  }

  static async getProfile() {
      return authInstance.get("/facilities/profile");
  }
}
