import { useState } from "react";
import {
  ChevronDown,
  Linkedin,
  Twitter,
  Facebook,
  Link as LinkIcon,
} from "lucide-react";

// Simple Toggle Switch Component
const ToggleSwitch = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <div className="flex items-center justify-between py-3">
    <span className="text-gray-600 text-sm font-medium">{label}</span>
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        checked ? "bg-blue-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`${
          checked ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </button>
  </div>
);

const AdminSettings = () => {
  // Notification States
  const [notifications, setNotifications] = useState({
    bloodRequests: true,
    messages: true,
    bloodBanks: true,
    scheduledDonations: true,
    walkInDonations: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Left Column: Settings Sections */}
      <div className="xl:col-span-2 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>

        {/* Notifications and Alerts */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Notifications and Alerts
          </h2>
          <div className="space-y-1">
            <ToggleSwitch
              label="Receive notifications for blood requests"
              checked={notifications.bloodRequests}
              onChange={() => toggleNotification("bloodRequests")}
            />
            <ToggleSwitch
              label="Receive message notifications"
              checked={notifications.messages}
              onChange={() => toggleNotification("messages")}
            />
            <ToggleSwitch
              label="Receive notifications from blood banks"
              checked={notifications.bloodBanks}
              onChange={() => toggleNotification("bloodBanks")}
            />
            <ToggleSwitch
              label="Receive notifications of scheduled donations"
              checked={notifications.scheduledDonations}
              onChange={() => toggleNotification("scheduledDonations")}
            />
            <ToggleSwitch
              label="Receive notifications of walk in donations"
              checked={notifications.walkInDonations}
              onChange={() => toggleNotification("walkInDonations")}
            />
          </div>
        </div>

        {/* Privacy and Security */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Privacy and Security
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
              <span className="text-gray-600 text-sm">Blood Inventory</span>
              <div className="flex items-center gap-2 text-gray-500 text-sm cursor-pointer hover:text-gray-700">
                Show <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
              <span className="text-gray-600 text-sm">Contact Information</span>
              <div className="flex items-center gap-2 text-gray-500 text-sm cursor-pointer hover:text-gray-700">
                Show <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
              <span className="text-gray-600 text-sm">License Number</span>
              <div className="flex items-center gap-2 text-gray-500 text-sm cursor-pointer hover:text-gray-700">
                Show <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
              <span className="text-gray-600 text-sm">
                Who can message you?
              </span>
              <div className="flex items-center gap-2 text-gray-500 text-sm cursor-pointer hover:text-gray-700">
                Everyone <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <div className="flex justify-between items-center py-2 pt-4">
              <span className="text-gray-600 text-sm">Change Password</span>
            </div>
          </div>
        </div>

        {/* Help and Support */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Help and Support
          </h2>
          <div className="space-y-4">
            <div className="py-2 cursor-pointer text-gray-600 text-sm hover:text-blue-600 transition-colors">
              Customer support
            </div>
            <div className="py-2 cursor-pointer text-gray-600 text-sm hover:text-blue-600 transition-colors">
              Leave a complaint
            </div>
            <div className="py-2 cursor-pointer text-gray-600 text-sm hover:text-blue-600 transition-colors">
              Visit our Website
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Promo and Share */}
      <div className="space-y-6 pt-10">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          {/* Promo Image Area */}
          <div className="relative h-48 bg-gray-200">
            {/* Placeholder for the medical test image */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10 p-6 flex flex-col justify-center text-white">
              <p className="text-xs font-bold uppercase mb-1">
                FREE MEDICAL TEST
              </p>
              <h3 className="text-lg font-bold leading-tight mb-2">
                Get your free medical test at HTPS Hospital
              </h3>
              <button className="bg-white text-blue-600 text-[10px] font-bold px-3 py-1 rounded w-fit">
                Click to find out more.
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Medical Test"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Carousel Indicators Mock */}
          <div className="flex justify-center gap-1 py-4">
            <div className="w-6 h-1 bg-[#FFD600] rounded-full"></div>
            <div className="w-6 h-1 bg-gray-200 rounded-full"></div>
            <div className="w-6 h-1 bg-gray-200 rounded-full"></div>
          </div>

          <div className="px-6 pb-6">
            <button className="w-full bg-[#3B82F6] hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors">
              Proceed
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 mb-3">Share</h3>
          <div className="flex gap-4">
            <button className="text-gray-400 hover:text-[#0A66C2] transition-colors">
              <Linkedin className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-black transition-colors">
              <Twitter className="w-5 h-5" />
            </button>{" "}
            {/* X Icon usually represented by Twitter logic or custom SVG, using Twitter for now */}
            <button className="text-gray-400 hover:text-[#1877F2] transition-colors">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <LinkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
