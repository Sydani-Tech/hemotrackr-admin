import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Calendar, User } from "lucide-react";
import { BloodBankAPI as BloodBankService } from "@/core/services/BloodBankService";

const AppointmentHistory = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchHistory();
    }, [filterStatus]);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const params: any = { per_page: 100 };
            if (filterStatus !== "all") {
                params.status = filterStatus;
            }
            const response = await BloodBankService.getAppointments(params);
            setAppointments(response.data.data);
        } catch (error) {
            console.error("Failed to fetch appointment history", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredAppointments = appointments.filter((appointment) => {
        if (!searchQuery) return true;
        const donorName = `${appointment.donor?.first_name} ${appointment.donor?.last_name}`.toLowerCase();
        return donorName.includes(searchQuery.toLowerCase());
    });

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            Scheduled: "bg-yellow-100 text-yellow-700",
            Confirmed: "bg-blue-100 text-blue-700",
            Completed: "bg-green-100 text-green-700",
            Cancelled: "bg-red-100 text-red-700",
            "No-Show": "bg-gray-100 text-gray-700",
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status] || "bg-gray-100 text-gray-700"}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <h2 className="text-3xl font-serif text-gray-900">Appointment History</h2>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search by donor name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="md:w-48">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                            <option value="all">All Status</option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="No-Show">No-Show</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[500px]">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    </div>
                ) : filteredAppointments.length > 0 ? (
                    <div className="space-y-4">
                        {filteredAppointments.map((appointment) => (
                            <div
                                key={appointment.id}
                                className="border border-gray-100 rounded-xl p-6 hover:border-gray-200 transition-colors"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <User className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">
                                                {appointment.donor
                                                    ? `${appointment.donor.first_name} ${appointment.donor.last_name}`
                                                    : "Unknown Donor"}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {appointment.donor?.blood_group || "N/A"} • {appointment.donation_type}
                                            </p>
                                        </div>
                                    </div>
                                    {getStatusBadge(appointment.status)}
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500 text-xs mb-1">Date</p>
                                        <p className="font-semibold text-gray-900">
                                            {new Date(appointment.appointment_date).toLocaleDateString(undefined, {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs mb-1">Time</p>
                                        <p className="font-semibold text-gray-900">
                                            {appointment.appointment_time?.slice(0, 5) || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs mb-1">Type</p>
                                        <p className="font-semibold text-gray-900">{appointment.type || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs mb-1">Created</p>
                                        <p className="font-semibold text-gray-900">
                                            {new Date(appointment.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                {appointment.cancellation_reason && (
                                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                                        <p className="text-xs font-bold text-red-700 mb-1">Cancellation Reason:</p>
                                        <p className="text-sm text-red-600">{appointment.cancellation_reason}</p>
                                    </div>
                                )}

                                {appointment.notes && (
                                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                        <p className="text-xs font-bold text-gray-700 mb-1">Notes:</p>
                                        <p className="text-sm text-gray-600">{appointment.notes}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-400">No appointments found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentHistory;
