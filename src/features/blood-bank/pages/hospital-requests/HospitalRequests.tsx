import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OfferService } from "@/core/services/OfferService";
import { toast } from "react-toastify";

// --- Components ---

interface SetAmountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: (amounts: { units: number; productFee: number }) => void;
  request: any | null;
}

const SetAmountModal: React.FC<SetAmountModalProps> = ({
  isOpen,
  onClose,
  onProceed,
  request,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [pricePerUnit, setPricePerUnit] = useState<number>(3000); // Default price, could be fetched

  useEffect(() => {
    if (request) {
      setAmount(request.units_needed || 0);
    }
  }, [request]);

  if (!isOpen || !request) return null;

  const productFee = amount * pricePerUnit;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
      <div className="absolute inset-0 transition-opacity -z-10" onClick={onClose} />
      <div className="bg-white rounded-xl h-auto w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-800 text-sm uppercase">Set Offer Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Request Details</label>
              <p className="text-sm text-gray-500 font-medium">
                {request.organization?.name} needs {request.units_needed} pints of {request.blood_group}
              </p>
            </div>

            <hr className="border-gray-100" />

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase block mb-2">Set Amount to Supply</label>
              <input
                type="number"
                min="1"
                max={request.units_needed}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <div className="flex gap-2 mt-2">
                {[5, 10, 20].map(val => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full hover:bg-gray-200"
                  >
                    {val} Pints
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase block mb-2">Price Per Unit (₦)</label>
              <input
                type="number"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-blue-600 font-medium">Total Units</span>
              <span className="font-bold text-gray-900">{amount}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-blue-600 font-medium">Product Fee</span>
              <span className="font-bold text-gray-900">₦{productFee.toLocaleString()}</span>
            </div>
            <p className="text-xs text-blue-400 mt-2 text-center">Shipping fee will be calculated based on rider selection in next step</p>
          </div>

          <div className="flex gap-3">
            <Button onClick={onClose} variant="ghost" className="flex-1">Cancel</Button>
            <Button
              onClick={() => onProceed({ units: amount, productFee })}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold"
            >
              Proceed to Rider
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HospitalRequests() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Pending Requests");
  const [requests, setRequests] = useState<any[]>([]);
  const [acceptedRequests, setAcceptedRequests] = useState<any[]>([]); // Local state for "Interested"
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await OfferService.getIncomingRequests();
      // Filter out completed ones, keep pending
      setRequests(data.data?.filter((r: any) => r.status === 'Pending') || []);
    } catch (error) {
      console.error("Failed to fetch requests", error);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Move from Pending -> Accepted (Local Interest)
  const handleAcceptRequest = (request: any) => {
    setAcceptedRequests((prev) => [...prev, request]);
    // Optionally remove from pending list to avoid duplicates
    setRequests((prev) => prev.filter((r) => r.id !== request.id));
    toast.success("Request moved to Accepted tab");
    setActiveTab("Accepted Requests");
  };

  // Step 2: Open Modal to Set Amount
  const handleSetAmount = (request: any) => {
    setSelectedRequest(request);
    setIsConfirmOpen(true);
  };

  // Step 3: Proceed to Rider Selection with Offer Data
  const handleProceedToRiders = (details: { units: number; productFee: number }) => {
    setIsConfirmOpen(false);
    // Navigate with state
    navigate("/blood-bank/hospital-requests/riders", {
      state: {
        request: selectedRequest,
        offerDetails: details
      }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Incoming Requests</h2>
          <p className="text-sm text-gray-500">Requests from other facilities</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 min-h-[500px]">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 mb-6 gap-6">
          <button
            onClick={() => setActiveTab("Pending Requests")}
            className={`pb-3 px-2 text-sm font-bold transition-colors border-b-2 ${activeTab === "Pending Requests"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
          >
            Pending Requests ({requests.length})
          </button>
          <button
            onClick={() => setActiveTab("Accepted Requests")}
            className={`pb-3 px-2 text-sm font-bold transition-colors border-b-2 ${activeTab === "Accepted Requests"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
          >
            Accepted Requests ({acceptedRequests.length})
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="space-y-4">
            {activeTab === "Pending Requests" && (
              requests.length > 0 ? requests.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-50 hover:bg-gray-50 px-4 rounded-xl transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center font-bold text-red-600 text-lg border border-red-100">
                      {item.blood_group}
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-bold text-sm">
                        {item.organization?.name || "Unknown Hospital"}
                      </h3>
                      <p className="text-gray-400 text-xs">
                        {item.units_needed} pints • {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleAcceptRequest(item)}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold h-9"
                    >
                      Accept Request
                    </Button>
                    <Button variant="outline" className="border-gray-200 text-gray-600 h-9 text-xs">Message</Button>
                  </div>
                </div>
              )) : (
                <div className="text-center py-20 text-gray-400">No pending requests</div>
              )
            )}

            {activeTab === "Accepted Requests" && (
              acceptedRequests.length > 0 ? acceptedRequests.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-50 hover:bg-gray-50 px-4 rounded-xl transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center font-bold text-green-600 text-lg border border-green-100">
                      {item.blood_group}
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-bold text-sm">
                        {item.organization?.name || "Unknown Hospital"}
                      </h3>
                      <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded-full font-bold mt-1">
                        Interested
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleSetAmount(item)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold h-9"
                    >
                      Set Amount
                    </Button>
                    <Button variant="outline" className="border-gray-200 text-gray-600 h-9 text-xs">Message</Button>
                  </div>
                </div>
              )) : (
                <div className="text-center py-20 text-gray-400">No accepted requests yet</div>
              )
            )}
          </div>
        )}
      </div>

      <SetAmountModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onProceed={handleProceedToRiders}
        request={selectedRequest}
      />
    </div>
  );
}
