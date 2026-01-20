import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Upload } from "lucide-react";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import DonationTrendsChart from "../components/Charts/DonationTrendsChart"; // Reusing for stock chart visual
import ComplianceRequestDonutChart from "../components/Charts/ComplianceRequestDonutChart";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function RegulatoryBodyInventory() {
  const navigate = useNavigate();

  const handleViewAllStats = () => {
    navigate("/regulation/blood-banks");
  };

  const inventoryData = [
    {
      bank: "ST David's Hospital",
      location: "No 4, ST Davids, Maryland",
      bloodType: "A+",
      pints: "10 pt",
      restocked: "12 - Oct - 2024, 14:00",
      usageRate: "10% vs last month",
      usageTrend: "down",
      status: "healthy",
      cta: "Reorder Blood",
    },
    {
      bank: "Johns Hopkins",
      location: "No 12, Hopkins ST, AGEGE",
      bloodType: "O+",
      pints: "22 pt",
      restocked: "3 - Oct - 2024, 17:00",
      usageRate: "10% vs last month",
      usageTrend: "down",
      status: "moderate",
      cta: "Transfer Units",
    },
    {
      bank: "Bamidele Hospital",
      location: "No 12, Hopkins ST, AGEGE",
      bloodType: "B-",
      pints: "1 pt",
      restocked: "3 - Oct - 2024, 17:00",
      usageRate: "20% vs last month",
      usageTrend: "up",
      status: "healthy",
      cta: "Reorder Blood",
    },
    {
      bank: "Mary Slessor Maternity",
      location: "No 12, Hopkins ST, AGEGE",
      bloodType: "O-",
      pints: "17 pt",
      restocked: "3 - Oct - 2024, 17:00",
      usageRate: "10% vs last month",
      usageTrend: "down",
      status: "critical",
      cta: "Transfer Units",
    },
    {
      bank: "Bamidele Hospital",
      location: "No 12, Hopkins ST, AGEGE",
      bloodType: "B-",
      pints: "1 pt",
      restocked: "3 - Oct - 2024, 17:00",
      usageRate: "20% vs last month",
      usageTrend: "up",
      status: "healthy",
      cta: "Reorder Blood",
    },
    {
      bank: "Mary Slessor Maternity",
      location: "No 12, Hopkins ST, AGEGE",
      bloodType: "O-",
      pints: "17 pt",
      restocked: "3 - Oct - 2024, 17:00",
      usageRate: "10% vs last month",
      usageTrend: "down",
      status: "critical",
      cta: "Transfer Units",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-700";
      case "moderate":
        return "bg-yellow-100 text-yellow-700";
      case "critical":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getCtaStyle = (cta: string) => {
    if (cta === "Reorder Blood") {
      return "bg-red-600 hover:bg-red-700 text-white";
    }
    return "bg-blue-600 hover:bg-blue-700 text-white";
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50/50 min-h-screen">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Number of registered Blood Banks"
          value="100"
          action={{ label: "View all", onClick: handleViewAllStats }}
        />
        <StatCard
          label="Number of Registered Health Facilities With Blood Banks"
          value="42"
          action={{ label: "View all", onClick: handleViewAllStats }}
        />
        <StatCard
          label="Number of Registered Donors"
          value="90"
          action={{ label: "View all", onClick: handleViewAllStats }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory Stock Chart */}
        <div className="lg:col-span-2">
          <ChartCard
            title="INVENTORY STOCK"
            filters={[
              {
                label: "Blood type",
                options: ["All", "A+", "B+", "AB+", "O+"],
              },
              {
                label: "Location",
                options: [
                  "All LGAs",
                  "Port Harcourt",
                  "Obio/Akpor",
                  "Ikwerre",
                  "Etche",
                ],
              },
            ]}
          >
            <div className="text-xs text-gray-500 mb-4">
              Blood Inventory Chart for Q1 2024 - Q4 2024
            </div>
            {/* Reusing DonationTrendsChart as a placeholder for the Area/Line chart, 
                 as it likely has similar structure. In production, we'd make a dedicated chart. */}
            <DonationTrendsChart />
          </ChartCard>
        </div>

        {/* Right Column Cards */}
        <div className="space-y-6">
          {/* Blood in Stock */}
          <Card className="shadow-sm border border-gray-100">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-sm text-gray-500">Blood in Stock</div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-800">
                      306pt
                    </span>
                    <span className="text-green-500 text-xs font-bold">↑</span>
                  </div>
                </div>
                <Select defaultValue="Next 7 days">
                  <SelectTrigger className="h-7 text-[10px] w-28 bg-blue-50/50 border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Next 7 days" className="text-xs">
                      Next 7 days
                    </SelectItem>
                    <SelectItem value="Last 7 days" className="text-xs">
                      Last 7 days
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-between items-end gap-1 px-2">
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (type) => (
                    <div
                      key={type}
                      className="flex flex-col items-center gap-1"
                    >
                      <div className="w-4 h-6 relative flex items-center justify-center">
                        {/* Simple SVG Drop or just use a colored div for abstract */}
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className={`w-4 h-4 ${
                            type.includes("A") ? "text-red-500" : "text-red-600"
                          }`}
                        >
                          <path d="M12 2C12 2 4 10 4 15C4 19.4183 7.58172 23 12 23C16.4183 23 20 19.4183 20 15C20 10 12 2 12 2Z" />
                        </svg>
                      </div>
                      <span className="text-[10px] text-gray-500 font-medium">
                        {type}
                      </span>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Total Compliance Request */}
          <Card className="shadow-sm border border-gray-100 h-[220px]">
            <CardContent className="p-4 h-full relative">
              <div className="text-sm text-gray-500 mb-2">
                Total Compliance Request
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-4">23</div>

              <div className="flex flex-col justify-center gap-3 absolute bottom-6 left-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-700"></span>
                  <span className="font-bold text-gray-700 text-sm">60</span>{" "}
                  <span className="text-gray-500 text-xs">Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                  <span className="font-bold text-gray-700 text-sm">40</span>{" "}
                  <span className="text-gray-500 text-xs">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                  <span className="font-bold text-gray-700 text-sm">
                    20
                  </span>{" "}
                  <span className="text-gray-500 text-xs">rejected</span>
                </div>
              </div>

              <div className="absolute top-4 right-4">
                <ComplianceRequestDonutChart />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Inventory Table */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-medium text-gray-800">
              Blood Inventory
            </h2>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-gray-50 border-none rounded-lg py-2 pl-4 pr-10 text-sm focus:ring-1 focus:ring-blue-500/20"
                />
                {/* Placeholder for search icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <Button
                variant="outline"
                className="text-blue-600 border-blue-200 hover:bg-blue-50 h-10 gap-2"
              >
                Export <Upload className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-600 border-b border-gray-100 font-semibold">
                  <th className="py-4 pl-2">Bank</th>
                  <th className="py-4">Blood Type</th>
                  <th className="py-4">Pints Available</th>
                  <th className="py-4">Last Restocked</th>
                  <th className="py-4">Usage Rate</th>
                  <th className="py-4">Status</th>
                  <th className="py-4 text-right pr-2">CTA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {inventoryData.map((item, index) => (
                  <tr key={index} className="group hover:bg-gray-50/50">
                    <td className="py-4 pl-2">
                      <div className="font-medium text-gray-800">
                        {item.bank}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1">
                        {item.location}
                      </div>
                    </td>
                    <td className="py-4 font-medium text-gray-700">
                      {item.bloodType}
                    </td>
                    <td className="py-4 font-medium text-gray-700">
                      {item.pints}
                    </td>
                    <td className="py-4 text-gray-600">{item.restocked}</td>
                    <td className="py-4">
                      <span
                        className={`text-xs ml-1 font-medium ${
                          item.usageTrend === "down"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {item.usageTrend === "down" ? "↓" : "↑"}{" "}
                        {item.usageRate}
                      </span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-medium ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 text-right pr-2">
                      <Button
                        size="sm"
                        className={`h-8 text-xs px-4 w-32 ${getCtaStyle(
                          item.cta
                        )}`}
                      >
                        {item.cta}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
