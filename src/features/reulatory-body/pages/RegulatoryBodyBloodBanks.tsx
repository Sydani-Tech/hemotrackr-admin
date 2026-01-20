import { Button } from "@/components/ui/button";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import TotalBloodBanksChart from "../components/Charts/TotalBloodBanksChart";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function RegulatoryBodyBloodBanks() {
  const navigate = useNavigate();

  const handleViewAll = (type: string) => {
    navigate(`/regulation/facilities?type=${type}`);
  };

  const previewList = [1, 2, 3, 4, 5, 6].map((i) => ({
    name: i % 2 === 0 ? "Richard Moore" : "ST David's Hospital",
    location: "No 4, ST Davids, Maryland",
    points: "100pt",
    date: "13 Oct 2024",
    type: "Blood bank",
  }));

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
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Number of registered Blood Banks"
          value="100"
          action={{
            label: "View all",
            onClick: () => handleViewAll("blood-banks"),
          }}
        />
        <StatCard
          label="Number of Registered Health Facilities With Blood Banks"
          value="42"
          action={{
            label: "View all",
            onClick: () => handleViewAll("hospitals-with-blood-banks"),
          }}
        />
        <StatCard
          label="Number of Registered Donors"
          value="90"
          action={{ label: "View all", onClick: () => {} }} // Maybe redirect to donors page if exists
        />
      </div>

      {/* Chart Section */}
      <ChartCard
        title="TOTAL BLOOD BANKS"
        filters={[
          {
            label: "All Banks",
            options: ["Blood Banks", "Hospitals", "Hospitals with Blood Banks"],
          },
        ]}
      >
        <div className="text-xs text-gray-500 mb-4">
          Blood bank Chart for Rivers State
        </div>
        <TotalBloodBanksChart />
      </ChartCard>

      {/* Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blood Banks List */}
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-700 uppercase text-sm">
              BLOOD BANKS
            </h3>
            <Button
              variant="secondary"
              size="sm"
              className="h-7 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100"
              onClick={() => handleViewAll("blood-banks")}
            >
              View all
            </Button>
          </div>
          <div className="space-y-4">
            {previewList.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center pb-4 border-b border-gray-50 last:border-0 last:pb-0"
              >
                <div>
                  <div className="font-medium text-sm text-gray-800 flex items-center gap-2">
                    {item.name}
                    <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">
                      {item.type}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.location} • {item.points} • {item.date}
                  </div>
                </div>
                <Button className="h-7 text-xs bg-blue-600 hover:bg-blue-700">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Health Facilities List */}
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-700 uppercase text-sm">
              HEALTH FACILITIES
            </h3>
            <Button
              variant="secondary"
              size="sm"
              className="h-7 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100"
              onClick={() => handleViewAll("hospitals")}
            >
              View all
            </Button>
          </div>
          <div className="space-y-4">
            {previewList.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center pb-4 border-b border-gray-50 last:border-0 last:pb-0"
              >
                <div>
                  <div className="font-medium text-sm text-gray-800 flex items-center gap-2">
                    {item.name}
                    {/* Only showing label for blood bank in the design, facilities might not have it or have 'Hospital' */}
                    {/* <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">
                      {item.type}
                    </span> */}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.location} • {item.points} • {item.date}
                  </div>
                </div>
                <Button className="h-7 text-xs bg-blue-600 hover:bg-blue-700">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
