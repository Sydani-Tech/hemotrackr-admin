import ChartCard from "../components/ChartCard";
import DonationTrendsChart from "../components/Charts/DonationTrendsChart";
import ComplianceRequestDonutChart from "../components/Charts/ComplianceRequestDonutChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function RegulatoryBodyCompliance() {
  const navigate = useNavigate();
  const bloodBanks = [
    {
      name: "ST David's Hospital",
      location: "No 4, ST Davids, Maryland",
      regDate: "12-Oct-2024",
      capacity: "100 pt",
      requests: "100 ↓ 10%",
      donors: "100 ↓ 10%",
      status: "Authorised",
    },
    {
      name: "Johns Hopkins",
      location: "No 12, Hopkins ST, AGEGE",
      regDate: "3-Oct-2024",
      capacity: "200 pt",
      requests: "100 ↑ 20%",
      donors: "100 ↑ 20%",
      status: "Authorised",
    },
    {
      name: "Bamidele Hospital",
      location: "No 12, Hopkins ST, AGEGE",
      regDate: "3-Oct-2024",
      capacity: "150 pt",
      requests: "100 ↓ 10%",
      donors: "100 ↓ 10%",
      status: "Authorised",
    },
    {
      name: "Mary Slessor Maternity",
      location: "No 12, Hopkins ST, AGEGE",
      regDate: "3-Oct-2024",
      capacity: "1000 pt",
      requests: "100 ↓ 10%",
      donors: "100 ↓ 10%",
      status: "Authorised",
    },
    {
      name: "Bamidele Hospital",
      location: "No 12, Hopkins ST, AGEGE",
      regDate: "3-Oct-2024",
      capacity: "300 pt",
      requests: "100 ↑ 20%",
      donors: "100 ↑ 20%",
      status: "Authorised",
    },
    {
      name: "Mary Slessor Maternity",
      location: "No 12, Hopkins ST, AGEGE",
      regDate: "3-Oct-2024",
      capacity: "350 pt",
      requests: "100 ↑ 20%",
      donors: "100 ↑ 20%",
      status: "Authorised",
    },
  ];

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
      {/* Header Card */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-6">
          <h1 className="text-xl font-medium text-gray-800 mb-2">
            Compliance Status
          </h1>
          <p className="text-sm text-gray-500">
            View health facilities and blood banks that are compliant with
            health and blood donation rules and regulations.
          </p>
        </CardContent>
      </Card>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donation Trends */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Donation Trends"
            filters={[
              {
                label: "Blood type",
                options: ["All", "A+", "B+", "AB+", "O+"],
              },
              {
                label: "Location",
                options: [
                  "All LGAs",
                  "Abua-Odual",
                  "Ahoada-East",
                  "Ahoada-West",
                  "Akuku-Toru",
                  "Andoni",
                  "Asari-Toru",
                  "Bonny",
                  "Degema",
                  "Eleme",
                  "Opobo-Nkoro",
                  "Port-Harcourt",
                  "Tai",
                ],
              },
            ]}
            className="h-full"
          >
            <div className="text-xs text-gray-500 mb-4">
              Blood donation Chart for Q1 2024 - Q4 2024
            </div>
            <DonationTrendsChart />
          </ChartCard>
        </div>

        {/* Compliance Requests Stats */}
        <div className="space-y-6">
          {/* Top Card: Total Requests */}
          <Card className="shadow-sm border border-gray-100">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm text-gray-500">
                  Total Compliance
                  <br />
                  Requests
                </div>
                <Select defaultValue="Last 7 days">
                  <SelectTrigger className="h-7 text-[10px] w-28 bg-blue-50/50 border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Today",
                      "Yesterday",
                      "Last 7 days",
                      "Last 30 days",
                      "Custom date",
                    ].map((opt) => (
                      <SelectItem key={opt} value={opt} className="text-xs">
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-700">19</span>
                <span className="text-sm text-gray-500">requests</span>
                <span className="text-xs text-green-600 font-medium">
                  ↑ 0.1%
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Card: Breakdown */}
          <Card className="shadow-sm border border-gray-100">
            <CardContent className="p-4">
              <div className="text-sm text-gray-500 mb-4">
                Total Compliance Request
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-700 mb-4">
                    19
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-700"></span>
                      <span className="font-semibold text-gray-700">10</span>{" "}
                      <span className="text-gray-500">Approved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                      <span className="font-semibold text-gray-700">6</span>{" "}
                      <span className="text-gray-500">Pending</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                      <span className="font-semibold text-gray-700">3</span>{" "}
                      <span className="text-gray-500">rejected</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <ComplianceRequestDonutChart />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Blood Banks Table Section */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 cursor-pointer">
              <h2 className="text-lg font-medium">Blood Banks</h2>
              <div className="transform rotate-90 text-gray-400">›</div>
            </div>

            <Select defaultValue="10">
              <SelectTrigger className="w-[70px] h-8 bg-blue-50/50 border-0 text-blue-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-500 border-b border-gray-100">
                  <th className="py-4 font-medium pl-2">Name</th>
                  <th className="py-4 font-medium">Registration Date</th>
                  <th className="py-4 font-medium">Capacity</th>
                  <th className="py-4 font-medium">No. Of Requests</th>
                  <th className="py-4 font-medium">No. Of Donors</th>
                  <th className="py-4 font-medium">Status</th>
                  <th className="py-4 font-medium text-right pr-2">CTA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bloodBanks.map((bank, index) => (
                  <tr key={index} className="group hover:bg-gray-50/50">
                    <td className="py-4 pl-2">
                      <div className="font-medium text-gray-700">
                        {bank.name}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1">
                        {bank.location}
                      </div>
                    </td>
                    <td className="py-4 text-gray-600">{bank.regDate}</td>
                    <td className="py-4 text-gray-600">{bank.capacity}</td>
                    <td className="py-4">
                      <span className="text-gray-600">
                        {bank.requests.split(" ")[0]}
                      </span>
                      <span
                        className={`text-[10px] ml-1 ${
                          bank.requests.includes("↓")
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {bank.requests.split(" ").slice(1).join(" ")}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-gray-600">
                        {bank.donors.split(" ")[0]}
                      </span>
                      <span
                        className={`text-[10px] ml-1 ${
                          bank.donors.includes("↓")
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {bank.donors.split(" ").slice(1).join(" ")}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-medium">
                        {bank.status}
                      </span>
                    </td>
                    <td className="py-4 text-right pr-2">
                      <Button
                        size="sm"
                        className="h-8 text-xs bg-blue-600 hover:bg-blue-700 px-4"
                      >
                        View Profile
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8 border-gray-200"
            >
              ← Previous
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                className="h-8 w-8 text-xs bg-blue-100 text-blue-600 hover:bg-blue-200"
              >
                1
              </Button>
              <Button variant="ghost" className="h-8 w-8 text-xs text-gray-500">
                2
              </Button>
              <Button variant="ghost" className="h-8 w-8 text-xs text-gray-500">
                3
              </Button>
              <span className="text-gray-400 text-xs">...</span>
              <Button variant="ghost" className="h-8 w-8 text-xs text-gray-500">
                8
              </Button>
              <Button variant="ghost" className="h-8 w-8 text-xs text-gray-500">
                9
              </Button>
              <Button variant="ghost" className="h-8 w-8 text-xs text-gray-500">
                10
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8 border-gray-200"
            >
              Next →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
