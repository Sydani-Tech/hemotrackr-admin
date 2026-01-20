import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import DonationTrendsChart from "../components/Charts/DonationTrendsChart";
import DonorAgePieChart from "../components/Charts/DonorAgePieChart";
import BloodInventoryMap from "../components/Charts/BloodInventoryMap";
import DemandSupplyLineChart from "../components/Charts/DemandSupplyLineChart";
import InventoryStockBarChart from "../components/Charts/InventoryStockBarChart";
import HighestDonorsChart from "../components/Charts/HighestDonorsChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function RegulatoryBodyHome() {
  const navigate = useNavigate();
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Number of Registered Donors"
          value="90"
          action={{ label: "View all", onClick: () => {} }}
        />
        <StatCard
          label="Number of Registered Blood Banks"
          value="100"
          action={{ label: "View all", onClick: () => {} }}
        />
        <StatCard
          label="Number of Registered Health Facilities With Blood Banks"
          value="42"
          action={{ label: "View all", onClick: () => {} }}
        />
        <StatCard
          label="Registered Health Facilities"
          value="60"
          action={{ label: "View all", onClick: () => {} }}
        />
      </div>

      {/* Main Dashboard Section (Map + Top Requests) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section - Takes up 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <ChartCard
            title="Blood Inventory"
            filters={[{ label: "Blood type", options: ["All", "A+", "B+"] }]}
            className="h-[500px]"
          >
            <BloodInventoryMap />
            <div className="grid grid-cols-4 gap-4 mt-6 text-xs text-gray-500">
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                (type) => (
                  <div key={type} className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>{" "}
                    {type} 10pt
                  </div>
                )
              )}
            </div>
          </ChartCard>
        </div>

        {/* Right Column - Top Blood Requests */}
        <div className="space-y-4">
          <ChartCard
            title="Top Blood Requests"
            filters={[{ label: "Facility", options: ["All"] }]}
          >
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex justify-between items-start pb-4 border-b last:border-0 last:pb-0"
                >
                  <div>
                    <div className="font-semibold text-sm">
                      ST David's Hospital{" "}
                      <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full ml-1">
                        Blood bank
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      No 4, ST Davids, Maryland • 100pt • 13 Oct 2024
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 h-7 text-xs px-2"
                  >
                    View Detail
                  </Button>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard
            title="Top Blood Requests"
            filters={[{ label: "Facility", options: ["All"] }]}
          >
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex justify-between items-start pb-4 border-b last:border-0 last:pb-0"
                >
                  <div>
                    <div className="font-semibold text-sm">
                      Richard Moore{" "}
                      <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full ml-1">
                        Blood bank
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      No 4, ST Davids, Maryland • 100pt • 13 Oct 2024
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 h-7 text-xs px-2"
                  >
                    View Detail
                  </Button>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Middle Section: Sidebar Stats & Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Stats Stack */}
        <div className="space-y-6">
          <ChartCard title="Average Donor Ages">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-2">18 – 60</div>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center text-xs gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span>{" "}
                    18 - 25 Years
                  </div>
                  <div className="flex items-center text-xs gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span> 26
                    - 35 Years
                  </div>
                  <div className="flex items-center text-xs gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>{" "}
                    36 - 45 Years
                  </div>
                  <div className="flex items-center text-xs gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>{" "}
                    46 - 60 Years
                  </div>
                </div>
              </div>
              <div className="h-24 w-24">
                <DonorAgePieChart />
              </div>
            </div>
          </ChartCard>

          {/* Total Donations */}
          <ChartCard
            title="Total Donations"
            filters={[{ label: "Last 7 days", options: ["Last 7 days"] }]}
          >
            <div className="text-3xl font-bold flex items-center gap-2">
              800<span className="text-sm font-normal text-gray-500">pt</span>
              <span className="text-xs text-green-500 bg-green-50 px-1 rounded flex items-center">
                ↑ 12
              </span>
            </div>
            <div className="flex gap-4 mt-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <span className="text-blue-500">👤</span> 12
              </div>
              <div className="flex items-center gap-1">
                <span className="text-blue-500">📥</span> 205
              </div>
            </div>
          </ChartCard>

          {/* Total Donors */}
          <ChartCard
            title="Total Donors"
            filters={[{ label: "Last 7 days", options: ["Last 7 days"] }]}
          >
            <div className="text-3xl font-bold mb-4">
              32
              <span className="text-sm font-normal text-gray-500">donors</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <div className="flex items-center gap-1">
                    <span className="text-blue-500">👤</span> 12
                  </div>
                  <span className="text-green-500">↑ 3.4%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-400 to-green-400 w-[60%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <div className="flex items-center gap-1">
                    <span className="text-blue-500">👤</span> 20
                  </div>
                  <span className="text-green-500">↑ 0.8%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-400 to-green-400 w-[80%]"></div>
                </div>
              </div>
            </div>
          </ChartCard>

          {/* Total Donor Request */}
          <ChartCard title="Total Donor Request">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-4">12</div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>{" "}
                    6 Approved
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>{" "}
                    4 Pending
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span> 2
                    Rejected
                  </div>
                </div>
              </div>
              {/* Simple Donut placeholder using CSS/SVG since we don't have a component */}
              <div className="relative h-20 w-20 rounded-full border-[6px] border-gray-100 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-[6px] border-green-500 border-l-transparent rotate-45"></div>
                <div className="absolute inset-0 rounded-full border-[6px] border-yellow-500 border-l-transparent border-t-transparent border-r-transparent -rotate-90"></div>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Right Column: Main Charts */}
        <div className="lg:col-span-2 space-y-6">
          <ChartCard
            title="Donation Trends"
            filters={[
              { label: "Blood type", options: ["All"] },
              { label: "Location", options: ["All"] },
            ]}
          >
            <div className="text-xs text-gray-500 mb-4">
              Donation Trend Chart for Q1 2024 - Q4 2024
            </div>
            <DonationTrendsChart />
          </ChartCard>

          <ChartCard
            title="Blood Demand & Supply"
            filters={[
              { label: "Blood type", options: ["All"] },
              { label: "Last 7 days", options: ["Last 7 days"] },
            ]}
          >
            <div className="text-xs text-gray-500 mb-4">
              Blood Demand & Supply Trend Chart for Q1 2024 - Q4 2024
            </div>
            <DemandSupplyLineChart />
          </ChartCard>
        </div>
      </div>

      {/* Inventory Stock - Full Width/Centred */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <ChartCard
            className="h-full"
            title="Inventory Stock"
            filters={[
              { label: "Blood type", options: ["All"] },
              { label: "Location", options: ["All"] },
            ]}
          >
            <div className="text-xs text-gray-500 mb-4">
              Blood Inventory Chart for Q1 2024 - Q4 2024
            </div>
            <InventoryStockBarChart />
          </ChartCard>
        </div>

        <div className="space-y-1">
          <Card className="shadow-sm border border-gray-100">
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-red-500">
                <span className="bg-red-100 p-1 rounded">⚠️</span> Expires Today
              </CardTitle>
              <Select defaultValue="Last 7 days">
                <SelectTrigger className="h-6 text-[10px] w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-1">
                3pt <span className="text-green-500 text-xs">↑</span>
              </div>
              <div className="flex gap-2 mt-4 justify-between">
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (type) => (
                    <div
                      key={type}
                      className="flex flex-col items-center gap-1"
                    >
                      <Droplet className="w-4 h-4 text-red-600 fill-red-600" />
                      <span className="text-[10px] text-gray-500">{type}</span>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border border-gray-100">
            <CardHeader className="flex flex-row justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Expires in 30 days
              </CardTitle>
              <Button variant="secondary" size="sm" className="h-6 text-[10px]">
                View all
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">
                300<span className="text-sm">pt</span>
              </div>
              <div className="flex gap-2 mt-4 justify-between mb-4">
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (type) => (
                    <div
                      key={type}
                      className="flex flex-col items-center gap-1"
                    >
                      <Droplet className="w-4 h-4 text-red-600 fill-red-600" />
                      <span className="text-[10px] text-gray-500">{type}</span>
                    </div>
                  )
                )}
              </div>

              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="text-xs text-blue-600 underline cursor-pointer">
                      Hospital Name{" "}
                      <span className="text-gray-400 no-underline ml-1">
                        13 Oct 2024
                      </span>
                    </div>
                    <Button size="sm" className="h-6 text-[10px] bg-blue-600">
                      Transfer Units
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section: Highest Donors & Expiration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-1">
          <ChartCard
            title="Highest Donors"
            filters={[{ label: "Blood type", options: ["Type"] }]}
          >
            <HighestDonorsChart />
          </ChartCard>
        </div>
        <div className="lg:col-span-1">
          <ChartCard
            title="Highest Donors"
            filters={[{ label: "Blood type", options: ["Type"] }]}
          >
            <HighestDonorsChart />
          </ChartCard>
        </div>

        {/* Expiration Cards */}
      </div>
    </div>
  );
}
