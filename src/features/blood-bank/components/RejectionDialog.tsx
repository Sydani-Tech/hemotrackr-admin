import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RejectionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reason: string) => void;
    donorName: string;
}

export default function RejectionDialog({
    isOpen,
    onClose,
    onConfirm,
    donorName,
}: RejectionDialogProps) {
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!reason.trim()) {
            setError("Please provide a reason for rejection");
            return;
        }
        onConfirm(reason);
        setReason("");
        setError("");
    };

    const handleClose = () => {
        setReason("");
        setError("");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 animate-in slide-in-from-bottom-4 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-serif text-gray-900">
                        Reject Appointment
                    </h3>
                    <button
                        onClick={handleClose}
                        className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="mb-6">
                    <p className="text-gray-600 mb-4">
                        You are about to reject the appointment for{" "}
                        <span className="font-bold text-gray-900">{donorName}</span>.
                    </p>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wide text-gray-900 block">
                            Reason for Rejection *
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => {
                                setReason(e.target.value);
                                setError("");
                            }}
                            placeholder="Provide a clear reason why this appointment is being rejected..."
                            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm resize-none h-32"
                        />
                        {error && (
                            <p className="text-red-500 text-xs mt-1">{error}</p>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex gap-3">
                    <Button
                        onClick={handleClose}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 h-11 rounded-lg font-semibold"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white h-11 rounded-lg font-semibold"
                    >
                        Reject Appointment
                    </Button>
                </div>
            </div>
        </div>
    );
}
