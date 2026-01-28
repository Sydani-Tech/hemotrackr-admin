import { authInstance } from "../api/apiInstances";

export const OfferService = {
    /**
     * Get all blood requests from other organizations (for Blood Banks to see what to sell)
     */
    getAllRequests: async () => {
        const response = await authInstance.get("/blood-requests", {
            params: {
                request_source: "blood_banks",
                status: "Pending"
            }
        });
        return response.data;
    },

    /**
     * Get direct/incoming requests sent to this organization
     */
    getIncomingRequests: async (status = 'Pending') => {
        const response = await authInstance.get("/blood-bank/requests", {
            params: { status }
        });
        return response.data;
    },

    /**
     * Check if I have already made an offer (for preventing duplicates)
     */
    checkMyOffer: async (requestId: number) => {
        const response = await authInstance.get(`/blood-bank/blood-requests/${requestId}/check-offer`);
        return response.data;
    },

    /**
     * Get all offers received for a specific request (for the Requester to view)
     */
    getOffers: async (requestId: number) => {
        const response = await authInstance.get(`/blood-bank/blood-requests/${requestId}/offers`);
        // Ensure we return an array
        return response.data.data || [];
    },

    /**
     * Submit an offer for a request
     */
    submitOffer: async (requestId: number, offerDetails: {
        product_fee: number;
        shipping_fee: number;
        card_charge?: number;
        notes?: string;
    }) => {
        const response = await authInstance.post(`/blood-bank/blood-requests/${requestId}/submit-offer`, offerDetails);
        return response.data;
    },

    /**
     * Accept an offer
     */
    acceptOffer: async (offerId: number) => {
        const response = await authInstance.post(`/blood-bank/offers/${offerId}/accept`);
        return response.data;
    },

    /**
     * Reject an offer
     */
    rejectOffer: async (offerId: number) => {
        const response = await authInstance.post(`/blood-bank/offers/${offerId}/reject`);
        return response.data;
    }
};
