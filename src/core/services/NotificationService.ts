import { authInstance } from "../api/apiInstances";

export class NotificationAPI {
    /**
     * Get all notifications (paginated)
     */
    static async getNotifications(params?: { page?: number; per_page?: number }) {
        return authInstance.get("/notifications", { params });
    }

    /**
     * Get unread notifications only
     */
    static async getUnreadNotifications(params?: { page?: number; per_page?: number }) {
        return authInstance.get("/notifications/unread", { params });
    }

    /**
     * Get unread notification count
     */
    static async getUnreadCount() {
        return authInstance.get("/notifications/unread-count");
    }

    /**
     * Mark a notification as read
     */
    static async markAsRead(id: string) {
        return authInstance.post(`/notifications/${id}/mark-read`);
    }

    /**
     * Mark all notifications as read
     */
    static async markAllAsRead() {
        return authInstance.post("/notifications/mark-all-read");
    }

    /**
     * Delete a notification
     */
    static async deleteNotification(id: string) {
        return authInstance.delete(`/notifications/${id}`);
    }
}
