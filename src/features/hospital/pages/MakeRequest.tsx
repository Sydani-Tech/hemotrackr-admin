import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import RequestSuccess from "../components/RequestSuccess";
import MedicalTestModal from "../components/MedicalTestModal";

const MakeRequest = () => {
  const navigate = useNavigate();
  const [requestType, setRequestType] = useState("Blood");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  return (
    <div className="flex gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Main Form Area */}
      <div className="flex-1 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-8 top-8 w-8 h-8 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <div className="ml-16">
          <div className="relative mb-8 pt-2">
            <div className="border-2 border-blue-500 rounded-xl p-4 flex items-center">
              <h2 className="text-gray-700 font-medium">Make a request</h2>
            </div>
            <div className="absolute -top-3 right-6 bg-[#FFD600] text-xs font-bold px-3 py-1 rounded-md shadow-sm">
              Start
            </div>
          </div>

          <form className="space-y-6">
            {/* Request Type */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-2">
                Select Request Type
              </label>
              <div className="flex gap-3">
                {["Blood", "Platelets", "Bone Marrow"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setRequestType(type)}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                      requestType === type
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                        : "bg-blue-100 text-blue-400 hover:bg-blue-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Request Source */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-2">
                Request Source
              </label>
              <select className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-sm text-gray-600 focus:ring-2 focus:ring-blue-500/20">
                <option>Blood Bank</option>
                <option>Hospital</option>
              </select>
            </div>

            {/* Blood Group */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-2">
                Blood Group
              </label>
              <select className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-sm text-gray-600 focus:ring-2 focus:ring-blue-500/20">
                <option>Choose Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>

            {/* Genotype */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-2">
                Genotype
              </label>
              <select className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-sm text-gray-600 focus:ring-2 focus:ring-blue-500/20">
                <option>Choose Genotype</option>
                <option>AA</option>
                <option>AS</option>
                <option>SS</option>
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-2">
                Amount of Blood Needed (In Pints)
              </label>
              <input
                type="number"
                className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-sm text-gray-600 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Min Amount */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-2">
                Min Amount a Bank can send (In Pints)
              </label>
              <input
                type="number"
                className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-sm text-gray-600 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Needed By */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-2">
                Needed By
              </label>
              <input
                type="datetime-local"
                className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-sm text-gray-600 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="emergency"
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="emergency"
                className="text-blue-500 text-sm font-medium"
              >
                Mark as Emergency
              </label>
            </div>

            <button
              type="button"
              onClick={() => setIsConfirmOpen(true)}
              className="w-32 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-200"
            >
              Proceed
            </button>
          </form>
        </div>
      </div>

      {/* Right Sidebar - Ad & Share */}
      <MedicalTestModal/>

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm"
          onClick={() => setIsConfirmOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 w-full max-w-md animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-6">
              <div className="w-12 h-1 bg-gray-200 rounded-full" />
            </div>

            <h3 className="text-blue-600 font-bold text-center mb-8">
              Confirm Request Details
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-500 font-medium text-xs uppercase">
                  DETAILS
                </span>
                <span className="text-gray-500 font-medium text-xs uppercase">
                  AMOUNT
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-600 font-medium text-sm">
                  Request Type
                </span>
                <span className="text-gray-900 font-bold text-sm text-right">
                  {requestType}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-600 font-medium text-sm">
                  Request Source
                </span>
                <span className="text-gray-900 font-bold text-sm text-right">
                  Blood Donor
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-600 font-medium text-sm">
                  Blood group and Unit
                </span>
                <span className="text-gray-900 font-bold text-sm text-right">
                  A- / 5 Units
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-600 font-medium text-sm">
                  Needed by
                </span>
                <span className="text-gray-900 font-bold text-sm text-right">
                  10th Aug. 2024
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 font-medium text-sm">
                  Request by
                </span>
                <span className="text-gray-900 font-bold text-sm text-right">
                  BMH Hospital
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => {
                  setIsConfirmOpen(false);
                  setIsSuccessOpen(true);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl"
              >
                Upload Request
              </Button>
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-4 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <RequestSuccess
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </div>
  );
};

export default MakeRequest;
