
import { Plus } from "lucide-react";

const Requests = () => {
  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-blue-600">Donation requests</h2>
      </div>

      <div className="bg-white rounded-3xl p-8 min-h-[600px] shadow-sm">
        {/* Sort Filter */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M4 6h16M4 12h10M4 18h6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Sort by</span>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-500 cursor-pointer hover:text-gray-900">
            <span>All requests</span>
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M6 9l6 6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl group hover:bg-blue-50 transition-colors cursor-pointer border border-transparent hover:border-blue-100"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-md shadow-blue-200">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-blue-500 font-bold mb-1 group-hover:text-blue-700">
                  New Donor Request
                </h3>
                <p className="text-gray-600 text-sm">
                  You have a new donor request from{" "}
                  <span className="font-bold text-gray-900">
                    Uniport teaching hospital
                  </span>
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  Tuesday, June 14, 2024 <span className="ml-2">18:16:1</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Requests;
