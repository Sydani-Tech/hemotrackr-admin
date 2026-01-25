import { authInstance } from "../api/apiInstances";

export interface DonorDashboardData {
  donor: {
    id: number;
    name: string;
    blood_group: string;
    status: string;
  };
  stats: {
    total_donations: number;
    total_units_donated: number;
    total_badges: number;
    total_points: number;
    global_donations_count: number;
  };
  eligibility: {
    is_eligible: boolean;
    next_eligible_date: string | null;
  };
  recent_donations: any[];
  upcoming_appointments: any[];
  badges: any[];
  quick_actions: {
    title: string;
    icon: string;
    route: string;
  }[];
}

export interface Notification {
  id: string;
  type: string;
  data: {
    message: string;
    title?: string;
    action_url?: string;
  };
  read_at: string | null;
  created_at: string;
}


export interface BloodRequest {
  id: number;
  organization: {
    id: number;
    name: string;
  };
  blood_group: string;
  units_needed: number;
  is_emergency: boolean;
  status: string;
  created_at: string;
}

export interface UserRequest {
  id: number;
  blood_request: BloodRequest;
  request_source: string;
  is_read: boolean;
  created_at: string;
}

export class DonorAPI {
  static async getDashboardStats() {
    return authInstance.get<DonorDashboardData>("/donor/dashboard");
  }

  static async getProfile() {
    return authInstance.get("/auth/profile");
  }

  static async getNotifications() {
    return authInstance.get("/notifications");
  }

  static async markNotificationAsRead(id: string) {
    return authInstance.post(`/notifications/${id}/mark-read`);
  }

  static async updateProfile(data: FormData | any) {
    return authInstance.post("/auth/profile?_method=PUT", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async getUserRequests() {
    return authInstance.get("/user-requests");
  }

  static async getBloodBanks(params?: any) {
    return authInstance.get("/donor/blood-banks", { params });
  }

  static async getNearbyBloodBanks(latitude: number, longitude: number, radius?: number) {
    return authInstance.get("/donor/blood-banks/nearby", {
      params: { latitude, longitude, radius }
    });
  }

  static async getBloodBankDetails(id: string | number) {
    return authInstance.get(`/organizations/${id}`);
  }

  static async createAppointment(data: any) {
    return authInstance.post("/donor/appointments", data);
  }
}
