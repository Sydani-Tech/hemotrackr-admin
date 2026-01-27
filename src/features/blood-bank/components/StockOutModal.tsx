import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, AlertCircle } from "lucide-react";
import { InventoryService, type InventoryItem } from "@/core/services/InventoryService";

interface StockOutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const reasons = [
    { value: "issued_to_hospital", label: "Issue to Hospital" },
    { value: "expired", label: "Discard (Expired)" },
    { value: "quality_fail", label: "Discard (Quality Fail)" },
    { value: "damaged", label: "Discard (Damaged)" },
    { value: "testing", label: "Used for Testing" },
];

export default function StockOutModal({ isOpen, onClose, onSuccess }: StockOutModalProps) {
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [units, setUnits] = useState(1);
    const [reason, setReason] = useState("issued_to_hospital");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetchingInventory, setFetchingInventory] = useState(true);

    useEffect(() => {
        if (isOpen) {
            fetchInventory();
        }
    }, [isOpen]);

    const fetchInventory = async () => {
        setFetchingInventory(true);
        try {
            const response = await InventoryService.getInventory();
            // Only show items with stock > 0
            const availableItems = (response.data || []).filter(
                (item: InventoryItem) => item.units_in_stock > 0
            );
            setInventory(availableItems);
        } catch (error) {
            console.error("Failed to fetch inventory", error);
        } finally {
            setFetchingInventory(false);
        }
    };

    if (!isOpen) return null;

    const selectedItemData = inventory.find((item) => item.id === selectedItem);
    const maxUnits = selectedItemData?.units_in_stock || 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedItem) {
            alert("Please select an inventory item");
            return;
        }

        if (units > maxUnits) {
            alert(`Cannot remove more than ${maxUnits} units`);
            return;
        }

        setLoading(true);

        try {
            // Adjust stock (negative value to remove)
            await InventoryService.adjustStock(selectedItem, {
                adjustment: -units,
                reason: `${reason}: ${notes}`,
            });

            onSuccess();
            onClose();
            // Reset form
            setSelectedItem(null);
            setUnits(1);
            setReason("issued_to_hospital");
            setNotes("");
        } catch (error: any) {
            console.error("Failed to stock out", error);
            alert(error?.response?.data?.message || "Failed to remove stock. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
            <div className="absolute inset-0 transition-opacity  -z-10" onClick={onClose} />
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Stock Out - Issue/Remove Blood</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    {fetchingInventory ? (
                        <div className="text-center py-12 text-gray-400">Loading inventory...</div>
                    ) : inventory.length === 0 ? (
                        <div className="text-center py-12">
                            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">No inventory items available</p>
                        </div>
                    ) : (
                        <>
                            {/* Reason */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Reason for Stock Out *
                                </label>
                                <div className="space-y-2">
                                    {reasons.map((r) => (
                                        <label
                                            key={r.value}
                                            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                        >
                                            <input
                                                type="radio"
                                                name="reason"
                                                value={r.value}
                                                checked={reason === r.value}
                                                onChange={(e) => setReason(e.target.value)}
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <span className="text-sm text-gray-700">{r.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Select Item */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Select Inventory Item *
                                </label>
                                <select
                                    value={selectedItem || ""}
                                    onChange={(e) => {
                                        setSelectedItem(Number(e.target.value));
                                        setUnits(1); // Reset units when changing item
                                    }}
                                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">-- Select Item --</option>
                                    {inventory.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.blood_group} {item.type} - {item.units_in_stock} units available
                                            {item.location && ` (${item.location})`}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Units */}
                            {selectedItem && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Units to Remove *
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max={maxUnits}
                                        value={units}
                                        onChange={(e) => setUnits(Math.min(parseInt(e.target.value) || 1, maxUnits))}
                                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Maximum: {maxUnits} units available
                                    </p>
                                </div>
                            )}

                            {/* Notes */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Notes *
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Provide details (hospital name, request ID, reason, etc.)"
                                    rows={4}
                                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            {/* Summary */}
                            {selectedItem && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-800 mb-2 text-sm">Summary:</h3>
                                    <div className="text-sm text-gray-700 space-y-1">
                                        <p>
                                            • Removing <strong>{units} units</strong> of{" "}
                                            <strong>
                                                {selectedItemData?.blood_group} {selectedItemData?.type}
                                            </strong>
                                        </p>
                                        <p>
                                            • Remaining: <strong>{maxUnits - units} units</strong>
                                        </p>
                                        <p>
                                            • Reason: <strong>{reasons.find((r) => r.value === reason)?.label}</strong>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

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
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                            disabled={loading || !selectedItem || fetchingInventory}
                        >
                            {loading ? "Processing..." : "Confirm Stock Out"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
