import { Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HealthFacilities = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Blood Donation (Pint)",
      value: "3465",
      trend: "up",
      filter: "Today",
    },
    {
      title: "Total Blood Requests",
      value: "3465",
      trend: "down",
      filter: "Today",
    },
    {
      title: "Total Number of Facilities",
      value: "3,632",
      change: "12%",
      isPositive: true,
      icon: Building2,
    },
  ];

  const facilities = [
    {
      id: 1,
      name: "University of Port harcourt Teaching Hospital",
      location: "Rivers State - Port harcourt",
      date: "9 - Sep - 2024, 13:02",
    },
    {
      id: 2,
      name: "Lily Hospital Benin",
      location: "Edo - Uribi Street Benin",
      date: "9 - Sep - 2024, 11:02",
    },
    {
      id: 3,
      name: "Westend Hospital",
      location: "Lagos - Lekki",
      date: "9 - Sep - 2024, 13:02",
    },
    {
      id: 4,
      name: "University of Port harcourt Teaching Hospital",
      location: "Rivers State - Port harcourt",
      date: "9 - Sep - 2024, 13:02",
    },
    // Add more mock data as needed
  ];

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-500 text-sm">{stat.title}</span>
              {stat.filter && (
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">
                  {stat.filter}
                </span>
              )}
              {stat.icon && (
                <div className="w-10 h-10 bg-[#FFD600] rounded-full flex items-center justify-center text-white">
                  <stat.icon className="w-5 h-5 text-gray-900" />
                </div>
              )}
            </div>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              {stat.change && (
                <span
                  className={`text-xs font-medium mb-1 ${
                    stat.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.change} ↑
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Facilities List Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-gray-500 font-bold text-sm uppercase tracking-wider">
            HEALTH FACILITIES
          </h2>
          <button className="text-green-500 text-sm font-bold hover:underline">
            See all
          </button>
        </div>

        <div className="space-y-4 p-6">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors border border-gray-50"
            >
              <div className="mb-4 md:mb-0">
                <h3 className="font-bold text-gray-900">{facility.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {facility.location} • {facility.date}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    navigate(`/admin/health-facilities/${facility.id}`)
                  }
                  className="px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
                >
                  View Profile
                </button>
                <button className="px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors">
                  Message
                </button>
                <button className="px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors">
                  Action
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthFacilities;
