
import { authInstance } from "../api/apiInstances";

export interface BloodBankDashboardData {
  stats: {
    total_stock: number;
    out_of_stock: number;
    incoming_stock: number;
    pending_requests: number;
    accepted_requests: number;
  };
  recent_requests: any[];
  recent_deliveries: any[];
  quick_actions: {
    title: string;
    icon: string;
    route: string;
    count?: number;
  }[];
}

export class BloodBankAPI {
  static async getDashboardStats() {
    return authInstance.get<BloodBankDashboardData>("/blood-bank/dashboard");
  }

  static async acceptRequest(id: number) {
    return authInstance.post(`/blood-bank/requests/${id}/accept`);
  }

  static async createRequest(data: any) {
    return authInstance.post("/blood-requests", data);
  }

  static async getMyRequests(page = 1) {
    return authInstance.get(`/blood-requests/my-created-request?page=${page}`);
  }

  static async cancelRequest(id: string | number) {
    return authInstance.post(`/blood-requests/${id}/cancel`);
  }

  static async getAppointments(params?: any) {
    return authInstance.get("/blood-bank/appointments", { params });
  }

  static async updateAppointmentStatus(id: string | number, status: string, cancellation_reason?: string) {
    return authInstance.patch(`/blood-bank/appointments/${id}`, {
      status,
      ...(cancellation_reason && { cancellation_reason })
    });
  }

  static async updateDeliveryStatus(id: string | number, status: string) {
    return authInstance.post(`/blood-bank/deliveries/${id}/status`, { status });
  }

  static async getProfile() {
    return authInstance.get("/auth/profile");
  }

  static async updateProfile(data: any) {
    return authInstance.put("/blood-bank/profile", data);
  }

  static async uploadLogo(file: File) {
    const formData = new FormData();
    formData.append("logo", file);
    return authInstance.post("/blood-bank/upload-logo", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  }

  static async uploadCoverPhoto(file: File) {
    const formData = new FormData();
    formData.append("cover_photo", file);
    return authInstance.post("/blood-bank/upload-cover-photo", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  }

  static async getDonations(params?: any) {
    return authInstance.get("/blood-bank/donations", { params });
  }

  static async getNotifications(params?: any) {
    return authInstance.get("/notifications", { params });
  }

  static async markNotificationAsRead(id: string | number) {
    return authInstance.post(`/notifications/${id}/mark-read`);
  }

  static async markAllNotificationsAsRead() {
    return authInstance.post("/notifications/mark-all-read");
  }

  static async deleteNotification(id: string | number) {
    return authInstance.delete(`/notifications/${id}`);
  }

  static async getUnreadMessagesCount() {
    return authInstance.get("/messages/unread-count");
  }

  static async getDonor(id: string | number) {
    return authInstance.get(`/blood-bank/donors/${id}`);
  }

  static async updateDonorHealth(id: string | number, data: any) {
    return authInstance.put(`/blood-bank/donors/${id}/health`, data);
  }

  static async getRequests(params?: any) {
    return authInstance.get("/blood-bank/requests", { params });
  }

  static async recordDonation(appointmentId: string | number, data: any) {
    return authInstance.post(`/blood-bank/appointments/${appointmentId}/record-donation`, data);
  }

  static async getSettings() {
    return authInstance.get("/blood-bank/settings");
  }

  static async updateSettings(data: any) {
    return authInstance.put("/blood-bank/settings", data);
  }
}
