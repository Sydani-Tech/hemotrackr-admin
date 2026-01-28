import { useNavigate } from "react-router-dom";
import { ChevronLeft, Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import { HospitalAPI } from "@/core/services/HospitalService";
import { toast } from "react-toastify";

const Requests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offers, setOffers] = useState<any[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(false);
  const [processingOfferId, setProcessingOfferId] = useState<number | null>(null);
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await HospitalAPI.getMyRequests();
      setRequests(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch requests", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: number) => {
    if (!confirm("Are you sure you want to take down this request?")) return;

    setCancellingId(id);
    try {
      await HospitalAPI.cancelRequest(id);
      toast.success("Request cancelled successfully");
      fetchRequests();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to cancel request");
    } finally {
      setCancellingId(null);
    }
  };

  const handleShare = (request: any) => {
    const text = `Blood Request: ${request.type} - ${request.blood_group || 'Any'} (${request.units_needed} units) needed by ${new Date(request.needed_by).toLocaleDateString()}.`;
    navigator.clipboard.writeText(text);
    toast.success("Request details copied to clipboard!");
  };

  const handleViewOffers = async (request: any) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
    setOffers([]);

    if (request.status === 'Pending') {
      fetchOffers(request.id);
    }
  };

  const fetchOffers = async (requestId: number) => {
    setLoadingOffers(true);
    console.log("Fetching offers for request ID:", requestId);
    try {
      const response = await HospitalAPI.getOffersForRequest(requestId);
      console.log("Offers API response:", response.data);
      setOffers(response.data.data || response.data || []);
    } catch (error) {
      console.error("Failed to fetch offers", error);
    } finally {
      setLoadingOffers(false);
    }
  };

  const handleAcceptOffer = async (offer: any) => {
    if (!window.confirm(`Accept offer from ${offer.organization?.name} for ₦${offer.total_amount?.toLocaleString()}?`)) return;

    setProcessingOfferId(offer.id);
    try {
      await HospitalAPI.acceptOffer(offer.id);
      toast.success("Offer accepted! Delivery has been initiated.");
      setIsModalOpen(false);
      fetchRequests();
    } catch (error: any) {
      console.error("Failed to accept offer", error);
      toast.error(error.response?.data?.message || "Failed to accept offer");
    } finally {
      setProcessingOfferId(null);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed":
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Processing":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <h2 className="text-3xl font-serif text-gray-900">Request Status</h2>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-3" />
            <p className="text-gray-500">Loading requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">No requests found.</p>
            <button
              onClick={() => navigate("/hospital/make-request")}
              className="text-blue-600 font-bold hover:underline"
            >
              Make a request
            </button>
          </div>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between pb-6 border-b border-gray-50 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-lg">
                  {request.blood_group || request.type?.substring(0, 2).toUpperCase() || "BL"}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-700">{request.type} request</h3>
                    <span className="bg-blue-100 text-blue-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {request.request_source === 'donors' ? 'Blood Donors' :
                        request.request_source === 'blood_banks' ? 'Blood Banks' : 'All Sources'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {request.units_needed} pint{request.units_needed > 1 ? 's' : ''} • {new Date(request.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-4 py-2 rounded-lg text-xs font-bold ${getStatusStyle(request.status)}`}>
                  {request.status}
                </span>

                {request.status === 'Pending' && (
                  <button
                    onClick={() => handleViewOffers(request)}
                    className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm"
                  >
                    View Offers
                  </button>
                )}

                {request.status !== 'Cancelled' && request.status !== 'Completed' && (
                  <button
                    onClick={() => handleCancel(request.id)}
                    disabled={cancellingId === request.id}
                    className="bg-red-50 text-red-500 hover:bg-red-100 px-5 py-2 rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                  >
                    {cancellingId === request.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Take down"
                    )}
                  </button>
                )}

                <button
                  onClick={() => handleShare(request)}
                  className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-5 py-2 rounded-lg text-xs font-bold transition-colors"
                >
                  Share
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Offers Modal */}
      {isModalOpen && selectedRequest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Request Offers</h3>
                <p className="text-sm text-gray-500">ID: #{selectedRequest.id} • {selectedRequest.type} • {selectedRequest.blood_group || 'Any type'}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Units Needed</p>
                  <p className="font-semibold text-gray-900">{selectedRequest.units_needed} Pints</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Urgency</p>
                  <p className="font-semibold text-gray-900 capitalize">{selectedRequest.urgency_level || 'Normal'}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Needed By</p>
                  <p className="font-semibold text-gray-900">{new Date(selectedRequest.needed_by).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-900 uppercase flex items-center gap-2">
                  Blood Bank Offers
                  {loadingOffers && <Loader2 className="w-3 h-3 animate-spin" />}
                </h4>

                {selectedRequest.status !== 'Pending' ? (
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
                    <CheckCircle2 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="font-bold text-blue-700">Request {selectedRequest.status}</p>
                    <p className="text-sm text-blue-600">Offers are closed for this request.</p>
                  </div>
                ) : loadingOffers ? (
                  <div className="text-center py-8 text-gray-400">Loading offers...</div>
                ) : offers.length > 0 ? (
                  <div className="space-y-3">
                    {offers.map((offer) => (
                      <div key={offer.id} className={`bg-white p-4 rounded-xl border transition-colors shadow-sm ${offer.status === 'Pending' ? 'border-gray-200 hover:border-blue-300' :
                        offer.status === 'Accepted' ? 'border-green-200 bg-green-50/30' :
                          'border-gray-200 opacity-60'
                        }`}>
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-gray-900">{offer.organization?.name || "Blood Bank"}</h4>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${offer.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                offer.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                                  offer.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                    'bg-gray-100 text-gray-600'
                                }`}>
                                {offer.status}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">{new Date(offer.created_at).toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">₦{offer.total_amount?.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Total Cost</p>
                          </div>
                        </div>

                        <div className="flex gap-2 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg mb-4">
                          <span>Product: ₦{offer.product_fee?.toLocaleString()}</span>
                          <span className="text-gray-300">|</span>
                          <span>Shipping: ₦{offer.shipping_fee?.toLocaleString()}</span>
                        </div>

                        {offer.status === 'Pending' ? (
                          <button
                            onClick={() => handleAcceptOffer(offer)}
                            disabled={processingOfferId === offer.id}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg transition-colors disabled:opacity-50"
                          >
                            {processingOfferId === offer.id ? "Processing..." : "Accept Offer"}
                          </button>
                        ) : offer.status === 'Accepted' ? (
                          <div className="w-full bg-green-100 text-green-700 font-bold py-2.5 rounded-lg text-center text-sm">
                            ✓ Offer Accepted - Delivery Initiated
                          </div>
                        ) : (
                          <div className="w-full bg-gray-100 text-gray-500 font-medium py-2.5 rounded-lg text-center text-sm">
                            Offer {offer.status}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-8 text-center">
                    <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 font-medium">No offers received yet</p>
                    <p className="text-xs text-gray-400 mt-1">Check back later for responses from blood banks.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
