import { authInstance } from "../api/apiInstances";

export interface InventoryAlert {
    id: number;
    organization_id: number;
    inventory_item_id: number;
    alert_type: "low_stock" | "expiring_soon" | "expired" | "critical_shortage" | "out_of_stock";
    severity: "info" | "warning" | "critical";
    title: string;
    message: string;
    is_read: boolean;
    is_acknowledged: boolean;
    created_at: string;
    inventory_item?: {
        id: number;
        blood_group: string;
        type: string;
    };
}

export interface AlertSummary {
    total: number;
    critical: number;
    warning: number;
    info: number;
}

export const AlertService = {
    /**
     * Get all alerts
     */
    getAlerts: async (params?: {
        is_read?: boolean;
        is_acknowledged?: boolean;
        severity?: string;
        per_page?: number;
    }) => {
        const response = await authInstance.get("/blood-bank/inventory-alerts", { params });
        return response.data;
    },

    /**
     * Get alerts summary (counts per severity)
     */
    getSummary: async () => {
        const response = await authInstance.get("/blood-bank/inventory-alerts/summary");
        return response.data;
    },

    /**
     * Get unread alert count
     */
    getUnreadCount: async () => {
        const response = await authInstance.get("/blood-bank/inventory-alerts/unread-count");
        return response.data;
    },

    /**
     * Mark alert as read
     */
    markAsRead: async (id: number) => {
        const response = await authInstance.patch(`/blood-bank/inventory-alerts/${id}/read`);
        return response.data;
    },

    /**
     * Mark all alerts as read
     */
    markAllAsRead: async () => {
        const response = await authInstance.post("/blood-bank/inventory-alerts/mark-all-read");
        return response.data;
    },

    /**
     * Acknowledge alert
     */
    acknowledge: async (id: number, notes?: string) => {
        const response = await authInstance.post(`/blood-bank/inventory-alerts/${id}/acknowledge`, {
            notes,
        });
        return response.data;
    },

    /**
     * Manually check for new alerts
     */
    checkAlerts: async () => {
        const response = await authInstance.post("/blood-bank/inventory-alerts/check");
        return response.data;
    },
};
