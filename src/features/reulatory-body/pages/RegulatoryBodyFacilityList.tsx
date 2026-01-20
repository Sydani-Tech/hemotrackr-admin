import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function RegulatoryBodyFacilityList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentType = searchParams.get("type") || "blood-banks"; // Default

  // Mapping slug to readable label for dropdown
  const typeOptions = [
    { value: "blood-banks", label: "BLOOD BANKS" },
    { value: "hospitals", label: "HEALTH FACILITIES" },
    {
      value: "hospitals-with-blood-banks",
      label: "HOSPITALS WITH BLOOD BANKS",
    },
  ];

  const handleTypeChange = (val: string) => {
    setSearchParams({ type: val });
  };

  // Mock Data - In real app, filter based on 'currentType'
  const listData = Array(10).fill({
    name: "ST David's Hospital",
    location: "No 4, ST Davids, Maryland",
    status: "Authorised",
  });

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
      <Card className="shadow-sm border border-gray-100 min-h-[80vh]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-8">
            <Select value={currentType} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-auto h-10 px-4 bg-blue-50/50 border-0 text-blue-600 font-semibold uppercase tracking-wide">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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
                <tr className="text-gray-900 border-b border-gray-100">
                  <th className="py-4 font-semibold pl-2 w-1/2">Name</th>
                  <th className="py-4 font-semibold text-center">Status</th>
                  <th className="py-4 font-semibold text-right pr-2">CTA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {listData.map((item, index) => (
                  <tr key={index} className="group hover:bg-gray-50/50">
                    <td className="py-4 pl-2">
                      <div className="font-medium text-gray-700 text-base">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {item.location}
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 text-right pr-2">
                      {/* Using fixed width button to match design's solid look */}
                      <Button
                        size="sm"
                        className="h-9 text-xs bg-blue-600 hover:bg-blue-700 px-6 font-medium"
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-12">
            <Button
              variant="secondary"
              size="sm"
              className="text-xs h-9 px-4 bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              ← Previous
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                className="h-8 w-8 text-xs bg-blue-100 text-blue-600"
              >
                1
              </Button>
              <Button
                variant="ghost"
                className="h-8 w-8 text-xs text-gray-500 hover:bg-gray-50"
              >
                2
              </Button>
              <Button
                variant="ghost"
                className="h-8 w-8 text-xs text-gray-500 hover:bg-gray-50"
              >
                3
              </Button>
              <span className="text-gray-400 text-xs px-2">...</span>
              <Button
                variant="ghost"
                className="h-8 w-8 text-xs text-gray-500 hover:bg-gray-50"
              >
                8
              </Button>
              <Button
                variant="ghost"
                className="h-8 w-8 text-xs text-gray-500 hover:bg-gray-50"
              >
                9
              </Button>
              <Button
                variant="ghost"
                className="h-8 w-8 text-xs text-gray-500 hover:bg-gray-50"
              >
                10
              </Button>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="text-xs h-9 px-4 bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              Next →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
