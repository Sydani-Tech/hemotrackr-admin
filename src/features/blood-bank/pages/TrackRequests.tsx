import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { BloodBankAPI } from "@/core/services/BloodBankService";
import { OfferService } from "@/core/services/OfferService";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const TrackRequests = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offers, setOffers] = useState<any[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(false);
  const [processingOfferId, setProcessingOfferId] = useState<number | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await BloodBankAPI.getMyRequests();
      setRequests(response.data.data);
    } catch (error) {
      console.error("Failed to fetch requests", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewRequest = async (request: any) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
    setOffers([]); // Reset

    // If request was sent to blood banks and is pending, check for offers
    if (request.status === 'Pending' && (request.request_source === 'blood_banks' || request.request_source === 'both')) {
      fetchOffers(request.id);
    }
  };

  const fetchOffers = async (requestId: number) => {
    setLoadingOffers(true);
    try {
      const offers = await OfferService.getOffers(requestId);
      setOffers(offers);
    } catch (error) {
      console.error("Failed to fetch offers", error);
    } finally {
      setLoadingOffers(false);
    }
  };

  const handleAcceptOffer = async (offer: any) => {
    if (!window.confirm(`Accept offer from ${offer.organization?.name} for ₦${offer.total_amount}?`)) return;

    setProcessingOfferId(offer.id);
    try {
      await OfferService.acceptOffer(offer.id);
      toast.success("Offer accepted! Delivery has been initiated.");
      setIsModalOpen(false);
      fetchRequests(); // Refresh list to show updated status
    } catch (error: any) {
      console.error("Failed to accept offer", error);
      toast.error(error.response?.data?.message || "Failed to accept offer");
    } finally {
      setProcessingOfferId(null);
    }
  };

  return (
    <div className="flex gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Main Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <h2 className="text-3xl font-serif text-gray-900">
              Track Requests
            </h2>
          </div>

          <button
            onClick={() => navigate("/blood-bank/requests/status")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg text-xs transition-colors shadow-sm"
          >
            View request status
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          {loading ? (
            <p className="text-gray-500 text-center py-8">Loading requests...</p>
          ) : requests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">You haven't made any requests yet.</p>
              <button
                onClick={() => navigate("/blood-bank/make-request")}
                className="text-blue-600 font-bold hover:underline"
              >
                Make a request
              </button>
            </div>
          ) : (
            requests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-lg">
                    {request.blood_group || request.type.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-700 text-sm">
                      {request.type} request
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {request.units_needed} pint{request.units_needed > 1 ? 's' : ''} • {new Date(request.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${request.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                    request.status === 'Processing' ? 'bg-blue-100 text-blue-600' :
                      request.status === 'Approved' ? 'bg-blue-100 text-blue-600' :
                        request.status === 'Completed' ? 'bg-green-100 text-green-600' :
                          'bg-gray-100 text-gray-600'
                    }`}>
                    {request.status}
                  </span>
                  <button
                    onClick={() => handleViewRequest(request)}
                    className="bg-blue-50 text-blue-500 hover:bg-blue-100 px-6 py-2 rounded-lg text-xs font-bold transition-colors"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Sidebar - Ad & Share */}
      <div className="w-80 shrink-0 hidden lg:block">
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 sticky top-24">
          <div className="relative rounded-2xl overflow-hidden h-40 mb-4 bg-gray-900">
            {/* Ad Content */}
            <div className="absolute inset-0 bg-blue-600/20" />
            <div className="absolute inset-0 p-6 flex flex-col justify-center text-white">
              <p className="text-xs font-bold uppercase tracking-wider mb-1">
                Need Fast Delivery?
              </p>
              <h3 className="font-bold text-lg leading-tight mb-4">
                Our Rider Network covers nationwide
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Request Details & Offers Modal */}
      {isModalOpen && selectedRequest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Request Details</h3>
                <p className="text-sm text-gray-500">ID: #{selectedRequest.id}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                &times;
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Type</p>
                  <p className="font-semibold text-gray-900">{selectedRequest.type}</p>
                </div>
                {selectedRequest.blood_group && (
                  <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Blood Group</p>
                    <p className="font-semibold text-gray-900">{selectedRequest.blood_group}</p>
                  </div>
                )}
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Units Needed</p>
                  <p className="font-semibold text-gray-900">{selectedRequest.units_needed} Pints</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Required By</p>
                  <p className="font-semibold text-gray-900">{new Date(selectedRequest.needed_by).toLocaleDateString()}</p>
                </div>
              </div>

              {/* OFFERS SECTION */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase flex items-center gap-2">
                  Received Offers
                  {loadingOffers && <Loader2 className="w-3 h-3 animate-spin" />}
                </h3>

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
                      <div key={offer.id} className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-bold text-gray-900">{offer.organization?.name || "Blood Bank"}</h4>
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

                        <Button
                          onClick={() => handleAcceptOffer(offer)}
                          disabled={processingOfferId === offer.id}
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-10"
                        >
                          {processingOfferId === offer.id ? "Processing..." : "Accept Offer"}
                        </Button>
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

export default TrackRequests;
