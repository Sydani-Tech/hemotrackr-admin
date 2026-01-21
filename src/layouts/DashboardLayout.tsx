import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../features/donor/layout/Sidebar";
import {
  MessageCircle,
  Bell,
  Search,
  Calendar,
} from "lucide-react";

const DashboardLayout = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close notifications on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const notifications = [
    {
      id: 1,
      title: "Donor Appointment",
      message: "Your appointment has been secured",
      time: "Tuesday, June 14, 2024 18:16:1",
      icon: Calendar,
      type: "appointment",
    },
    // ... other notifications
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <div className="space-y-1.5">
                <span className="block w-6 h-0.5 bg-gray-600"></span>
                <span className="block w-6 h-0.5 bg-gray-600"></span>
                <span className="block w-6 h-0.5 bg-gray-600"></span>
              </div>
            </button>
            {/* Header Left Content (if any) */}
          </div>

          <div className="flex-1 px-4 lg:px-12">
            <div className="flex lg:flex-col flex-row items-center lg:items-start gap-2 lg:gap-0">
              <h1 className="lg:text-lg text-sm font-bold text-gray-900">
                Good Morning
              </h1>
              <p className="lg:text-sm text-xs text-gray-500">
                Welcome back, Preye
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MessageCircle className="w-6 h-6" />
            </button>

            <div className="relative" ref={notificationRef}>
              <button
                className="text-gray-400 hover:text-gray-600 relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-6 h-6" />
                {/* Notification Dot */}
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {/* Notifications Modal */}
              {showNotifications && (
                <div className="absolute top-10 right-0 w-96 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between p-3 border-b border-gray-50">
                    <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wider">
                      Notifications
                    </h3>
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        navigate("/donor/notifications");
                      }}
                      className="text-blue-500 text-xs font-bold hover:underline"
                    >
                      See all
                    </button>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer mb-1 last:mb-0"
                      >
                        <div className="flex gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              item.type === "appointment"
                                ? "bg-blue-100 text-blue-600"
                                : item.type === "request"
                                  ? "bg-gray-100 text-gray-600"
                                  : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4
                              className={`text-sm font-bold ${
                                item.type === "appointment"
                                  ? "text-blue-600"
                                  : "text-gray-800"
                              }`}
                            >
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                              {item.message}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-2">
                              {item.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="https://ui-avatars.com/api/?name=Preye&background=random"
                alt="Profile"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
