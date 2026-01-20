import { ArrowLeft, Search, User } from "lucide-react";
import MedicalTestModal from "../components/MedicalTestModal";
import { useNavigate, Link } from "react-router-dom";

const recentDonors = [
  {
    id: 1,
    name: "Caleb Oko Jumbo",
    details: "2 pints • 9 - Sep - 2022, 13:02",
  },
  { id: 2, name: "Matthew Prince", details: "2 pints • 9 - Sep - 2022, 13:02" },
  {
    id: 3,
    name: "Caleb Oko Jumbo",
    details: "2 pints • 9 - Sep - 2022, 13:02",
  },
  { id: 4, name: "Pualinus Abel", details: "2 pints • 9 - Sep - 2022, 13:02" },
  { id: 5, name: "Cynthis Sagay", details: "2 pints • 9 - Sep - 2022, 13:02" },
  {
    id: 6,
    name: "Godspower Emetukudor",
    details: "2 pints • 9 - Sep - 2022, 13:02",
  },
  { id: 7, name: "Boma Batubo", details: "2 pints • 9 - Sep - 2022, 13:02" },
];

export default function UpdateDonor() {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Main Content */}
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-3xl font-serif text-gray-900">
            Update user info
          </h2>
        </div>
        <div className=" bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          {/* Search Bar */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-100 rounded-xl py-3 px-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-gray-200"
            />
            <Search className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
          </div>

          {/* List Header */}
          <div className="flex items-center justify-between text-xs font-semibold text-gray-400 mb-4 px-2">
            <span>ALL USERS</span>
            <div className="flex items-center gap-1 cursor-pointer">
              <span className="text-gray-900">Recent Donors</span>
            </div>
          </div>

          {/* Donors List */}
          <div className="space-y-4">
            {recentDonors.map((donor) => (
              <div
                key={donor.id}
                className="flex items-center justify-between py-4 border-b border-gray-200 last:border-0 hover:bg-gray-50/50 px-2 rounded transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                    <User className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">
                      {donor.name}
                    </h3>
                    <p className="text-xs text-gray-400">{donor.details}</p>
                  </div>
                </div>

                <Link
                  to={`/hospital/update-donor/${donor.id}`}
                  className="text-blue-500 hover:text-blue-700 font-medium text-xs bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors"
                >
                  Update Info
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Ad & Share */}
      <MedicalTestModal />
    </div>
  );
}
