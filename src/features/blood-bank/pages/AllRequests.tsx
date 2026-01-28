import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Search, Filter, DollarSign } from "lucide-react";
import { BloodBankAPI } from "@/core/services/BloodBankService";
import { authInstance } from "@/core/api/apiInstances";
import MakeOfferModal from "../components/MakeOfferModal";

const AllRequests = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [offerStates, setOfferStates] = useState<Record<number, { hasOffer: boolean; offer: any; loading: boolean }>>({});
    const [makeOfferModal, setMakeOfferModal] = useState<{ isOpen: boolean; requestId: number | null; requestDetails: any }>({ isOpen: false, requestId: null, requestDetails: null });

    useEffect(() => {
        fetchRequests();
    }, [filterStatus]);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const response = await BloodBankAPI.getRequests({ status: filterStatus !== "all" ? filterStatus : undefined });
            setRequests(response.data.data || []);
        } catch (error) {
            console.error("Failed to fetch requests", error);
        } finally {
            setLoading(false);
        }
    };


    // Note: Accept functionality moved to offers - removed unused handler

    const checkOfferStatus = async (requestId: number) => {
        setOfferStates(prev => ({ ...prev, [requestId]: { hasOffer: false, offer: null, loading: true } }));
        try {
            const response = await authInstance.get(`/blood-bank/blood-requests/${requestId}/check-offer`);
            setOfferStates(prev => ({
                ...prev,
                [requestId]: {
                    hasOffer: response.data.has_offer,
                    offer: response.data.offer,
                    loading: false
                }
            }));
        } catch (error) {
            console.error("Failed to check offer status", error);
            setOfferStates(prev => ({ ...prev, [requestId]: { hasOffer: false, offer: null, loading: false } }));
        }
    };

    // Check offer status for all pending requests
    useEffect(() => {
        requests.forEach(request => {
            if (request.status === "Pending" && !offerStates[request.id]) {
                checkOfferStatus(request.id);
            }
        });
    }, [requests]);

    const handleMakeOffer = (request: any) => {
        setMakeOfferModal({
            isOpen: true,
            requestId: request.id,
            requestDetails: {
                bloodGroup: request.blood_group,
                unitsNeeded: request.units_needed || request.units_requested,
                organizationName: request.organization?.name || "Unknown"
            }
        });
    };

    const handleOfferSuccess = () => {
        if (makeOfferModal.requestId) {
            checkOfferStatus(makeOfferModal.requestId);
        }
        fetchRequests();
    };

    const filteredRequests = requests.filter((request) => {
        if (!searchQuery) return true;
        const hospitalName = request.organization?.name?.toLowerCase() || "";
        const bloodType = request.blood_group?.toLowerCase() || "";
        return hospitalName.includes(searchQuery.toLowerCase()) || bloodType.includes(searchQuery.toLowerCase());
    });

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            Pending: "bg-yellow-100 text-yellow-700",
            Accepted: "bg-blue-100 text-blue-700",
            Fulfilled: "bg-green-100 text-green-700",
            Rejected: "bg-red-100 text-red-700",
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status] || "bg-gray-100 text-gray-700"}`}>
                {status}
            </span>
        );
    };

    const getUrgencyBadge = (urgency: string) => {
        const styles: Record<string, string> = {
            Critical: "bg-red-100 text-red-700",
            Urgent: "bg-orange-100 text-orange-700",
            Routine: "bg-blue-100 text-blue-700",
        };
        return (
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${styles[urgency] || "bg-gray-100 text-gray-700"}`}>
                {urgency}
            </span>
        );
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <h2 className="text-3xl font-serif text-gray-900">All Blood Requests</h2>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search by hospital name or blood type..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="md:w-48 relative">
                        <Filter className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none"
                        >
                            <option value="all">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Fulfilled">Fulfilled</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[500px]">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    </div>
                ) : filteredRequests.length > 0 ? (
                    <div className="space-y-4">
                        {filteredRequests.map((request) => (
                            <div
                                key={request.id}
                                className="border border-gray-100 rounded-xl p-6 hover:border-gray-200 transition-colors"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="font-bold text-gray-900 text-lg">
                                                {request.organization?.name || request.user?.first_name || "Unknown Hospital"}
                                            </h3>
                                            {getUrgencyBadge(request.urgency_level || "Routine")}
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {request.organization?.address || "No address provided"}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {getStatusBadge(request.status)}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div>
                                        <p className="text-gray-500 text-xs mb-1">Blood Type</p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                                <span className="text-red-600 font-bold text-sm">{request.blood_group}</span>
                                            </div>
                                            <span className="font-semibold text-gray-900">{request.blood_group}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs mb-1">Units Needed</p>
                                        <p className="font-semibold text-gray-900">{request.units_requested || "N/A"} pints</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs mb-1">Request Type</p>
                                        <p className="font-semibold text-gray-900">{request.request_type || "General"}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs mb-1">Date Requested</p>
                                        <p className="font-semibold text-gray-900">
                                            {new Date(request.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                {request.reason && (
                                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                        <p className="text-xs font-bold text-gray-700 mb-1">Reason:</p>
                                        <p className="text-sm text-gray-600">{request.reason}</p>
                                    </div>
                                )}

                                {request.patient_name && (
                                    <div className="mb-4">
                                        <p className="text-xs text-gray-500">Patient: <span className="font-semibold text-gray-700">{request.patient_name}</span></p>
                                    </div>
                                )}

                                {request.status === "Pending" && (
                                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                                        {offerStates[request.id]?.loading ? (
                                            <div className="flex-1 flex items-center justify-center py-2">
                                                <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                                                <span className="ml-2 text-sm text-gray-500">Checking offer status...</span>
                                            </div>
                                        ) : offerStates[request.id]?.hasOffer ? (
                                            <div className="flex-1 bg-green-50 border border-green-200 rounded-lg p-3">
                                                <p className="text-green-700 font-semibold text-sm">✓ Offer Submitted</p>
                                                <p className="text-green-600 text-xs mt-1">
                                                    Total: ₦{offerStates[request.id]?.offer?.total_amount?.toLocaleString() || "N/A"}
                                                </p>
                                                <p className="text-gray-500 text-xs mt-1">
                                                    Status: {offerStates[request.id]?.offer?.status}
                                                </p>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleMakeOffer(request)}
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                                            >
                                                <DollarSign className="w-4 h-4" />
                                                Make an Offer
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-400">No requests found</p>
                    </div>
                )}
            </div>

            <MakeOfferModal
                isOpen={makeOfferModal.isOpen}
                onClose={() => setMakeOfferModal({ isOpen: false, requestId: null, requestDetails: null })}
                requestId={makeOfferModal.requestId!}
                requestDetails={makeOfferModal.requestDetails}
                onSuccess={handleOfferSuccess}
            />
        </div>
    );
};

export default AllRequests;
