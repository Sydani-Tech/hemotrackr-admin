import { useState } from "react";
import { ChevronDown } from "lucide-react";

const AccountSupport = () => {
  const [toggles, setToggles] = useState({
    requests: true,
    messages: true,
    bloodBanks: true,
    scheduled: true,
    walkIn: true,
  });

  const toggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards">
      {/* Notification Section */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 mb-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Notifications and Alerts
        </h3>

        <div className="space-y-6">
          {[
            {
              label: "Receive notifications for blood requests",
              key: "requests",
            },
            { label: "Receive message notifications", key: "messages" },
            {
              label: "Receive notifications from blood banks",
              key: "bloodBanks",
            },
            {
              label: "Receive notifications of Upcoming scheduled donations",
              key: "scheduled",
            },
            {
              label: "Receive notifications of Upcoming walk in donations",
              key: "walkIn",
            },
          ].map((item: any) => (
            <div key={item.key} className="flex items-center justify-between">
              <span className="text-sm text-gray-500 font-medium">
                {item.label}
              </span>
              <button
                onClick={() => toggle(item.key)}
                className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none ${
                  toggles[item.key as keyof typeof toggles]
                    ? "bg-blue-600"
                    : "bg-gray-200"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${
                    toggles[item.key as keyof typeof toggles]
                      ? "translate-x-5"
                      : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy and Security */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 mb-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Privacy and Security
        </h3>
        <div className="space-y-5">
          {[
            { label: "Donation history", value: "Show" },
            { label: "Contact information", value: "Show" },
            { label: "Medical record", value: "Show" },
            { label: "Who can message you?", value: "Everyone" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between group cursor-pointer"
            >
              <span className="text-sm text-gray-500 font-medium group-hover:text-blue-600 transition-colors">
                {item.label}
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>{item.value}</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          ))}
          <div className="pt-2">
            <button className="text-sm text-gray-500 font-medium hover:text-blue-600 transition-colors">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Help and Support */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Help and Support
        </h3>
        <div className="space-y-4">
          {["Customer support", "Leave a complaint", "Visit our Website"].map(
            (item, i) => (
              <div key={i} className="cursor-pointer">
                <span className="text-sm text-gray-500 font-medium hover:text-blue-600 transition-colors">
                  {item}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSupport;
