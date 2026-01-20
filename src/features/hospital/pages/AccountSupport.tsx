import { ChevronRight } from "lucide-react";
import { useState } from "react";
import MedicalTestModal from "../components/MedicalTestModal";

const ToggleSwitch = ({
  label,
  defaultChecked = true,
}: {
  label: string;
  defaultChecked?: boolean;
}) => {
  const [enabled, setEnabled] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-4">
      <span className="text-gray-600 text-sm">{label}</span>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-11 h-6 flex items-center rounded-full px-1 transition-colors ${
          enabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`w-4 h-4 bg-white rounded-full transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

export default function AccountSupport() {
  return (
    <div className="grid grid-cols-3 gap-8 animate-in fade-in duration-500">
      {/* Left Column */}
      <div className="space-y-8 col-span-2">
        <div className="bg-white p-6 rounded-2xl">
          <h3 className="font-bold text-gray-800 mb-4">
            Notifications and Alerts
          </h3>
          <div className="divide-y divide-gray-50">
            <ToggleSwitch label="Receive notifications for blood requests" />
            <ToggleSwitch label="Receive message notifications" />
            <ToggleSwitch label="Receive notifications from blood banks" />
            <ToggleSwitch label="Receive notifications of scheduled donations" />
            <ToggleSwitch label="Receive notifications of walk in donations" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl">
          <h3 className="font-bold text-gray-800 mb-4">Privacy and Security</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Blood Inventory</span>
              <button className="text-gray-400 hover:text-gray-600 flex items-center gap-1">
                Show <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Contact Information</span>
              <button className="text-gray-400 hover:text-gray-600 flex items-center gap-1">
                Show <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>License Number</span>
              <button className="text-gray-400 hover:text-gray-600 flex items-center gap-1">
                Show <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Who can message you?</span>
              <button className="text-gray-400 hover:text-gray-600 flex items-center gap-1">
                Everyone <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="pt-2">
              <button className="text-gray-600 text-sm hover:text-blue-600">
                Change Password
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl">
          <h3 className="font-bold text-gray-800 mb-4">Help and Support</h3>
          <div className="space-y-4 text-sm text-gray-600">
            <button className="block hover:text-blue-600">
              Customer support
            </button>
            <button className="block hover:text-blue-600">
              Leave a complaint
            </button>
            <button className="block hover:text-blue-600">
              Visit our Website
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Ad & Share */}
      <MedicalTestModal />
    </div>
  );
}
