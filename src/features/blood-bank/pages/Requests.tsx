import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { BloodBankAPI } from "@/core/services/BloodBankService";
import ViewOffersModal from "../components/ViewOffersModal";

const Requests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewOffersModal, setViewOffersModal] = useState<{ isOpen: boolean; requestId: number | null }>({ isOpen: false, requestId: null });

  useEffect(() => {
    fetchRequests();
  }, []);

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

  const handleCancel = async (id: number) => {
    if (!confirm("Are you sure you want to take down this request?")) return;

    try {
      await BloodBankAPI.cancelRequest(id);
      alert("Request cancelled successfully");
      fetchRequests(); // Refresh list
    } catch (error: any) {
      alert("Failed to cancel request: " + (error.response?.data?.message || error.message));
    }
  };

  const handleShare = (request: any) => {
    const text = `Emergency Blood Request: ${request.type} - ${request.blood_group} (${request.units_needed} units) needed by ${new Date(request.needed_by).toLocaleDateString()}.`;
    navigator.clipboard.writeText(text);
    alert("Request details copied to clipboard!");
  };



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
        {loading ? (
          <p className="text-gray-500 text-center py-8">Loading requests status...</p>
        ) : requests.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No active requests found.</p>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between pb-6 border-b border-gray-50 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-lg">
                  {request.blood_group || request.type.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-700">{request.type} request</h3>
                    <span className="bg-blue-100 text-blue-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {request.request_source === 'donors' ? 'Blood donor' :
                        request.request_source === 'blood_banks' ? 'Blood Bank' : 'All Sources'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {request.units_needed} pint{request.units_needed > 1 ? 's' : ''} • {new Date(request.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`px-6 py-2 rounded-lg text-xs font-bold ${request.status === "Completed" || request.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : request.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-50 text-blue-500"
                    }`}
                >
                  {request.status}
                </span>

                {request.status !== 'Cancelled' && request.status !== 'Completed' && (
                  <button
                    onClick={() => handleCancel(request.id)}
                    className="bg-red-50 text-red-500 hover:bg-red-100 px-6 py-2 rounded-lg text-xs font-bold transition-colors"
                  >
                    Take down request
                  </button>
                )}

                {request.status === 'Pending' && (
                  <button
                    onClick={() => setViewOffersModal({ isOpen: true, requestId: request.id })}
                    className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm flex items-center gap-2"
                  >
                    View Offers
                  </button>
                )}

                <button
                  onClick={() => handleShare(request)}
                  className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-8 py-2 rounded-lg text-xs font-bold transition-colors"
                >
                  Share
                </button>
              </div>
            </div>
          )))}
      </div>

      <ViewOffersModal
        isOpen={viewOffersModal.isOpen}
        onClose={() => setViewOffersModal({ isOpen: false, requestId: null })}
        requestId={viewOffersModal.requestId}
        onSuccess={() => {
          fetchRequests(); // Refresh status
        }}
      />
    </div >
  );
};

export default Requests;
