import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { MessageCircle, Bell, Search, Plus, User } from "lucide-react";
import { BloodBankAPI } from "@/core/services/BloodBankService";

const DashboardLayout = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [imageError, setImageError] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Fetch user data on mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const [profileRes, notificationsRes] = await Promise.all([
        BloodBankAPI.getProfile(),
        BloodBankAPI.getNotifications({ per_page: 5 }),
      ]);

      console.log("Profile Response:", profileRes.data);
      setUserProfile(profileRes.data);
      setNotifications(notificationsRes.data.data || notificationsRes.data || []);

      // Try to fetch unread messages count (may not exist yet)
      try {
        const messagesRes = await BloodBankAPI.getUnreadMessagesCount();
        setUnreadMessagesCount(messagesRes.data.count || 0);
      } catch {
        setUnreadMessagesCount(0);
      }
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

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

  // Get initials from name
  const getInitials = (name: string) => {
    if (!name) return "BB";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Profile Avatar Component with fallback
  const ProfileAvatar = () => {
    const name = userProfile?.user?.organization?.name || userProfile?.user?.first_name || "Blood Bank";
    const logoUrl = userProfile?.user?.organization?.logo_url;

    if (!logoUrl || imageError) {
      const initials = getInitials(name);
      return (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
          {initials}
        </div>
      );
    }

    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
        <img
          src={logoUrl}
          alt="Profile"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
        />
      </div>
    );
  };

  const organizationName = userProfile?.user?.organization?.name || userProfile?.user?.first_name || "Blood Bank";

  return (
    <div className="min-h-screen bg-gray-50">
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
          </div>

          <div className="flex-1 px-4 lg:px-12">
            <div className="flex lg:flex-col flex-row items-center lg:items-start gap-2 lg:gap-0">
              <h1 className="lg:text-lg text-sm font-bold text-gray-900">
                {getGreeting()}
              </h1>
              <p className="lg:text-sm text-xs text-gray-500">
                Welcome back, {organizationName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              className="text-gray-400 hover:text-gray-600 relative"
              onClick={() => navigate("/blood-bank/messages")}
            >
              <MessageCircle className="w-6 h-6" />
              {unreadMessagesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadMessagesCount > 9 ? '9+' : unreadMessagesCount}
                </span>
              )}
            </button>

            <div className="relative" ref={notificationRef}>
              <button
                className="text-gray-400 hover:text-gray-600 relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-6 h-6" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                )}
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
                        navigate("/blood-bank/notifications");
                      }}
                      className="text-blue-500 text-xs font-bold hover:underline"
                    >
                      See all
                    </button>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer mb-1 last:mb-0"
                        >
                          <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                              <Bell className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-gray-800">
                                {item.title || item.type || "Notification"}
                              </h4>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {item.message || item.data?.message || "New notification"}
                              </p>
                              <p className="text-[10px] text-gray-400 mt-2">
                                {item.created_at ? new Date(item.created_at).toLocaleString() : "Just now"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-gray-400 text-sm">
                        No notifications yet
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <ProfileAvatar />
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
