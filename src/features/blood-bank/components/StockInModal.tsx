import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Plus, Trash2, CheckCircle } from "lucide-react";
import { InventoryService } from "@/core/services/InventoryService";
import QrCodeGenerator from "./QrCodeGenerator";

interface StockInModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

interface BatchForm {
    id: string;
    blood_group: string;
    type: string;
    units: number;
    location: string;
    expiry_date: string;
}

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const bloodTypes = ["Whole Blood", "RBC", "PLT", "FFP", "Cryo", "Platelets"];

export default function StockInModal({ isOpen, onClose, onSuccess }: StockInModalProps) {
    const [batches, setBatches] = useState<BatchForm[]>([
        {
            id: Date.now().toString(),
            blood_group: "A+",
            type: "Whole Blood",
            units: 1,
            location: "Main Storage",
            expiry_date: "",
        },
    ]);
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [addedBatches, setAddedBatches] = useState<BatchForm[]>([]);

    if (!isOpen) return null;

    const addBatch = () => {
        setBatches([
            ...batches,
            {
                id: Date.now().toString(),
                blood_group: "A+",
                type: "Whole Blood",
                units: 1,
                location: "Main Storage",
                expiry_date: "",
            },
        ]);
    };

    const removeBatch = (id: string) => {
        if (batches.length > 1) {
            setBatches(batches.filter((b) => b.id !== id));
        }
    };

    const updateBatch = (id: string, field: keyof BatchForm, value: any) => {
        setBatches(
            batches.map((batch) =>
                batch.id === id ? { ...batch, [field]: value } : batch
            )
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // For each batch, create inventory item or update existing
            for (const batch of batches) {
                await InventoryService.createItem({
                    organization_id: 0, // Backend resolves this from auth user
                    blood_group: batch.blood_group,
                    type: batch.type,
                    units_in_stock: batch.units,
                    location: batch.location,
                    expiry_date: batch.expiry_date || undefined,
                    threshold: 10,
                });
            }

            setAddedBatches([...batches]);
            setShowSuccess(true);
            // onSuccess(); // Refresh data only after closing the success view to avoid jarring updates
        } catch (error: any) {
            console.error("Failed to stock in", error);
            alert(error?.response?.data?.message || "Failed to add stock. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (showSuccess) {
            onSuccess(); // Trigger refresh when closing success modal
        }
        setShowSuccess(false);
        setBatches([
            {
                id: Date.now().toString(),
                blood_group: "A+",
                type: "Whole Blood",
                units: 1,
                location: "Main Storage",
                expiry_date: "",
            },
        ]);
        setNotes("");
        onClose();
    };

    if (showSuccess) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
                <div className="absolute inset-0 transition-opacity -z-10" onClick={handleClose} />
                <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-green-50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-full">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Stock Added Successfully</h2>
                                <p className="text-sm text-green-700">Detailed labels ready for printing</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="w-8 h-8 rounded-full hover:bg-white/50 flex items-center justify-center transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {addedBatches.map((batch, index) => (
                                <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
                                    <QrCodeGenerator
                                        data={{
                                            id: batch.id, // In real app use returned ID from API
                                            bg: batch.blood_group,
                                            type: batch.type,
                                            exp: batch.expiry_date
                                        }}
                                        label={`${batch.blood_group} ${batch.type}`}
                                        size={100}
                                    />
                                    <div className="space-y-2 flex-1 pt-2">
                                        <h3 className="font-bold text-lg text-gray-900">{batch.blood_group} {batch.type}</h3>
                                        <div className="text-sm text-gray-500 space-y-1">
                                            <p>Units: <span className="font-medium text-gray-900">{batch.units}</span></p>
                                            <p>Location: <span className="font-medium text-gray-900">{batch.location}</span></p>
                                            <p>Expiry: <span className="font-medium text-gray-900">{batch.expiry_date || "N/A"}</span></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 border-t border-gray-100 flex justify-end">
                        <Button onClick={handleClose} className="bg-blue-600 text-white min-w-[120px]">
                            Done
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
            <div className="absolute inset-0 transition-opacity -z-10" onClick={handleClose} />
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Stock In - Receive Blood</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">Add blood inventory items</p>
                        <Button
                            type="button"
                            onClick={addBatch}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Batch
                        </Button>
                    </div>

                    {/* Batches */}
                    <div className="space-y-4">
                        {batches.map((batch, index) => (
                            <div
                                key={batch.id}
                                className="p-4 border border-gray-200 rounded-xl bg-gray-50 space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold text-gray-700">Batch {index + 1}</h3>
                                    {batches.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeBatch(batch.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-2">
                                            Blood Group *
                                        </label>
                                        <select
                                            value={batch.blood_group}
                                            onChange={(e) => updateBatch(batch.id, "blood_group", e.target.value)}
                                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        >
                                            {bloodGroups.map((bg) => (
                                                <option key={bg} value={bg}>
                                                    {bg}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-2">
                                            Type *
                                        </label>
                                        <select
                                            value={batch.type}
                                            onChange={(e) => updateBatch(batch.id, "type", e.target.value)}
                                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        >
                                            {bloodTypes.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-2">
                                            Units (pints) *
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={batch.units}
                                            onChange={(e) => updateBatch(batch.id, "units", parseInt(e.target.value))}
                                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-2">
                                            Expiry Date
                                        </label>
                                        <input
                                            type="date"
                                            value={batch.expiry_date}
                                            onChange={(e) => updateBatch(batch.id, "expiry_date", e.target.value)}
                                            min={new Date().toISOString().split("T")[0]}
                                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-xs font-semibold text-gray-700 mb-2">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            value={batch.location}
                                            onChange={(e) => updateBatch(batch.id, "location", e.target.value)}
                                            placeholder="e.g., Fridge #1, Shelf A"
                                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">
                            Notes (Optional)
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add any additional notes..."
                            rows={3}
                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t">
                        <Button
                            type="button"
                            onClick={onClose}
                            variant="outline"
                            className="flex-1"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save & Receive"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
