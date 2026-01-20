import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// --- Mock Data ---

const pendingRequests = [
  {
    id: 1,
    hospital: "Uniport Teaching Hospital",
    bloodType: "A-",
    amount: "20 pints",
    date: "9 - Sep - 2022, 13:02",
  },
  {
    id: 2,
    hospital: "Uniport Teaching Hospital",
    bloodType: "O+",
    amount: "2 pint",
    date: "9 - Sep - 2022, 13:02",
  },
  {
    id: 3,
    hospital: "Uniport Teaching Hospital",
    bloodType: "A-",
    amount: "20 pints",
    date: "9 - Sep - 2022, 13:02",
  },
  {
    id: 4,
    hospital: "Uniport Teaching Hospital",
    bloodType: "O+",
    amount: "2 pint",
    date: "9 - Sep - 2022, 13:02",
  },
  {
    id: 5,
    hospital: "Uniport Teaching Hospital",
    bloodType: "B+",
    amount: "20 pints",
    date: "9 - Sep - 2022, 13:02",
  },
];

// --- Components ---

interface ConfirmDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  request: (typeof pendingRequests)[0] | null;
}

const ConfirmDetailsModal: React.FC<ConfirmDetailsModalProps> = ({
  isOpen,
  onClose,
  onProceed,
  request,
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
          <div className="p-3  border-b border-gray-100">
            <h2 className="text-center font-bold text-gray-800 text-sm uppercase">
              Confirm Details
            </h2>
          </div>

          <div className="p-7 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">
                  Request Source
                </label>
                <p className="text-sm text-gray-400 font-medium">
                  12 Pint of Blood
                </p>
              </div>
              <hr className="border-gray-100" />

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">
                  Blood Type
                </label>
                <p className="text-sm text-gray-400 font-medium">
                  {request?.bloodType || "A+"}
                </p>
              </div>
              <hr className="border-gray-100" />

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
                <label className="text-xs font-bold text-gray-700 uppercase block mb-2">
                  Set Amount of Blood
                </label>
                <input
                  type="number"
                  placeholder="10"
                  className="w-full bg-gray-100 border-none rounded-sm px-4 py-3 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500/20"
                />
                <div className="flex gap-2 mt-2">
                  <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                    10 Pints
                  </span>
                  <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
                    5 Pints
                  </span>
                  <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
                    2 Pints
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <hr className="border-dashed border-gray-200" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-bold">PRODUCT FEE</span>
                <span className="font-bold text-gray-900">30,000</span>
              </div>
              <hr className="border-dashed border-gray-200" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-bold">SHIPPING FEE</span>
                <span className="bg-gray-100 px-2 py-1 rounded font-bold text-gray-900">
                  5000
                </span>
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold  rounded-md"
              >
                Proceed
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

export default function HospitalRequests() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Pending Requests");
  const [acceptedRequests, setAcceptedRequests] = useState<
    typeof pendingRequests
  >([]);
  const [requests, setRequests] = useState(pendingRequests);
  const [selectedRequest, setSelectedRequest] = useState<
    (typeof pendingRequests)[0] | null
  >(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleAcceptRequest = (id: number) => {
    // Move from pending to accepted
    const request = requests.find((r) => r.id === id);
    if (request) {
      setAcceptedRequests([...acceptedRequests, request]);
      setRequests(requests.filter((r) => r.id !== id));
      setActiveTab("Accepted Requests"); // Auto switch to show the accepted item
    }
  };

  const handleSetAmount = (request: (typeof pendingRequests)[0]) => {
    setSelectedRequest(request);
    setIsConfirmOpen(true);
  };

  const handleProceedToRiders = () => {
    setIsConfirmOpen(false);
    navigate("/hospital/hospital-requests/riders");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Tabs */}
      <div className="bg-white rounded-xl p-2 flex justify-start items-center px-4 gap-4 w-fit">
        <button
          onClick={() => setActiveTab("Pending Requests")}
          className={`px-8 py-2 rounded-lg font-bold text-sm transition-colors ${
            activeTab === "Pending Requests"
              ? "bg-[#FFD600] text-gray-900"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          Pending Requests
        </button>
        <button
          onClick={() => setActiveTab("Accepted Requests")}
          className={`px-8 py-2 rounded-lg font-bold text-sm transition-colors ${
            activeTab === "Accepted Requests"
              ? "bg-[#FFD600] text-gray-900"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          Accepted Requests
        </button>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 min-h-[500px]">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Blood requests</h2>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent pl-4 pr-10 py-2 text-sm focus:outline-none placeholder-gray-400"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="flex justify-between items-center text-xs font-bold text-gray-400 mb-4 px-4 uppercase">
          <span>Sort by</span>
          <span className="flex items-center gap-1 cursor-pointer">
            All Request <ChevronRight className="w-3 h-3 rotate-90" />
          </span>
        </div>

        <div className="space-y-4">
          {activeTab === "Pending Requests" &&
            requests.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-4 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-blue-600 text-lg">
                    {item.bloodType}
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold text-sm">
                      {item.hospital}
                    </h3>
                    <p className="text-gray-400 text-xs">
                      {item.amount} • {item.date}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleAcceptRequest(item.id)}
                    className="bg-green-200 text-green-700 hover:bg-green-200 px-6 py-2 rounded-sm text-xs font-bold transition-colors"
                  >
                    Accept Request
                  </button>

                  <button className="bg-[#C6C8D6] text-gray-800 hover:bg-gray-400 px-6 py-2 rounded-sm text-xs font-bold transition-colors">
                    Message
                  </button>
                </div>
              </div>
            ))}

          {activeTab === "Accepted Requests" &&
            acceptedRequests.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-4 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-blue-600 text-lg">
                    {item.bloodType}
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold text-sm">
                      {item.hospital}
                    </h3>
                    <p className="text-gray-400 text-xs">
                      {item.amount} • {item.date}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleSetAmount(item)}
                    className="bg-green-500 text-white hover:bg-green-600 px-6 py-2 rounded-lg text-xs font-bold transition-colors"
                  >
                    Set Amount
                  </button>
                  <button className="bg-[#C6C8D6] text-gray-800 hover:bg-gray-400 px-6 py-2 rounded-lg text-xs font-bold transition-colors">
                    Message
                  </button>
                </div>
              </div>
            ))}

          {/* Right Side Promo - Only visible on large layout if needed based on design, 
                     but design shows full width list with promo on right column in Dashboard generally.
                     Here we focus on the list as per image.
                  */}
        </div>

        {/* If Pending list is empty and we are on Pending tab */}
        {activeTab === "Pending Requests" && requests.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No pending requests
          </div>
        )}
        {activeTab === "Accepted Requests" && acceptedRequests.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No accepted requests yet. Accept some from Pending tab.
          </div>
        )}
      </div>

      <ConfirmDetailsModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onProceed={handleProceedToRiders}
        request={selectedRequest}
      />
    </div>
  );
}
