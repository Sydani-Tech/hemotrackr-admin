import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BloodBankAPI } from "@/core/services/BloodBankService";
import { OfferService } from "@/core/services/OfferService";
import { toast } from "react-toastify";

// --- Components ---

interface TrackRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: any | null;
  onUpdate: () => void;
}

const TrackRequestModal: React.FC<TrackRequestModalProps> = ({
  isOpen,
  onClose,
  request,
  onUpdate
}) => {
  const [offers, setOffers] = useState<any[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(false);
  const [processingOfferId, setProcessingOfferId] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen && request) {
      if (request.status === 'Pending' && (request.request_source === 'blood_banks' || request.request_source === 'both')) {
        fetchOffers(request.id);
      } else {
        setOffers([]);
      }
    }
  }, [isOpen, request]);

  const fetchOffers = async (requestId: number) => {
    setLoadingOffers(true);
    try {
      const response = await OfferService.getOffers(requestId);
      setOffers(response.data || []);
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
      await OfferService.acceptOffer(offer.id);
      toast.success("Offer accepted! Delivery has been initiated.");
      onUpdate(); // Trigger refresh in parent
      onClose();
    } catch (error: any) {
      console.error("Failed to accept offer", error);
      toast.error(error.response?.data?.message || "Failed to accept offer");
    } finally {
      setProcessingOfferId(null);
    }
  };

  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0 transition-opacity -z-10" onClick={onClose} />
      <div className="bg-white rounded-3xl w-full max-w-2xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Track Request #{request.id}</h3>
            <p className="text-xs text-gray-500">Manage request status and offers</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Request Details */}
          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-50 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Type</p>
                <p className="font-semibold text-gray-900">{request.type}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Blood Group</p>
                <p className="font-semibold text-gray-900">{request.blood_group || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Units Needed</p>
                <p className="font-semibold text-gray-900">{request.units_needed}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Status</p>
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${request.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  request.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                  {request.status}
                </span>
              </div>
            </div>
          </div>

          <h4 className="text-sm font-bold text-gray-900 uppercase mb-4 flex items-center gap-2">
            Received Offers
            {loadingOffers && <Loader2 className="w-3 h-3 animate-spin text-blue-500" />}
          </h4>

          {request.status !== 'Pending' ? (
            <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center">
              <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="font-bold text-green-700">Request is {request.status}</p>
              <p className="text-sm text-green-600">Offers are closed. Check "Deliveries" for status.</p>
            </div>
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
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-10 text-center">
              <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 font-medium">No offers received yet</p>
              <p className="text-xs text-gray-400 mt-1">
                {request.request_source === 'donors'
                  ? "This request was sent to Donors only."
                  : "Waiting for other blood banks to respond."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function HospitalRequests() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("My Requests");
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await BloodBankAPI.getMyRequests();
      setRequests(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch requests", error);
      // toast.error("Failed to load requests"); // Optional: don't spam toasts
    } finally {
      setLoading(false);
    }
  };

  const handleTrackRequest = (request: any) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const myPendingRequests = requests.filter(r => r.status === 'Pending');
  const myHistoryRequests = requests.filter(r => r.status !== 'Pending');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Request History</h2>
          <p className="text-sm text-gray-500">Manage requests you have made</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 min-h-[500px]">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 mb-6 gap-6">
          <button
            onClick={() => setActiveTab("My Requests")}
            className={`pb-3 px-2 text-sm font-bold transition-colors border-b-2 ${activeTab === "My Requests"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
          >
            Active Requests ({myPendingRequests.length})
          </button>
          <button
            onClick={() => setActiveTab("History")}
            className={`pb-3 px-2 text-sm font-bold transition-colors border-b-2 ${activeTab === "History"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
          >
            All History ({myHistoryRequests.length})
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="space-y-4">
            {activeTab === "My Requests" && (
              myPendingRequests.length > 0 ? myPendingRequests.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-50 hover:bg-gray-50 px-4 rounded-xl transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center font-bold text-red-600 text-lg border border-red-100">
                      {item.blood_group}
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-bold text-sm">
                        {item.type} Request
                      </h3>
                      <p className="text-gray-400 text-xs">
                        {item.units_needed} units • {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleTrackRequest(item)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold h-9"
                    >
                      Track Offers
                    </Button>
                  </div>
                </div>
              )) : (
                <div className="text-center py-20 text-gray-400">
                  <p>No active requests</p>
                  <Button variant="link" className="text-blue-500" onClick={() => navigate('/hospital/make-request')}>Make a request</Button>
                </div>
              )
            )}

            {activeTab === "History" && (
              myHistoryRequests.length > 0 ? myHistoryRequests.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-50 hover:bg-gray-50 px-4 rounded-xl transition-colors opacity-75">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-500 text-lg border border-gray-200">
                      {item.blood_group}
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-bold text-sm">
                        {item.type} Request
                      </h3>
                      <p className="text-gray-400 text-xs">
                        {item.status} • {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleTrackRequest(item)}
                      variant="outline"
                      className="border-gray-200 text-gray-600 h-9 text-xs"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              )) : (
                <div className="text-center py-20 text-gray-400">No history found</div>
              )
            )}
          </div>
        )}
      </div>

      <TrackRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        request={selectedRequest}
        onUpdate={fetchRequests}
      />
    </div>
  );
}
