import { authInstance } from "../api/apiInstances";

export interface InventoryItem {
    id: number;
    organization_id: number;
    blood_group: string;
    type: string;
    units_in_stock: number;
    threshold: number;
    location: string | null;
    expiry_date: string | null;
    created_at: string;
    updated_at: string;
    donor_id?: number | null;
    organization?: {
        id: number;
        name: string;
    };
}

export interface InventorySummary {
    blood_group: string;
    total_units: number;
}

export interface StockAdjustment {
    adjustment: number; // positive to add, negative to remove
    reason?: string;
}

export interface CreateInventoryItem {
    organization_id: number;
    blood_group: string;
    type: string;
    units_in_stock: number;
    threshold?: number;
    location?: string;
    expiry_date?: string;
}

export const InventoryService = {
    /**
     * Get all inventory items
     */
    getInventory: async (params?: {
        organization_id?: number;
        blood_group?: string;
        type?: string;
        low_stock?: boolean;
        per_page?: number;
    }) => {
        const response = await authInstance.get("/blood-bank/inventory", { params });
        return response.data;
    },

    /**
     * Get inventory summary (aggregated by blood group)
     */
    getSummary: async (organization_id?: number) => {
        const response = await authInstance.get("/blood-bank/inventory/summary", {
            params: { organization_id },
        });
        return response.data;
    },

    /**
     * Get single inventory item
     */
    getItem: async (id: number) => {
        const response = await authInstance.get(`/blood-bank/inventory/${id}`);
        return response.data;
    },

    /**
     * Create new inventory item
     */
    createItem: async (data: CreateInventoryItem) => {
        const response = await authInstance.post("/blood-bank/inventory", data);
        return response.data;
    },

    /**
     * Update inventory item
     */
    updateItem: async (id: number, data: Partial<CreateInventoryItem>) => {
        const response = await authInstance.put(`/blood-bank/inventory/${id}`, data);
        return response.data;
    },

    /**
     * Delete inventory item
     */
    deleteItem: async (id: number) => {
        const response = await authInstance.delete(`/blood-bank/inventory/${id}`);
        return response.data;
    },

    /**
     * Adjust stock (add or remove units)
     */
    adjustStock: async (id: number, adjustment: StockAdjustment) => {
        const response = await authInstance.post(
            `/blood-bank/inventory/${id}/adjust-stock`,
            adjustment
        );
        return response.data;
    },
};
