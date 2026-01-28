import { Button } from "@/components/ui/button";
import { ChevronLeft, Search, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentSuccessModal from "../../components/PaymentSuccessfulModal";
import { authInstance } from "@/core/api/apiInstances";
import { OfferService } from "@/core/services/OfferService";
import { toast } from "react-toastify";

interface Rider {
  id: number;
  user: {
    first_name: string;
    last_name: string;
    profile_picture_url?: string;
  };
  vehicle_type: string;
  status: string;
  shipping_fee_estimate?: number; // Added for display
}

// --- Components ---

interface ConfirmDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  rider: Rider | null;
  offerDetails: any;
  request: any;
  loading?: boolean;
}

const ConfirmDeliveryModal: React.FC<ConfirmDeliveryModalProps> = ({
  isOpen,
  onClose,
  onProceed,
  rider,
  offerDetails,
  request,
  loading
}) => {
  if (!isOpen || !rider) return null;

  // Assuming shipping fee logic or fixed for now
  const shippingFee = 5000;
  const grandTotal = offerDetails.productFee + shippingFee;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
      <div className="absolute inset-0 transition-opacity -z-10" onClick={onClose} />
      <div className="bg-white rounded-xl h-auto max-h-[90vh] overflow-y-auto w-full max-w-lg shadow-2xl">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-center font-bold text-gray-800 text-sm uppercase">Confirm Offer & Delivery</h2>
        </div>

        <div className="p-6 space-y-6">

          {/* Summary */}
          <div className="space-y-4 text-sm">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Destination</label>
              <p className="font-medium text-gray-900">{request?.organization?.name || "Hospital"}</p>
              <p className="text-xs text-gray-400">{request?.organization?.address || "Address not available"}</p>
            </div>
            <hr className="border-gray-100" />
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Supplying</label>
              <p className="font-medium text-gray-900">{offerDetails.units} Pints of {request?.blood_group}</p>
            </div>
            <hr className="border-gray-100" />

            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Selected Rider</label>
                <p className="font-medium text-gray-900">{rider.user.first_name} {rider.user.last_name}</p>
              </div>
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold">{rider.vehicle_type}</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Product Fee</span>
              <span className="font-bold text-gray-900">₦{offerDetails.productFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping Fee (Rider)</span>
              <span className="font-bold text-gray-900">₦{shippingFee.toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-200 my-2 pt-2 flex justify-between text-base">
              <span className="font-bold text-blue-600">Total Offer Amount</span>
              <span className="font-bold text-blue-600">₦{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={onClose} variant="ghost" className="flex-1" disabled={loading}>Go Back</Button>
            <Button onClick={onProceed} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold" disabled={loading}>
              {loading ? (
                <> <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting... </>
              ) : "Submit Offer"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Riders() {
  const navigate = useNavigate();
  const location = useLocation();
  // Tab state removed - using static tabs for now
  const [riders, setRiders] = useState<Rider[]>([]);
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Retrieve data passed from previous screen
  const { request, offerDetails } = location.state || {}; // { request, offerDetails: { units, productFee } }

  useEffect(() => {
    if (!request || !offerDetails) {
      // Redirect if accessed directly without data
      toast.error("Invalid session. Please start from Requests.");
      navigate("/blood-bank/hospital-requests");
      return;
    }
    fetchRiders();
  }, [request, offerDetails]);

  const fetchRiders = async () => {
    setLoading(true);
    try {
      // Fetch real riders
      // Endpoint typically /riders or /riders/available
      const response = await authInstance.get("/riders", { params: { status: 'Available' } });
      setRiders(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch riders", error);
      // Fallback or empty
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRider = (rider: Rider) => {
    setSelectedRider(rider);
    setIsConfirmOpen(true);
  };

  const handleSubmitOffer = async () => {
    if (!request || !selectedRider) return;

    setSubmitting(true);
    try {
      // Assuming shipping fee is fixed at 5000 for now as per modal logic
      const shippingFee = 5000;

      await OfferService.submitOffer(request.id, {
        product_fee: offerDetails.productFee,
        shipping_fee: shippingFee,
        card_charge: 0,
        notes: `Rider: ${selectedRider.user.first_name} ${selectedRider.user.last_name} (${selectedRider.vehicle_type})`
      });

      setIsConfirmOpen(false);
      setIsPaymentSuccessOpen(true); // Reuse this modal as "Offer Sent Success"
    } catch (error: any) {
      console.error("Failed to submit offer", error);
      toast.error(error.response?.data?.message || "Failed to submit offer");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setIsPaymentSuccessOpen(false);
    navigate("/blood-bank/hospital-requests"); // Return to list
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Select Delivery Rider</h2>
          <p className="text-sm text-gray-500">Assign a rider to fulfill this order</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl p-2 flex justify-start items-center px-4 gap-4 w-fit">
        <button className="px-8 py-3 rounded-lg font-bold text-sm bg-[#FFD600] text-gray-900">
          Available Riders ({riders.length})
        </button>
      </div>

      <div className="flex gap-8">
        {/* Main Content - Riders List */}
        <div className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[500px]">

          <div className="relative mb-6">
            <input type="text" placeholder="Search riders..." className="w-full bg-gray-100 pl-4 pr-10 py-3 rounded-xl text-sm focus:outline-none" />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-10"><Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" /></div>
            ) : riders.length > 0 ? (
              riders.map((rider) => (
                <div key={rider.id} className="border border-blue-100 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between hover:border-blue-300 transition-colors gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={rider.user.profile_picture_url || `https://ui-avatars.com/api/?name=${rider.user.first_name}+${rider.user.last_name}&background=random`}
                      alt={rider.user.first_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-gray-900 font-bold text-sm">
                        {rider.user.first_name} {rider.user.last_name}
                      </h3>
                      <p className="text-gray-400 text-xs">{rider.vehicle_type} • {rider.status}</p>
                    </div>
                    {/* Placeholder Price Chip */}
                    <span className="bg-[#FFD600] text-gray-900 text-xs font-bold px-3 py-1 rounded-md ml-2">
                      ₦5,000
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                      Call
                    </button>
                    <button
                      onClick={() => handleSelectRider(rider)}
                      className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-xs font-bold transition-colors shadow-blue-200 shadow-sm"
                    >
                      Select Rider
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-gray-400">
                <p>No available riders found.</p>
                {/* Fallback to Mock Data if no API data for demo purposes? Or instruct user to add riders */}
                <p className="text-xs mt-2">Ensure riders are registered and set to 'Available'.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmDeliveryModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onProceed={handleSubmitOffer}
        rider={selectedRider}
        offerDetails={offerDetails}
        request={request}
        loading={submitting}
      />

      <PaymentSuccessModal
        isOpen={isPaymentSuccessOpen}
        onClose={handleSuccessClose}
      />
    </div>
  );
}
