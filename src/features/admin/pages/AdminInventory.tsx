import { useState } from "react";
import ReactECharts from "echarts-for-react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminInventory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Blood Type Chart Data
  const bloodTypeOption = {
    tooltip: { trigger: "axis" },
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    xAxis: {
      type: "category",
      data: [
        "A-Positive",
        "A-Negative",
        "B-Positive",
        "B-Negative",
        "AB-Positive",
        "AB-Negative",
        "O-Positive",
        "O-Negative",
      ],
      axisLabel: { interval: 0, rotate: 45 },
    },
    yAxis: {
      type: "value",
      name: "Blood donations (in pints)",
      nameLocation: "middle",
      nameGap: 50,
    },
    series: [
      {
        data: [
          { value: 6000, itemStyle: { color: "#9333EA" } }, // Purple
          { value: 2500, itemStyle: { color: "#F97316" } }, // Orange
          { value: 13000, itemStyle: { color: "#3B82F6" } }, // Blue
          { value: 4500, itemStyle: { color: "#0EA5E9" } }, // Light Blue
          { value: 1500, itemStyle: { color: "#22C55E" } }, // Green
          { value: 8500, itemStyle: { color: "#EF4444" } }, // Red
          { value: 4000, itemStyle: { color: "#EAB308" } }, // Yellow
          { value: 1500, itemStyle: { color: "#06B6D4" } }, // Cyan
        ],
        type: "bar",
        barWidth: "60%",
      },
    ],
  };

  // Highest Donors Chart Data
  const highestDonorsOption = {
    tooltip: { trigger: "axis" },
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    xAxis: {
      type: "category",
      data: ["BMH Hospital", "St Patrick", "Richard Moore", "UPTH", "RSBMSC"],
      axisLabel: { interval: 0, rotate: 45 },
    },
    yAxis: {
      type: "value",
      name: "Blood donations (in units)",
      nameLocation: "middle",
      nameGap: 50,
    },
    series: [
      {
        data: [
          { value: 70000, itemStyle: { color: "#9333EA" } },
          { value: 20000, itemStyle: { color: "#F97316" } },
          { value: 160000, itemStyle: { color: "#3B82F6" } },
          { value: 15000, itemStyle: { color: "#22C55E" } },
          { value: 35000, itemStyle: { color: "#EF4444" } },
        ],
        type: "bar",
        barWidth: "60%",
      },
    ],
  };

  const bloodBanks = [
    { id: 1, name: "BMH Hospital", date: "9 - Sep - 2022, 13:02" },
    { id: 2, name: "St Patrick's Hospital", date: "9 - Sep - 2022, 13:02" },
    { id: 3, name: "Tesla Health Clinic", date: "9 - Sep - 2022, 13:02" },
    { id: 4, name: "BMH Hospital", date: "9 - Sep - 2022, 13:02" },
    { id: 5, name: "BMH Hospital", date: "9 - Sep - 2022, 13:02" },
    { id: 6, name: "Tesla Health Clinic", date: "9 - Sep - 2022, 13:02" },
    { id: 7, name: "BMH Hospital", date: "9 - Sep - 2022, 13:02" },
    { id: 8, name: "BMH Hospital", date: "9 - Sep - 2022, 13:02" },
    { id: 9, name: "Tesla Health Clinic", date: "9 - Sep - 2022, 13:02" },
    { id: 10, name: "BMH Hospital", date: "9 - Sep - 2022, 13:02" },
  ];

  return (
    <div className="space-y-8">
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-700 text-sm uppercase">
              BLOOD TYPE IN STOCK
            </h3>
            <button className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full flex items-center gap-1">
              Across regions ▼
            </button>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            Blood donation Chart for Q1 2022 - Q3 2022
          </p>
          <ReactECharts option={bloodTypeOption} style={{ height: "300px" }} />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-700 text-sm uppercase">
              HIGHEST DONORS
            </h3>
            <button className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full flex items-center gap-1">
              South - South ▼
            </button>
          </div>
          <ReactECharts
            option={highestDonorsOption}
            style={{ height: "320px" }}
          />
        </div>
      </div>

      {/* Inventory List Section */}
      <div>
        <h2 className="text-2xl font-serif text-gray-900 mb-6">
          Blood Inventory
        </h2>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full md:w-64 focus:outline-none focus:border-blue-500 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-bold text-gray-800 text-sm mb-4 uppercase flex items-center gap-2">
              BLOOD BANKS ▼
            </h3>

            <div className="space-y-0 divide-y divide-gray-50">
              {bloodBanks.map((bank, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center justify-between py-4 hover:bg-gray-50 px-2 rounded-lg transition-colors"
                >
                  <div className="mb-2 md:mb-0">
                    <h4 className="font-bold text-gray-900 text-sm">
                      {bank.name}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Date Registered • {bank.date}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/admin/inventory/${bank.id}`)}
                    className="bg-[#DBEAFE] text-blue-600 text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors w-full md:w-auto"
                  >
                    View Inventory
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInventory;
