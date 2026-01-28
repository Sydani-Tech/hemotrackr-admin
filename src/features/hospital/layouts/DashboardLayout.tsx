import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { MessageCircle, Bell, Search, Plus, Info, AlertTriangle, CheckCircle2 } from "lucide-react";
import { HospitalAPI } from "@/core/services/HospitalService";
import { NotificationAPI } from "@/core/services/NotificationService";

const DashboardLayout = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [organizationName, setOrganizationName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
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

  // Fetch organization profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await HospitalAPI.getProfile();
        const org = response.data.organization;
        setOrganizationName(org?.name || "Hospital");
        setLogoUrl(org?.logo_url || "");
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await NotificationAPI.getNotifications({ per_page: 5 });
        const data = response.data.data || response.data || [];
        setNotifications(data);

        // Get unread count
        const countResponse = await NotificationAPI.getUnreadCount();
        setUnreadCount(countResponse.data.unread_count || 0);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'success':
      case 'approved':
        return CheckCircle2;
      case 'warning':
      case 'alert':
        return AlertTriangle;
      case 'request':
        return Plus;
      default:
        return Info;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 172800) return 'Yesterday';
    return date.toLocaleDateString();
  };

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
                {getGreeting()}
              </h1>
              <p className="lg:text-sm text-xs text-gray-500">
                Welcome back, {organizationName || "Hospital"}
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
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={() => navigate("/hospital/messages")}
            >
              <MessageCircle className="w-6 h-6" />
            </button>

            <div className="relative" ref={notificationRef}>
              <button
                className="text-gray-400 hover:text-gray-600 relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-6 h-6" />
                {/* Notification Dot */}
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>

              {/* Notifications Modal */}
              {showNotifications && (
                <div className="absolute top-10 right-0 w-96 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between p-3 border-b border-gray-50">
                    <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wider">
                      Notifications {unreadCount > 0 && `(${unreadCount})`}
                    </h3>
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        navigate("/hospital/notifications");
                      }}
                      className="text-blue-500 text-xs font-bold hover:underline"
                    >
                      See all
                    </button>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((item) => {
                        const IconComponent = getIcon(item.data?.type || item.type);
                        return (
                          <div
                            key={item.id}
                            className={`p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer mb-1 last:mb-0 ${!item.read_at ? 'bg-blue-50/50' : ''}`}
                          >
                            <div className="flex gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${!item.read_at ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-gray-800">
                                  {item.data?.title || "Notification"}
                                </h4>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {item.data?.message || ""}
                                </p>
                                <p className="text-[10px] text-gray-400 mt-2">
                                  {formatTime(item.created_at)}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-6 text-center text-gray-400 text-sm">
                        No notifications yet
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <img
                src={logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(organizationName || 'Hospital')}&background=random`}
                alt="Profile"
                className="w-full h-full object-cover"
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
