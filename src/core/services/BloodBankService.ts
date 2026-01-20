import { authInstance } from "../api/apiInstances";

export class BloodBankAPI {
  static async getDashboardStats() {
    return authInstance.get("/blood-bank/dashboard");
  }
}
