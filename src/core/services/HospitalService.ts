import { authInstance } from "../api/apiInstances";

export class HospitalAPI {
  /**
   * Get dashboard data for hospital
   */
  static async getDashboard() {
    return authInstance.get("/facilities/dashboard");
  }

  /**
   * Get request history with optional filters
   */
  static async getRequestHistory(params?: {
    status?: string;
    blood_group?: string;
    from_date?: string;
    to_date?: string;
    urgency_level?: string;
    page?: number;
    per_page?: number;
  }) {
    return authInstance.get("/facilities/request-history", { params });
  }

  /**
   * Get reports overview
   */
  static async getReports(year?: number) {
    return authInstance.get("/facilities/reports", {
      params: { year: year || new Date().getFullYear() },
    });
  }

  /**
   * Search available blood inventory across blood banks
   */
  static async searchInventory(params?: {
    blood_group?: string;
    type?: string;
    min_units?: number;
  }) {
    return authInstance.get("/facilities/inventory-search", { params });
  }

  /**
   * Get facility staff members
   */
  static async getStaff() {
    return authInstance.get("/facilities/users");
  }

  /**
   * Add new staff member
   */
  static async addStaff(data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
  }) {
    return authInstance.post("/facilities/users", data);
  }

  /**
   * Update staff member
   */
  static async updateStaff(id: number, data: any) {
    return authInstance.put(`/facilities/users/${id}`, data);
  }

  /**
   * Delete staff member
   */
  static async deleteStaff(id: number) {
    return authInstance.delete(`/facilities/users/${id}`);
  }

  /**
   * Get facility profile
   */
  static async getProfile() {
    return authInstance.get("/facilities/profile");
  }

  /**
   * Update facility profile
   */
  static async updateProfile(data: any) {
    return authInstance.put("/facilities/profile", data);
  }

  /**
   * Upload facility logo
   */
  static async uploadLogo(file: File) {
    const formData = new FormData();
    formData.append("logo", file);
    return authInstance.post("/facilities/upload-logo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  /**
   * Upload facility cover photo
   */
  static async uploadCoverPhoto(file: File) {
    const formData = new FormData();
    formData.append("cover_photo", file);
    return authInstance.post("/facilities/upload-cover-photo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  // =========================================================================
  // Blood Request Management
  // =========================================================================

  /**
   * Get all blood requests created by this hospital
   */
  static async getMyRequests(params?: {
    status?: string;
    blood_group?: string;
    type?: string;
    page?: number;
    per_page?: number;
  }) {
    return authInstance.get("/blood-requests/my-created-request", { params });
  }

  /**
   * Cancel a blood request
   */
  static async cancelRequest(id: number) {
    return authInstance.post(`/blood-requests/${id}/cancel`);
  }

  /**
   * Get offers from blood banks for a specific request
   */
  static async getOffersForRequest(requestId: number) {
    return authInstance.get(`/facilities/blood-requests/${requestId}/offers`);
  }

  /**
   * Accept an offer from a blood bank
   */
  static async acceptOffer(offerId: number) {
    return authInstance.post(`/facilities/offers/${offerId}/accept`);
  }

  /**
   * Reject an offer from a blood bank
   */
  static async rejectOffer(offerId: number) {
    return authInstance.post(`/facilities/offers/${offerId}/reject`);
  }
}

