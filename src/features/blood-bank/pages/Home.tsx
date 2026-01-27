import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BloodBankAPI } from "../../../core/services/BloodBankService";
import {
  Droplet,
  AlertCircle,
  Clock,
  Building2,
  Layers,
  Users,
} from "lucide-react";
import MedicalTestModal from "../components/MedicalTestModal";

const Home = () => {
  const navigate = useNavigate();
  const [recentRequests, setRecentRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await BloodBankAPI.getDashboardStats();
      setRecentRequests(response.data.recent_requests || []);
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMessage = (userId: number) => {
    // Navigate to chat, passing userId as query param
    navigate(`/blood-bank/messages?userId=${userId}`);
  };

  const menuItems = [
    {
      title: "Request Blood",
      icon: Droplet,
      path: "/blood-bank/make-request",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Donor Request",
      icon: AlertCircle, // Placeholder
      path: "/blood-bank/donations",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "My Requests",
      icon: Clock,
      path: "/blood-bank/requests",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Request Marketplace",
      icon: Building2,
      path: "/blood-bank/all-requests",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Manage Inventory",
      icon: Layers,
      path: "/blood-bank/inventory",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Update Donors Info",
      icon: Users,
      path: "/blood-bank/update-donor",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
  ];

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  return (
    <>
      <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 b">
        {/* Main Column */}
        <div className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-3xl font-serif text-gray-900 mb-8">
            Bloodbank Mode
          </h2>

          {/* Menu Grid */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className="bg-white border border-blue-100 rounded-2xl p-6 h-40 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center`}
                >
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </span>
              </div>
            ))}
          </div>

          {/* Recent Request */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-serif text-gray-900">
                Recent Request:
              </h3>
              <button
                onClick={() => navigate("/blood-bank/hospital-requests")}
                className="text-blue-500 text-sm font-semibold hover:underline"
              >
                See all request
              </button>
            </div>

            <div className="space-y-4">
              {recentRequests.length === 0 ? (
                <div className="text-gray-500 text-center py-8">No pending requests</div>
              ) : (
                recentRequests.map((item) => {
                  const req = item.blood_request; // content is inside blood_request relation
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-4 flex items-center justify-between border border-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg ${req.blood_group === "AB+"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-200 text-gray-600"
                            } flex items-center justify-center font-bold text-lg`}
                        >
                          {req.blood_group}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-700">
                            {req.organization?.name || "Unknown Hospital"}
                          </h4>
                          <p className="text-xs text-gray-400">
                            {req.units_needed} pint{req.units_needed > 1 ? 's' : ''} • {new Date(item.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => navigate("/blood-bank/hospital-requests")}
                          className="bg-green-100 text-green-700 px-6 py-2 rounded-lg text-xs font-semibold hover:bg-green-200 transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleMessage(req.organization?.user?.id)}
                          className="bg-blue-100 text-blue-700 px-6 py-2 rounded-lg text-xs font-semibold hover:bg-blue-200 transition-colors"
                        >
                          Message
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Ad & Share */}
        <MedicalTestModal />
      </div>
    </>
  );
};

export default Home;
