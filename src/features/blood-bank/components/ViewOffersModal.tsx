import { useState, useEffect } from "react";
import { X, Check, XCircle, Loader2, Store } from "lucide-react";
import { OfferService } from "@/core/services/OfferService";
import { toast } from "react-toastify";

interface ViewOffersModalProps {
    isOpen: boolean;
    onClose: () => void;
    requestId: number | null;
    onSuccess: () => void; // Triggered after accepting an offer
}

const ViewOffersModal = ({ isOpen, onClose, requestId, onSuccess }: ViewOffersModalProps) => {
    const [offers, setOffers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<number | null>(null);

    useEffect(() => {
        if (isOpen && requestId) {
            fetchOffers();
        }
    }, [isOpen, requestId]);

    const fetchOffers = async () => {
        if (!requestId) return;
        setLoading(true);
        try {
            const data = await OfferService.getOffers(requestId);
            setOffers(data);
        } catch (error) {
            console.error("Failed to fetch offers", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (offer: any) => {
        if (!confirm(`Are you sure you want to accept the offer from ${offer.organization?.name}? Total: ₦${offer.total_amount.toLocaleString()}`)) return;

        setProcessingId(offer.id);
        try {
            await OfferService.acceptOffer(offer.id);
            toast.success("Offer accepted successfully! Order is being processed.");
            onSuccess(); // Refresh parent list
            onClose();   // Close modal
        } catch (error: any) {
            toast.error("Failed to accept offer: " + (error.response?.data?.message || "Unknown error"));
        } finally {
            setProcessingId(null);
        }
    };

    const handleReject = async (offer: any) => {
        if (!confirm("Reject this offer?")) return;

        setProcessingId(offer.id);
        try {
            await OfferService.rejectOffer(offer.id);
            toast.info("Offer rejected.");
            fetchOffers(); // Refresh list to show status change
        } catch (error: any) {
            toast.error("Failed to reject offer.");
        } finally {
            setProcessingId(null);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Received Offers</h2>
                        <p className="text-sm text-gray-500 mt-1">Select the best offer for your request</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors shadow-sm"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                            <Loader2 className="w-8 h-8 animate-spin mb-3 text-blue-500" />
                            <p>Loading offers...</p>
                        </div>
                    ) : offers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Store className="w-8 h-8 text-gray-300" />
                            </div>
                            <p className="text-lg font-semibold text-gray-900">No offers yet</p>
                            <p className="text-sm text-gray-500 max-w-xs mt-1">
                                Wait for blood banks and hospitals to see your request and send their best offers.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {offers.map((offer) => (
                                <div
                                    key={offer.id}
                                    className={`bg-white border rounded-xl p-5 transition-all ${offer.status === "Accepted"
                                            ? "border-green-500 ring-1 ring-green-500 shadow-md"
                                            : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                                        }`}
                                >
                                    <div className="flex flex-col md:flex-row justify-between gap-4">

                                        {/* Organization Info */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-bold text-gray-900 text-lg">
                                                    {offer.organization?.name || "Unknown Organization"}
                                                </h3>
                                                {offer.status === 'Accepted' && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">ACCEPTED</span>}
                                                {offer.status === 'Rejected' && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold">REJECTED</span>}
                                            </div>

                                            <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                                                Usually responds in <span className="text-gray-700 font-medium">10 mins</span>
                                            </p>

                                            {offer.notes && (
                                                <div className="bg-gray-50 p-2 rounded text-xs text-gray-600 italic border border-gray-100 mt-2">
                                                    "{offer.notes}"
                                                </div>
                                            )}
                                        </div>

                                        {/* Price & Actions */}
                                        <div className="flex flex-col items-end gap-3 min-w-[150px]">
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Total Cost</p>
                                                <p className="text-2xl font-bold text-blue-600">
                                                    ₦{parseInt(offer.total_amount).toLocaleString()}
                                                </p>
                                                <div className="text-xs text-gray-400 mt-0.5">
                                                    Details: Product ₦{parseInt(offer.product_fee).toLocaleString()} + Ship ₦{parseInt(offer.shipping_fee).toLocaleString()}
                                                </div>
                                            </div>

                                            {offer.status === "Pending" && (
                                                <div className="flex gap-2 w-full mt-2">
                                                    <button
                                                        onClick={() => handleReject(offer)}
                                                        disabled={processingId === offer.id}
                                                        className="flex-1 flex items-center justify-center px-4 py-2 border border-red-100 text-red-600 rounded-lg hover:bg-red-50 text-sm font-semibold transition-colors disabled:opacity-50"
                                                    >
                                                        <XCircle className="w-4 h-4 mr-1.5" />
                                                        Reject
                                                    </button>
                                                    <button
                                                        onClick={() => handleAccept(offer)}
                                                        disabled={processingId === offer.id}
                                                        className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-bold transition-colors shadow-sm disabled:opacity-50"
                                                    >
                                                        {processingId === offer.id ? (
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                        ) : (
                                                            <>
                                                                <Check className="w-4 h-4 mr-1.5" />
                                                                Accept
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewOffersModal;
