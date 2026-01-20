import { Button } from "@/components/ui/button";
import { Bell, ChevronLeft, MessageCircle, Search } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentSuccessModal from "../../components/PaymentSuccessfulModal";

// --- Mock Data ---

const savedRiders = [
  {
    id: 1,
    name: "Abayomi Ayodele",
    hospital: "BHM - HSG Hospital",
    price: 4500,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Abayomi Ayodele",
    hospital: "BHM - HSG Hospital",
    price: 4500,
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Abayomi Ayodele",
    hospital: "BHM - HSG Hospital",
    price: 4500,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Abayomi Ayodele",
    hospital: "BHM - HSG Hospital",
    price: 4500,
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Abayomi Ayodele",
    hospital: "BHM - HSG Hospital",
    price: 4500,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
];

// --- Components ---

interface ConfirmDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  rider: (typeof savedRiders)[0] | null;
}

const ConfirmDeliveryModal: React.FC<ConfirmDeliveryModalProps> = ({
  isOpen,
  onClose,
  onProceed,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div
        className="absolute inset-0  transition-opacity -z-10"
        onClick={onClose}
      />
      <div
        className="
    bg-white
    rounded-sm
    h-[85vh]
    w-full
    max-w-lg
    shadow-2xl
    overflow-hidden
    animate-in fade-in zoom-in duration-200
  "
      >
        <div
          className="
      h-full
      overflow-y-auto
      transition-all
      duration-300

      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-thumb]:bg-gray-400/50
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-track]:bg-gray-100
    "
        >
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-center font-bold text-gray-800 text-sm uppercase">
              Confirm Delivery Details
            </h2>
          </div>

          <div className="p-5 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">
                  Delivery Address
                </label>
                <p className="text-sm text-gray-400 font-medium">
                  BMH HOSPITAL - No 15 Agreey Road, Port Harcourt
                </p>
              </div>
              <hr className="border-gray-100" />

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">
                  Delivery Number
                </label>
                <p className="text-sm text-gray-400 font-medium">
                  234812343002
                </p>
              </div>
              <hr className="border-gray-100" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase block mb-1">
                      Blood Type
                    </label>
                    <p className="text-sm text-gray-400 font-medium">A+</p>
                  </div>
                  {/* Badge Icons */}
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold border-2 border-white z-10">
                      A
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white">
                      <img
                        src="https://i.pravatar.cc/150?img=60"
                        alt="icon"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr className="border-gray-100" />

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">
                  Blood Amount
                </label>
                <p className="text-sm text-gray-400 font-medium">
                  10 Pint of Blood
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <hr className="border-dashed border-gray-200" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-bold">PRODUCT FEE</span>
                <span className="font-bold text-gray-900">30,000</span>
              </div>
              <hr className="border-dashed border-gray-200" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-bold">SHIPPING FEE</span>
                <span className="font-bold text-gray-900">5,000</span>
              </div>
              <hr className="border-dashed border-gray-200" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-bold">CARD CHARGE</span>
                <span className="font-bold text-gray-900">1,000</span>
              </div>
              <hr className="border-dashed border-gray-200" />
              <div className="flex justify-between items-center text-sm text-blue-600">
                <span className="font-bold">GRAND TOTAL</span>
                <span className="font-bold">36,000</span>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <Button
                onClick={onProceed}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md"
              >
                Proceed to Payment
              </Button>
              <Button
                onClick={onClose}
                variant="ghost"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-md"
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Riders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Saved Riders");
  const [selectedRider, setSelectedRider] = useState<
    (typeof savedRiders)[0] | null
  >(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(false);

  const handleSelectRider = (rider: (typeof savedRiders)[0]) => {
    setSelectedRider(rider);
    setIsConfirmOpen(true);
  };

  const handleProceedPayment = () => {
    setIsConfirmOpen(false);
    setIsPaymentSuccessOpen(true);
  };

  const handlePaymentClose = () => {
    setIsPaymentSuccessOpen(false);
    navigate("/hospital/dashboard");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">Good Morning</h1>
          <p className="text-sm text-gray-500">
            Welcome back, UNIPORT Teaching Hospital
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
            />
          </div>
          <button className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-blue-500 hover:bg-gray-50 transition-colors">
            <MessageCircle className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-blue-500 hover:bg-gray-50 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl p-2 flex justify-start items-center px-4 gap-4 w-fit">
        <button
          onClick={() => setActiveTab("Current Riders")}
          className={`px-8 py-3 rounded-lg font-bold text-sm transition-colors ${
            activeTab === "Current Riders"
              ? "bg-[#FFD600] text-gray-900"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          Current Riders
        </button>
        <button
          onClick={() => setActiveTab("Saved Riders")}
          className={`px-8 py-3 rounded-lg font-bold text-sm transition-colors ${
            activeTab === "Saved Riders"
              ? "bg-[#FFD600] text-gray-900"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          Saved Riders
        </button>
      </div>

      <div className="flex gap-8">
        {/* Main Content - Riders List */}
        <div className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[500px]">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900">Choose rider</h2>
          </div>

          {/* Search in Content */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-100 pl-4 pr-10 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <div className="space-y-4">
            {savedRiders.map((rider) => (
              <div
                key={rider.id}
                className="border border-blue-100 rounded-xl p-4 flex items-center justify-between hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={rider.avatar}
                    alt={rider.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-gray-900 font-bold text-sm">
                      {rider.name}
                    </h3>
                    <p className="text-gray-400 text-xs">{rider.hospital}</p>
                  </div>
                  <span className="bg-[#FFD600] text-gray-900 text-xs font-bold px-3 py-1 rounded-md ml-4">
                    {rider.price.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="bg-green-100 text-green-700 hover:bg-green-200 px-6 py-2 rounded-lg text-xs font-bold transition-colors">
                    Call
                  </button>
                  <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-6 py-2 rounded-lg text-xs font-bold transition-colors">
                    Save rider
                  </button>
                  <button
                    onClick={() => handleSelectRider(rider)}
                    className="bg-[#C6C8D6] hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg text-xs font-bold transition-colors"
                  >
                    Select rider
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-4">
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                1135 x 445 Hug
              </span>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Empty or promo */}
        <div className="w-80 hidden xl:block">
          {/* Placeholder for right sidebar content if any */}
        </div>
      </div>

      <ConfirmDeliveryModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onProceed={handleProceedPayment}
        rider={selectedRider}
      />

      <PaymentSuccessModal
        isOpen={isPaymentSuccessOpen}
        onClose={handlePaymentClose}
      />
    </div>
  );
}
