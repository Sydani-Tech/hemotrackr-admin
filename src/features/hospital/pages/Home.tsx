import { useNavigate, Link } from "react-router-dom";
import {
  Droplet,
  AlertCircle,
  Clock,
  Building2,
  Layers,
  Users,
} from "lucide-react";
import MedicalTestModal from "../components/MedicalTestModal";

// import blood from "../../assets/icons/blood.svg";

const Home = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Request Blood",
      icon: Droplet,
      path: "/hospital/make-request",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Donor Request",
      icon: AlertCircle, // Placeholder
      path: "/hospital/donations",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "My Requests",
      icon: Clock,
      path: "/hospital/requests",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Hospital Requests",
      icon: Building2,
      path: "/hospital/hospital-requests",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Manage Inventory",
      icon: Layers,
      path: "/hospital/inventory",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Update Donors Info",
      icon: Users,
      path: "/hospital/update-donor",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
  ];

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
              <h2 className="text-lg font-bold text-gray-900">
                Blood Inventory
              </h2>
              <Link
                to="/hospital/inventory"
                className="text-blue-500 text-sm font-medium hover:underline"
              >
                See all
              </Link>
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-xl p-4 flex items-center justify-between border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg ${
                        item === 2
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-200 text-gray-600"
                      } flex items-center justify-center font-bold text-lg`}
                    >
                      {item === 2 ? "O+" : "A-"}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-700">
                        Uniport Teaching Hospital
                      </h4>
                      <p className="text-xs text-gray-400">
                        {item === 2 ? "2 pint" : "20 pints"} • 9 - Sep - 2022,
                        13:02
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="bg-green-100 text-green-700 px-6 py-2 rounded-lg text-xs font-semibold hover:bg-green-200 transition-colors">
                      Accept Request
                    </button>
                    <button className="bg-blue-100 text-blue-700 px-6 py-2 rounded-lg text-xs font-semibold hover:bg-blue-200 transition-colors">
                      Message
                    </button>
                  </div>
                </div>
              ))}
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
