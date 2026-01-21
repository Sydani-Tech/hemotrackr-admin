import { useParams } from "react-router-dom";
import ReactECharts from "echarts-for-react";
import { User, Droplet, Clock, ArrowRight } from "lucide-react";

const FacilityDetails = () => {
  const { id } = useParams();

  // Mock data - in a real app, fetch based on ID
  const facilityName = "BMH Hospital";
  const facilityType = "Blood Bank";

  const stats = [
    {
      title: "Total Number of Donations",
      value: "800",
      change: "4% ↓",
      period: "This Month",
    },
    {
      title: "Total Number of Requests",
      value: "4000",
      change: "12% ↑",
      period: "Year",
    },
    {
      title: "Total Number of Reviews",
      value: "50",
      change: "12% ↑",
      icon: User, // Using User as placeholder for the group icon
    },
  ];

  const recentDonors = [
    {
      name: "Precious Ebu",
      facility: "BMH Hospital",
      amount: "2 pint",
      date: "9 - Sep - 2022, 13:02",
    },
    {
      name: "Precious Ebu",
      facility: "Tesla Health Clinic",
      amount: "3 Pint",
      date: "9 - Sep - 2022, 13:02",
    },
    {
      name: "Precious Ebu",
      facility: "St Patricks Hospital",
      amount: "3 Pint",
      date: "9 - Sep - 2022, 13:02",
    },
  ];

  const recentRequests = [
    {
      name: "Admin",
      facility: "BMH Blood Hospital",
      amount: "3 Pint",
      date: "9 - Sep - 2022, 13:02",
    },
    {
      name: "Admin",
      facility: "ST. Patrick Hospital",
      amount: "3 Pint",
      date: "9 - Sep - 2022, 13:02",
    },
    {
      name: "Paul Linus",
      facility: "Happy Days Clinic",
      amount: "3 Pint",
      date: "9 - Sep - 2022, 13:02",
    },
  ];

  // Chart Options
  const bloodTypePieOption = {
    tooltip: { trigger: "item" },
    legend: { orient: "vertical", right: "10%", top: "center" },
    series: [
      {
        name: "Blood Types",
        type: "pie",
        radius: ["50%", "70%"],
        center: ["30%", "50%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: "center",
          formatter: "30%",
          fontSize: 20,
          fontWeight: "bold",
        },
        labelLine: { show: false },
        data: [
          { value: 30, name: "AB", itemStyle: { color: "#3B82F6" } },
          { value: 30, name: "O+", itemStyle: { color: "#FFA500" } },
          { value: 20, name: "O-", itemStyle: { color: "#22C55E" } },
          { value: 20, name: "O+", itemStyle: { color: "#EF4444" } },
        ],
      },
    ],
  };

  const totalNumberPieOption = {
    tooltip: { trigger: "item" },
    legend: { orient: "vertical", right: "0%", top: "center" },
    series: [
      {
        name: "Total",
        type: "pie",
        radius: ["50%", "70%"],
        center: ["30%", "50%"],
        label: {
          show: true,
          position: "center",
          formatter: "35%",
          fontSize: 20,
          fontWeight: "bold",
          color: "#fff",
        },
        data: [
          { value: 30, name: "Blood Donor", itemStyle: { color: "#3B82F6" } },
          { value: 18, name: "Platelets", itemStyle: { color: "#EAB308" } },
          { value: 35, name: "Blood Marrow", itemStyle: { color: "#EF4444" } },
        ],
      },
    ],
  };

  const cashInflowOption = {
    tooltip: { trigger: "axis" },
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "Q3 2020",
        "Q4 2020",
        "Q1 2021",
        "Q2 2021",
        "Q3 2021",
        "Q4 2021",
        "Q1 2022",
        "Q2 2022",
        "Q3 2022",
      ],
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Cash Inflow",
        type: "line",
        smooth: true,
        bgColor: "#E0F2FE",
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#93C5FD" },
              { offset: 1, color: "#EFF6FF" },
            ],
          },
        },
        lineStyle: { width: 3, color: "#3B82F6" },
        data: [10, 13, 18, 14, 9, 8, 12, 5, 14, 16],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{facilityName}</h1>
          <p className="text-gray-500">{facilityType}</p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          View profile
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <p className="text-gray-500 text-sm">{stat.title}</p>
              {stat.period && (
                <span className="text-xs bg-gray-50 px-2 py-1 rounded text-gray-600 border border-gray-200">
                  {stat.period} ▼
                </span>
              )}
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {stat.value}
            </h3>
            <p
              className={`text-xs font-bold ${stat.change.includes("↑") ? "text-green-500" : "text-red-500"}`}
            >
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Lists Sections: Donors and Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Blood Donors */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-500 text-sm uppercase">
              Recent Blood Donors
            </h3>
            <button className="text-orange-400 text-xs font-bold">
              See all
            </button>
          </div>
          <div className="space-y-4">
            {recentDonors.map((donor, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center pb-2 border-b border-gray-50 last:border-0"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-sm">
                      {donor.name}
                    </span>
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
                      {donor.facility}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {donor.amount} • {donor.date}
                  </p>
                </div>
                <button className="bg-blue-50 text-blue-600 text-xs px-3 py-1.5 rounded-lg hover:bg-blue-100">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Blood Request */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-500 text-sm uppercase">
              Recent Blood Request
            </h3>
            <button className="text-orange-400 text-xs font-bold">
              See all
            </button>
          </div>
          <div className="space-y-4">
            {recentRequests.map((req, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center pb-2 border-b border-gray-50 last:border-0"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-sm">
                      {req.name}
                    </span>
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
                      {req.facility}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {req.amount} • {req.date}
                  </p>
                </div>
                <button className="bg-blue-50 text-blue-600 text-xs px-3 py-1.5 rounded-lg hover:bg-blue-100">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Row: Pending Requests and Total Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-500 text-sm uppercase mb-2">
              Pending Donation Requests
            </h3>
            <p className="text-xl font-bold text-gray-900">
              10 new donation requests
            </p>
          </div>
          <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-100">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-500 text-sm uppercase mb-2">
              Total Number of Blood in Stock
            </h3>
            <p className="text-xl font-bold text-gray-900">23 Units</p>
          </div>
          <button className="bg-orange-50 text-orange-600 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-orange-100">
            View Details <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <h3 className="font-bold text-gray-500 text-sm uppercase mb-4">
            Blood Types{" "}
            <span className="text-xs normal-case text-gray-400 block font-normal">
              Most donated
            </span>
          </h3>
          <ReactECharts
            option={bloodTypePieOption}
            style={{ height: "200px" }}
          />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <h3 className="font-bold text-gray-900 text-sm mb-4">Total number</h3>
          <ReactECharts
            option={totalNumberPieOption}
            style={{ height: "200px" }}
          />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 lg:col-span-1">
          {/* Note: The charts in the screenshot are slightly different (Cash Inflow is large, others small). I will adapt to fit layout or use the screenshot's layout if I can.
               Actually, the screenshot shows Cash Inflow as a large chart and "Quarterly Cash Flow" label on bottom.
               I will match the screenshot layout better: Blood Types & Total Number on left (stacked?), Cash Inflow on right (large).
               Wait, screenshot has:
               Bottom Row:
               - Left col: Blood Types Card, Total number Card (stacked vertically)
               - Right col: Cash Inflow (large chart)
               */}
          <h3 className="font-bold text-gray-900 text-lg mb-1">Cash Inflow</h3>
          <p className="text-xs text-gray-500 mb-4">
            Cash Inflow Chart for Q1 2022 - Q3 2022
          </p>
          <ReactECharts option={cashInflowOption} style={{ height: "300px" }} />
        </div>
      </div>
      {/* Adjusting the grid for the bottom section to match screenshot clearer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-gray-500 text-sm uppercase mb-4">
              Blood Types{" "}
              <span className="text-xs normal-case text-gray-400 block font-normal">
                Most donated
              </span>
            </h3>
            <ReactECharts
              option={bloodTypePieOption}
              style={{ height: "200px" }}
            />
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-gray-900 text-sm mb-4">
              Total number
            </h3>
            <ReactECharts
              option={totalNumberPieOption}
              style={{ height: "200px" }}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 lg:col-span-2">
          <h3 className="font-bold text-gray-900 text-lg mb-1">Cash Inflow</h3>
          <p className="text-xs text-gray-500 mb-4">
            Cash Inflow Chart for Q1 2022 - Q3 2022
          </p>
          <ReactECharts option={cashInflowOption} style={{ height: "400px" }} />
        </div>
      </div>
    </div>
  );
};

export default FacilityDetails;
