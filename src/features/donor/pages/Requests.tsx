import { Plus, Loader2, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DonorAPI } from "../../../core/services/DonorService";
import type { UserRequest as UserRequestType } from "../../../core/services/DonorService";

const Requests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<UserRequestType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await DonorAPI.getUserRequests();
        setRequests(response.data.data || response.data);
      } catch (error) {
        console.error("Failed to fetch requests", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

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
          {requests.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No donation requests found.
            </div>
          ) : (
            requests.map((req) => (
              <div
                key={req.id}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl group hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-md ${req.blood_request.is_emergency ? 'bg-red-500 shadow-red-200' : 'bg-blue-600 shadow-blue-200'} text-white`}>
                  <Plus className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold mb-1 ${req.blood_request.is_emergency ? 'text-red-500' : 'text-blue-500'}`}>
                    {req.blood_request.is_emergency ? 'Emergency Request' : 'New Donor Request'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    You have a new donor request from{" "}
                    <span className="font-bold text-gray-900">
                      {req.blood_request.organization.name}
                    </span>
                    <span className="ml-2 text-gray-500">
                      ({req.blood_request.blood_group} • {req.blood_request.units_needed} Units)
                    </span>
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    {new Date(req.created_at).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    <span className="ml-2">
                      {new Date(req.created_at).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </p>
                  <button
                    onClick={() => navigate(`/donor/appointments/create/${req.blood_request.organization.id}?requestId=${req.id}`)}
                    className="mt-3 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule Donation
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;
