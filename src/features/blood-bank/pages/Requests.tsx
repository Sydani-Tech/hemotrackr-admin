import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Requests = () => {
  const navigate = useNavigate();

  const requests = [
    {
      id: 1,
      type: "Blood request",
      bloodType: "A-",
      pints: 2,
      date: "9 - Sep - 2022, 13:02",
      status: "Received",
      category: "Blood donor",
    },
    {
      id: 2,
      type: "Platelet request",
      bloodType: "O+",
      pints: 2,
      date: "9 - Sep - 2022, 13:02",
      status: "Pending",
      category: "Blood donor",
    },
    {
      id: 3,
      type: "Blood request",
      bloodType: "A-",
      pints: 2,
      date: "9 - Sep - 2022, 13:02",
      status: "Received",
      category: "Blood donor",
    },
    {
      id: 4,
      type: "Platelet request",
      bloodType: "O+",
      pints: 2,
      date: "9 - Sep - 2022, 13:02",
      status: "Pending",
      category: "Blood donor",
    },
    {
      id: 5,
      type: "Blood request",
      bloodType: "A-",
      pints: 2,
      date: "9 - Sep - 2022, 13:02",
      status: "Received",
      category: "Blood donor",
    },
    {
      id: 6,
      type: "Platelet request",
      bloodType: "O+",
      pints: 2,
      date: "9 - Sep - 2022, 13:02",
      status: "Pending",
      category: "Blood donor",
    },
    {
      id: 7,
      type: "Blood request",
      bloodType: "A-",
      pints: 2,
      date: "9 - Sep - 2022, 13:02",
      status: "Received",
      category: "Blood donor",
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <h2 className="text-3xl font-serif text-gray-900">Request status</h2>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between pb-6 border-b border-gray-50 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-lg">
                {request.bloodType}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-700">{request.type}</h3>
                  <span className="bg-blue-100 text-blue-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {request.category}
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  {request.pints} pint • {request.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`px-6 py-2 rounded-lg text-xs font-bold ${
                  request.status === "Received"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-50 text-blue-500"
                }`}
              >
                {request.status}
              </span>

              <button className="bg-red-50 text-red-500 hover:bg-red-100 px-6 py-2 rounded-lg text-xs font-bold transition-colors">
                Take down request
              </button>

              <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-8 py-2 rounded-lg text-xs font-bold transition-colors">
                Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
