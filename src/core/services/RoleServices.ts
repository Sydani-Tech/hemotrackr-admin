import { authInstance } from "../api/apiInstances";

export class BloodBankAPI {
  static async getDashboardStats() {
    return authInstance.get("/blood-banks/dashboard/stats");
  }
  // Add other blood bank specific methods here
}

export class DonorAPI {
  static async getDashboardStats() {
    return authInstance.get("/donors/dashboard/stats");
  }
  // Add other donor specific methods here
}

export class HospitalAPI {
  static async getDashboardStats() {
    return authInstance.get("/facilities/dashboard/stats");
  }
  // Add other hospital specific methods here
}

export class RegulatoryBodyAPI {
  static async getDashboardStats() {
    return authInstance.get("/admin/dashboard/stats");
  }
  // Add other regulatory body specific methods here
}
