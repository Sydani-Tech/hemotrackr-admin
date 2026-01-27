import { authInstance } from "../api/apiInstances";
import { type InventoryItem } from "./InventoryService";

export interface ComponentConfig {
    type: "RBC" | "Plasma" | "Platelets" | "Cryo";
    units: number;
}

export interface SeparationResponse {
    message: string;
    components: InventoryItem[];
    parent: InventoryItem;
}

export const AdvancedInventoryService = {
    /**
     * Separate whole blood into components
     */
    separateComponents: async (
        itemId: number,
        components: ComponentConfig[]
    ): Promise<SeparationResponse> => {
        const response = await authInstance.post(`/blood-bank/inventory/${itemId}/separate`, {
            components
        });
        return response.data;
    },

    /**
     * Get components derived from a specific item
     */
    getComponents: async (itemId: number): Promise<{ data: InventoryItem[] }> => {
        const response = await authInstance.get(`/blood-bank/inventory/${itemId}/components`);
        return response.data;
    },

    /**
     * Get items pending quality check
     */
    getPendingQualityChecks: async (): Promise<{ data: InventoryItem[] }> => {
        const response = await authInstance.get("/blood-bank/quality-control/pending");
        return response.data;
    },

    /**
     * Update quality status
     */
    updateQualityStatus: async (
        itemId: number,
        status: "passed" | "failed" | "quarantine",
        notes?: string
    ): Promise<{ data: InventoryItem }> => {
        const response = await authInstance.put(`/blood-bank/quality-control/${itemId}/status`, {
            status,
            notes
        });
        return response.data;
    },

    /**
     * Get quality control statistics
     */
    getQualityStats: async (): Promise<{
        pending: number;
        passed: number;
        failed: number;
        quarantine: number;
    }> => {
        const response = await authInstance.get("/blood-bank/quality-control/stats");
        return response.data;
    }
};
