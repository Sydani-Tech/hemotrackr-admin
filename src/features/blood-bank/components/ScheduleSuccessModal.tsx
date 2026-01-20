import React from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

interface ScheduleSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleSuccessModal: React.FC<ScheduleSuccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-8 w-full max-w-sm flex flex-col items-center text-center shadow-2xl animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-medium text-gray-900 mb-6">Accepted</h2>

        <div className="relative mb-6">
          {/* Particles/Decorations */}
          <div className="absolute -top-2 -right-4 w-2 h-2 bg-blue-500 rounded-full" />
          <div className="absolute top-4 -left-6 w-1.5 h-1.5 bg-blue-300 rounded-full" />
          <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-blue-600 rounded-full" />
          <div className="absolute bottom-6 -right-6 w-1.5 h-1.5 bg-blue-400 rounded-full" />

          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
            <Check className="w-10 h-10 text-white stroke-4" />
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-8 font-medium">
          Donation Accepted
        </p>

        <div className="space-y-3 w-full">
          <button
            onClick={() => navigate("/blood-bank/dashboard")}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors"
          >
            Back to Menu
          </button>
          <button
            onClick={() => navigate("/blood-bank/dashboard")}
            className="w-full py-3 bg-gray-200 text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-300 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSuccessModal;
