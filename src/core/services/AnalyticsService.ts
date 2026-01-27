import { authInstance } from "../api/apiInstances";

export interface AnalyticsSummary {
    total_units: number;
    total_items: number;
    low_stock_count: number;
    out_of_stock_count: number;
    expiring_soon_count: number;
}

export interface BloodGroupData {
    blood_group: string;
    total_units: number;
}

export interface TypeData {
    type: string;
    total_units: number;
}

export interface ExpiryTimeline {
    expired: number;
    within_7_days: number;
    within_14_days: number;
    within_30_days: number;
    beyond_30_days: number;
    no_expiry: number;
}

export interface AlertsSummary {
    critical: number;
    warnings: number;
    info: number;
    total: number;
}

export const AnalyticsService = {
    /**
     * Get summary statistics
     */
    getSummary: async (): Promise<AnalyticsSummary> => {
        const response = await authInstance.get("/blood-bank/analytics/summary");
        return response.data;
    },

    /**
     * Get breakdown by blood group
     */
    getByBloodGroup: async (): Promise<{ data: BloodGroupData[] }> => {
        const response = await authInstance.get("/blood-bank/analytics/by-blood-group");
        return response.data;
    },

    /**
     * Get breakdown by type
     */
    getByType: async (): Promise<{ data: TypeData[] }> => {
        const response = await authInstance.get("/blood-bank/analytics/by-type");
        return response.data;
    },

    /**
     * Get expiry timeline
     */
    getExpiryTimeline: async (): Promise<ExpiryTimeline> => {
        const response = await authInstance.get("/blood-bank/analytics/expiry-timeline");
        return response.data;
    },

    /**
     * Get alerts summary
     */
    getAlertsSummary: async (): Promise<AlertsSummary> => {
        const response = await authInstance.get("/blood-bank/analytics/alerts-summary");
        return response.data;
    },

    /**
     * Get stock history (7 days)
     */
    getStockHistory: async () => {
        const response = await authInstance.get("/blood-bank/analytics/stock-history");
        return response.data;
    },
};
