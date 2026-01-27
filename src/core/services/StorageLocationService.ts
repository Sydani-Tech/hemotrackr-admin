import { authInstance } from "../api/apiInstances";

export interface StorageLocation {
    id: number;
    organization_id: number;
    name: string;
    location_type: "room" | "fridge" | "freezer" | "shelf" | "container";
    parent_location_id: number | null;
    capacity?: number;
    current_load: number;
    min_temperature?: number;
    max_temperature?: number;
    current_temperature?: number;
    is_active: boolean;
    notes?: string;
    full_path?: string;
    sub_locations?: StorageLocation[];
    parent_location?: StorageLocation;
}

export const StorageLocationService = {
    /**
     * Get all storage locations
     */
    getLocations: async (params?: {
        type?: string;
        parent_id?: number | null;
        hierarchy?: boolean;
    }) => {
        const response = await authInstance.get("/blood-bank/inventory/locations", { params });
        return response.data;
    },

    /**
     * Get single location
     */
    getLocation: async (id: number) => {
        const response = await authInstance.get(`/blood-bank/inventory/locations/${id}`);
        return response.data;
    },

    /**
     * Create new location
     */
    createLocation: async (data: Partial<StorageLocation>) => {
        const response = await authInstance.post("/blood-bank/inventory/locations", data);
        return response.data;
    },

    /**
     * Update location
     */
    updateLocation: async (id: number, data: Partial<StorageLocation>) => {
        const response = await authInstance.put(`/blood-bank/inventory/locations/${id}`, data);
        return response.data;
    },

    /**
     * Delete location
     */
    deleteLocation: async (id: number) => {
        const response = await authInstance.delete(`/blood-bank/inventory/locations/${id}`);
        return response.data;
    },
};
