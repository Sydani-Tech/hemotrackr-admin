import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { authInstance } from "@/core/api/apiInstances";
import { toast } from "react-toastify";

interface MakeOfferModalProps {
    isOpen: boolean;
    onClose: () => void;
    requestId: number;
    requestDetails: {
        bloodGroup: string;
        unitsNeeded: number;
        organizationName: string;
    };
    onSuccess: () => void;
}

const MakeOfferModal = ({
    isOpen,
    onClose,
    requestId,
    requestDetails,
    onSuccess,
}: MakeOfferModalProps) => {
    const [productFee, setProductFee] = useState("");
    const [shippingFee, setShippingFee] = useState("");
    const [cardCharge, setCardCharge] = useState("");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);

    const totalAmount =
        (parseFloat(productFee) || 0) +
        (parseFloat(shippingFee) || 0) +
        (parseFloat(cardCharge) || 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await authInstance.post(`/blood-bank/blood-requests/${requestId}/submit-offer`, {
                product_fee: parseFloat(productFee),
                shipping_fee: parseFloat(shippingFee),
                card_charge: parseFloat(cardCharge) || 0,
                notes: notes.trim() || null,
            });

            toast.success("Offer submitted successfully!");
            onSuccess();
            onClose();
        } catch (error: any) {
            console.error("Failed to submit offer", error);
            toast.error(error?.response?.data?.message || "Failed to submit offer");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Make an Offer</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Request Details */}
                <div className="p-6 bg-blue-50 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-2">Request Details</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <span className="text-gray-500">Blood Type:</span>
                            <span className="ml-2 font-bold text-red-600">{requestDetails.bloodGroup}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Units:</span>
                            <span className="ml-2 font-bold text-gray-900">{requestDetails.unitsNeeded}</span>
                        </div>
                        <div className="col-span-2">
                            <span className="text-gray-500">Requesting Hospital:</span>
                            <span className="ml-2 font-semibold text-gray-900">{requestDetails.organizationName}</span>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Product Fee */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Product Fee (₦) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={productFee}
                            onChange={(e) => setProductFee(e.target.value)}
                            required
                            min="0"
                            step="0.01"
                            placeholder="Enter product fee"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Shipping Fee */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Delivery/Shipping Fee (₦) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={shippingFee}
                            onChange={(e) => setShippingFee(e.target.value)}
                            required
                            min="0"
                            step="0.01"
                            placeholder="Enter shipping fee"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Card Charge */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Card Charge (₦) <span className="text-gray-400 text-xs">(Optional)</span>
                        </label>
                        <input
                            type="number"
                            value={cardCharge}
                            onChange={(e) => setCardCharge(e.target.value)}
                            min="0"
                            step="0.01"
                            placeholder="Enter card processing charge"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Notes <span className="text-gray-400 text-xs">(Optional)</span>
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            placeholder="Add any additional information..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    {/* Total Amount */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">Total Amount:</span>
                            <span className="text-2xl font-bold text-blue-600">
                                ₦{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                            {loading ? "Submitting..." : "Submit Offer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MakeOfferModal;
