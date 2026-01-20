import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Internal Toggle Component
const ToggleSwitch = ({
  initial = false,
  label,
}: {
  initial?: boolean;
  label: string;
}) => {
  const [isOn, setIsOn] = useState(initial);
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-2">
        <span className="text-gray-700 text-sm font-medium">{label}</span>
        <HelpCircle className="w-3 h-3 text-gray-400" />
      </div>
      <button
        onClick={() => setIsOn(!isOn)}
        className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
          isOn ? "bg-blue-600" : "bg-gray-200"
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${
            isOn ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

// Internal Accordion Item Component
const AccordionItem = ({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-50 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-left"
      >
        <span className="text-gray-700 text-sm font-medium">{label}</span>
        <div className="text-gray-400 text-xs flex items-center gap-2">
          {/* If we had specific text like "Everyone" or "Show" shown in screenshots */}
          <span>{isOpen ? "Hide" : "Show"}</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </button>
      {isOpen && <div className="pb-4 text-sm text-gray-500">{children}</div>}
    </div>
  );
};

export default function RegulatoryBodySettings() {
  const notifications = [
    "Blood Stock Alerts",
    "Fraud and Anomaly Detection",
    "Emergency Blood Requests",
    "Event Participation",
    "Donor Retention Milestones",
    "Donor Feedback",
    "Donation Drive Performance",
    "Emergency Notification",
    "New Donor Registrations",
    "System Updates & Maintenance",
    "Regional Shortage Warning",
    "Blood Replenishment Updates",
  ];

  return (
    <div className="p-4 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Notifications Section */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-6">
          <h3 className="text-blue-600 font-semibold uppercase text-sm mb-6">
            NOTIFICATIONS & ALERTS PREFERENCE
          </h3>
          <div className="space-y-1">
            {notifications.map((item, idx) => (
              <ToggleSwitch key={idx} label={item} initial={idx < 8} /> // Randomize initial state slightly
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Privacy and Security Section */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-6">
          <h3 className="text-gray-900 font-semibold text-sm mb-6">
            Privacy and Security
          </h3>
          <div className="space-y-1">
            <AccordionItem label="Blood Inventory">
              <p>Visibility settings for blood inventory.</p>
            </AccordionItem>
            <AccordionItem label="Contact Information">
              <p>Visibility settings for contact information.</p>
            </AccordionItem>
            <AccordionItem label="License Number">
              <p>Visibility settings for License Number.</p>
            </AccordionItem>
            <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
              <span className="text-gray-700 text-sm font-medium">
                Who can message you?
              </span>
              <span className="text-gray-400 text-xs flex items-center gap-1">
                Everyone <ChevronDown className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
              <span className="text-gray-700 text-sm font-medium">
                Change Password
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help and Support Section */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-6">
          <h3 className="text-gray-900 font-semibold text-sm mb-6">
            Help and Support
          </h3>
          <div className="space-y-4">
            <div className="text-gray-600 text-sm py-2 cursor-pointer hover:text-blue-600">
              Customer support
            </div>
            <div className="text-gray-600 text-sm py-2 cursor-pointer hover:text-blue-600">
              Leave a complaint
            </div>
            <div className="text-gray-600 text-sm py-2 cursor-pointer hover:text-blue-600">
              Visit our Website
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
