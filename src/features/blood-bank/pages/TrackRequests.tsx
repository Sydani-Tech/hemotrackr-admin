import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { BloodBankAPI } from "@/core/services/BloodBankService";

const TrackRequests = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewRequest = (request: any) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await BloodBankAPI.getMyRequests();
        setRequests(response.data.data);
      } catch (error) {
        console.error("Failed to fetch requests", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

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
            onClick={() => navigate("/blood-bank/requests/status")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg text-xs transition-colors shadow-sm"
          >
            View request status
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          {loading ? (
            <p className="text-gray-500 text-center py-8">Loading requests...</p>
          ) : requests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">You haven't made any requests yet.</p>
              <button
                onClick={() => navigate("/blood-bank/make-request")}
                className="text-blue-600 font-bold hover:underline"
              >
                Make a request
              </button>
            </div>
          ) : (
            requests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-lg">
                    {request.blood_group || request.type.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-700 text-sm">
                      {request.type} request
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {request.units_needed} pint{request.units_needed > 1 ? 's' : ''} • {new Date(request.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${request.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                    request.status === 'Approved' ? 'bg-blue-100 text-blue-600' :
                      request.status === 'Completed' ? 'bg-green-100 text-green-600' :
                        'bg-gray-100 text-gray-600'
                    }`}>
                    {request.status}
                  </span>
                  <button
                    onClick={() => handleViewRequest(request)}
                    className="bg-blue-50 text-blue-500 hover:bg-blue-100 px-6 py-2 rounded-lg text-xs font-bold transition-colors"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          )}
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
      {/* Request Details Modal */}
      {isModalOpen && selectedRequest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 w-full max-w-md animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-6">
              <div className="w-12 h-1 bg-gray-200 rounded-full" />
            </div>

            <h3 className="text-blue-600 font-bold text-center mb-8">
              Request Details
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-500 font-medium text-xs uppercase">
                  DETAILS
                </span>
                <span className="text-gray-500 font-medium text-xs uppercase">
                  VALUE
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-600 font-medium text-sm">
                  Request Type
                </span>
                <span className="text-gray-900 font-bold text-sm text-right">
                  {selectedRequest.type}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-600 font-medium text-sm">
                  Source
                </span>
                <span className="text-gray-900 font-bold text-sm text-right">
                  {selectedRequest.request_source === 'donors' ? 'Blood Donors' :
                    selectedRequest.request_source === 'blood_banks' ? 'Blood Banks' : 'All Sources'}
                </span>
              </div>
              {selectedRequest.type === "Blood" && (
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-600 font-medium text-sm">
                    Blood Group
                  </span>
                  <span className="text-gray-900 font-bold text-sm text-right">
                    {selectedRequest.blood_group}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-600 font-medium text-sm">
                  Units Needed
                </span>
                <span className="text-gray-900 font-bold text-sm text-right">
                  {selectedRequest.units_needed} Units
                </span>
              </div>
              {selectedRequest.min_units_bank_can_send && (
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-600 font-medium text-sm">
                    Min Units (Bank)
                  </span>
                  <span className="text-gray-900 font-bold text-sm text-right">
                    {selectedRequest.min_units_bank_can_send} Units
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-600 font-medium text-sm">
                  Needed by
                </span>
                <span className="text-gray-900 font-bold text-sm text-right">
                  {new Date(selectedRequest.needed_by).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-600 font-medium text-sm">
                  Status
                </span>
                <span className={`text-sm font-bold text-right ${selectedRequest.status === 'Pending' ? 'text-yellow-600' :
                  selectedRequest.status === 'Approved' ? 'text-blue-600' :
                    selectedRequest.status === 'Completed' ? 'text-green-600' :
                      'text-gray-600'
                  }`}>
                  {selectedRequest.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackRequests;
