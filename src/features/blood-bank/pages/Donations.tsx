import { useNavigate } from "react-router-dom";
import { ChevronLeft, Loader2, History } from "lucide-react";
import ScheduleSuccessModal from "../components/ScheduleSuccessModal";
import RejectionDialog from "../components/RejectionDialog";
import { useEffect, useState } from "react";
import { BloodBankAPI as BloodBankService } from "@/core/services/BloodBankService";

type AppointmentStatus = "Scheduled" | "Confirmed" | "Cancelled" | "Completed";

const Donations = () => {
  const navigate = useNavigate();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<AppointmentStatus>("Scheduled");
  const [rejectionDialog, setRejectionDialog] = useState<{
    isOpen: boolean;
    appointmentId: number | null;
    donorName: string;
  }>({ isOpen: false, appointmentId: null, donorName: "" });

  useEffect(() => {
    fetchAppointments();
  }, [activeTab]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await BloodBankService.getAppointments({
        status: activeTab,
        per_page: 100,
      });
      setAppointments(response.data.data);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id: number) => {
    try {
      await BloodBankService.updateAppointmentStatus(id, "Confirmed");
      fetchAppointments();
      setIsSuccessModalOpen(true);
    } catch (error: any) {
      console.error("Failed to confirm appointment", error);
      alert(error?.response?.data?.message || "Action failed. Please try again.");
    }
  };

  const handleRejectClick = (appointment: any) => {
    setRejectionDialog({
      isOpen: true,
      appointmentId: appointment.id,
      donorName: `${appointment.donor?.first_name} ${appointment.donor?.last_name}`,
    });
  };

  const handleRejectConfirm = async (reason: string) => {
    if (!rejectionDialog.appointmentId) return;

    try {
      await BloodBankService.updateAppointmentStatus(
        rejectionDialog.appointmentId,
        "Cancelled",
        reason
      );
      setRejectionDialog({ isOpen: false, appointmentId: null, donorName: "" });
      fetchAppointments();
    } catch (error: any) {
      console.error("Failed to reject appointment", error);
      alert(error?.response?.data?.message || "Action failed. Please try again.");
    }
  };

  const walkInDonors = appointments.filter((a) => a.type === "Walk-in");
  const scheduledDonors = appointments.filter((a) => a.type === "Scheduled");

  const tabs: { label: string; value: AppointmentStatus; count?: number }[] = [
    { label: "Pending", value: "Scheduled" },
    { label: "Confirmed", value: "Confirmed" },
    { label: "Completed", value: "Completed" },
    { label: "Cancelled", value: "Cancelled" },
  ];

  const DonationItem = ({ appointment }: { appointment: any }) => (
    <div className="flex items-center justify-between py-4 px-6 bg-gray-50 rounded-xl mb-3">
      <div className="flex items-center gap-4">
        {/* Blood Type Badge */}
        <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center">
          <span className="text-blue-600 font-bold text-lg">
            {appointment.donor?.blood_group || "??"}
          </span>
        </div>

        {/* Donor Info */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 text-base">
              {appointment.donor
                ? `${appointment.donor.first_name} ${appointment.donor.last_name}`
                : "Unknown Donor"}
            </h3>
            <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2.5 py-0.5 rounded">
              Blood donor
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {appointment.donation_type} • {new Date(appointment.appointment_date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}, {appointment.appointment_time?.slice(0, 5) || "N/A"}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {activeTab === "Scheduled" && (
          <>
            <button
              className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-8 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              onClick={() => handleAccept(appointment.id)}
            >
              Accept
            </button>
            <button
              className="bg-red-100 text-red-600 hover:bg-red-200 px-8 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              onClick={() => handleRejectClick(appointment)}
            >
              Reject
            </button>
          </>
        )}
        <button
          className="bg-green-100 text-green-700 hover:bg-green-200 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          onClick={() => navigate(`/blood-bank/update-donor/${appointment.donor?.id}`)}
        >
          View Profile
        </button>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-3xl font-serif text-gray-900">Donations</h2>
        </div>

        <button
          onClick={() => navigate("/blood-bank/appointment-history")}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 transition-colors"
        >
          <History className="w-4 h-4" />
          View History
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`pb-3 px-4 text-sm font-semibold transition-colors relative ${activeTab === tab.value
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : activeTab === "Scheduled" ? (
        <div className="space-y-6">
          {/* Walk-in Section */}
          {walkInDonors.length > 0 && (
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => navigate(-1)}
                  className="w-10 h-10 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <h3 className="text-2xl font-serif text-gray-900">Walk-in donations</h3>
              </div>
              <div>
                {walkInDonors.map((appointment) => (
                  <DonationItem key={appointment.id} appointment={appointment} />
                ))}
              </div>
            </div>
          )}

          {/* Scheduled Section */}
          {scheduledDonors.length > 0 && (
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-serif text-gray-900 mb-6">Scheduled donations</h3>
              <div>
                {scheduledDonors.map((appointment) => (
                  <DonationItem key={appointment.id} appointment={appointment} />
                ))}
              </div>
            </div>
          )}

          {walkInDonors.length === 0 && scheduledDonors.length === 0 && (
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <p className="text-gray-400 text-center py-12">No pending appointments</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm min-h-[400px]">
          {appointments.length > 0 ? (
            <div>
              {appointments.map((appointment) => (
                <DonationItem key={appointment.id} appointment={appointment} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-12">
              No {activeTab.toLowerCase()} appointments
            </p>
          )}
        </div>
      )}

      <ScheduleSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />

      <RejectionDialog
        isOpen={rejectionDialog.isOpen}
        onClose={() =>
          setRejectionDialog({ isOpen: false, appointmentId: null, donorName: "" })
        }
        onConfirm={handleRejectConfirm}
        donorName={rejectionDialog.donorName}
      />
    </div>
  );
};

export default Donations;
