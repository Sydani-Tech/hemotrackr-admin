import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BloodBankAPI } from "@/core/services/BloodBankService";
import { toast } from "react-toastify";

interface RecordDonationModalProps {
    isOpen: boolean;
    onClose: () => void;
    appointment: any;
    onSuccess: () => void;
}

const RecordDonationModal = ({
    isOpen,
    onClose,
    appointment,
    onSuccess,
}: RecordDonationModalProps) => {
    const [units, setUnits] = useState("1");
    const [bloodGroup, setBloodGroup] = useState(
        appointment?.blood_group || appointment?.donor?.blood_group || ""
    );
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen || !appointment) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await BloodBankAPI.recordDonation(appointment.id, {
                units: parseInt(units),
                blood_group: bloodGroup,
                doctor_notes: notes,
            });
            toast.success("Donation recorded and inventory updated!");
            onSuccess();
            onClose();
        } catch (error: any) {
            console.error("Failed to record donation:", error);
            toast.error(
                error.response?.data?.message || "Failed to record donation. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl w-full max-w-md p-8 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-xl font-bold text-gray-900 mb-2">Record Donation</h3>
                <p className="text-sm text-gray-500 mb-6">
                    Record the successful blood donation for{" "}
                    <span className="font-semibold text-gray-900">
                        {appointment.donor?.first_name} {appointment.donor?.last_name}
                    </span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
                            Units Collected (Pints)
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={units}
                            onChange={(e) => setUnits(e.target.value)}
                            required
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
                            Confirmed Blood Group
                        </label>
                        <select
                            value={bloodGroup}
                            onChange={(e) => setBloodGroup(e.target.value)}
                            required
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
                            Doctor Notes (Optional)
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            placeholder="Any observations regarding this donation..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Recording...
                                </span>
                            ) : (
                                "Record & Update Stock"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RecordDonationModal;
