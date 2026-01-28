import { useNavigate } from "react-router-dom";
import { ChevronLeft, Loader2 } from "lucide-react";
import ScheduleSuccessModal from "../components/ScheduleSuccessModal";
import { useState, useEffect } from "react";
import { authInstance } from "@/core/api/apiInstances";

const Donations = () => {
  const navigate = useNavigate();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingStates, setLoadingStates] = useState<Record<number, 'accepting' | 'rejecting' | null>>({});

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      // Facilities use the same appointments endpoint
      const response = await authInstance.get("/facilities/appointments");
      setAppointments(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id: number) => {
    setLoadingStates(prev => ({ ...prev, [id]: 'accepting' }));
    try {
      await authInstance.patch(`/facilities/appointments/${id}`, { status: "Confirmed" });
      fetchAppointments();
      setIsSuccessModalOpen(true);
    } catch (error: any) {
      console.error("Failed to confirm appointment", error);
      alert(error?.response?.data?.message || "Action failed. Please try again.");
    } finally {
      setLoadingStates(prev => ({ ...prev, [id]: null }));
    }
  };

  const handleReject = async (id: number) => {
    setLoadingStates(prev => ({ ...prev, [id]: 'rejecting' }));
    try {
      await authInstance.patch(`/facilities/appointments/${id}`, { status: "Cancelled" });
      fetchAppointments();
    } catch (error: any) {
      console.error("Failed to reject appointment", error);
      alert(error?.response?.data?.message || "Action failed. Please try again.");
    } finally {
      setLoadingStates(prev => ({ ...prev, [id]: null }));
    }
  };

  const walkInDonors = appointments.filter((a) => a.type === "Walk-in");
  const scheduledDonors = appointments.filter((a) => a.type === "Scheduled");

  const DonationItem = ({ donor }: { donor: any }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg bg-blue-50 text-blue-600`}
        >
          {donor.donor?.blood_type || donor.blood_type || "N/A"}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-gray-700">
              {donor.donor?.first_name} {donor.donor?.last_name}
            </h3>
            <span className="bg-blue-100 text-blue-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {donor.type || "Blood Donor"}
            </span>
          </div>
          <p className="text-xs text-gray-400">
            {donor.donation_type || "Whole Blood"} •{" "}
            {new Date(donor.appointment_date || donor.created_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}, {new Date(donor.appointment_date || donor.created_at).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {donor.status === "Scheduled" && (
          <>
            <button
              onClick={() => handleAccept(donor.id)}
              disabled={loadingStates[donor.id] === 'accepting'}
              className="bg-blue-100 text-blue-700 hover:bg-blue-200 disabled:opacity-50 px-8 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2"
            >
              {loadingStates[donor.id] === 'accepting' && <Loader2 className="w-3 h-3 animate-spin" />}
              {loadingStates[donor.id] === 'accepting' ? "Accepting..." : "Accept"}
            </button>
            <button
              onClick={() => handleReject(donor.id)}
              disabled={loadingStates[donor.id] === 'rejecting'}
              className="bg-red-100 text-red-500 hover:bg-red-200 disabled:opacity-50 px-8 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2"
            >
              {loadingStates[donor.id] === 'rejecting' && <Loader2 className="w-3 h-3 animate-spin" />}
              {loadingStates[donor.id] === 'rejecting' ? "Rejecting..." : "Reject"}
            </button>
          </>
        )}
        {donor.status !== "Scheduled" && (
          <span className={`px-4 py-2 rounded-lg text-xs font-bold ${donor.status === "Confirmed" ? "bg-green-100 text-green-700" :
              donor.status === "Completed" ? "bg-blue-100 text-blue-700" :
                "bg-gray-100 text-gray-700"
            }`}>
            {donor.status}
          </span>
        )}
        <button className="bg-green-100 text-green-700 hover:bg-green-200 px-6 py-2 rounded-lg text-xs font-bold transition-colors">
          View Profile
        </button>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Walk-in Donations */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-3xl font-serif text-gray-900">
            Walk-in donations
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm min-h-[200px]">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : walkInDonors.length > 0 ? (
            walkInDonors.map((donor) => (
              <DonationItem key={donor.id} donor={donor} />
            ))
          ) : (
            <div className="text-center py-12 text-gray-400">
              <p>No walk-in donations</p>
            </div>
          )}
        </div>
      </div>

      {/* Scheduled Donations */}
      <div>
        <h2 className="text-3xl font-serif text-gray-900 mb-6 pl-12">
          Scheduled donations
        </h2>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm min-h-[200px]">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : scheduledDonors.length > 0 ? (
            scheduledDonors.map((donor) => (
              <DonationItem key={donor.id} donor={donor} />
            ))
          ) : (
            <div className="text-center py-12 text-gray-400">
              <p>No scheduled donations</p>
            </div>
          )}
        </div>
      </div>

      <ScheduleSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};

export default Donations;
