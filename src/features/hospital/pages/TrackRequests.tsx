import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";

const TrackRequests = () => {
  const navigate = useNavigate();

  const requests = [
    {
      id: 1,
      type: "Blood request",
      bloodType: "A-",
      pints: 2,
      date: "9 - Sep - 2022, 13:02",
    },
    {
      id: 2,
      type: "Platelet request",
      bloodType: "O+",
      pints: 2,
      date: "9 - Sep - 2022, 13:02",
    },
    {
      id: 3,
      type: "Blood request",
      bloodType: "A-",
      pints: 2,
      date: "9 - Sep - 2022, 13:02",
    },
    {
      id: 4,
      type: "Platelet request",
      bloodType: "O+",
      pints: 2,
      date: "9 - Sep - 2022, 13:02",
    },
    {
      id: 5,
      type: "Blood request",
      bloodType: "B+",
      pints: 2,
      date: "9 - Sep - 2022, 13:02",
    },
    {
      id: 6,
      type: "Blood request",
      bloodType: "A-",
      pints: 2,
      date: "9 - Sep - 2022, 13:02",
    },
    {
      id: 7,
      type: "Blood request",
      bloodType: "A-",
      pints: 2,
      date: "9 - Sep - 2022, 13:02",
    },
  ];

  return (
    <div className="flex gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Main Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <h2 className="text-3xl font-serif text-gray-900">
              Track Requests
            </h2>
          </div>

          <button
            onClick={() => navigate("/hospital/requests/status")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg text-xs transition-colors shadow-sm"
          >
            View request status
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-lg">
                  {request.bloodType}
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 text-sm">
                    {request.type}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {request.pints} pint • {request.date}
                  </p>
                </div>
              </div>

              <button className="bg-blue-50 text-blue-500 hover:bg-blue-100 px-6 py-2 rounded-lg text-xs font-bold transition-colors">
                View
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar - Ad & Share */}
      <div className="w-80 shrink-0">
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 sticky top-24">
          <div className="relative rounded-2xl overflow-hidden h-40 mb-4 bg-gray-900">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="Medical Test"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 p-6 flex flex-col justify-center text-white">
              <p className="text-xs font-bold uppercase tracking-wider mb-1">
                FREE MEDICAL TEST
              </p>
              <h3 className="font-bold text-lg leading-tight mb-4">
                Get your free medical test at HTPS Hospital
              </h3>
              <button className="bg-white text-gray-900 text-[10px] font-bold py-2 px-4 rounded w-fit">
                Click to find out more.
              </button>
            </div>
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors mb-6 shadow-lg shadow-blue-200">
            Proceed
          </button>

          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-3">Share</h4>
            <div className="flex gap-4 text-gray-400">
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-700" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-blue-400" />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-600" />
              <LinkIcon className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackRequests;
