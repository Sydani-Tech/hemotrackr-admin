import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Split, TestTube, AlertTriangle } from "lucide-react";
import { AdvancedInventoryService, type ComponentConfig } from "@/core/services/AdvancedInventoryService";
import type { InventoryItem } from "@/core/services/InventoryService";

interface ComponentSeparationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    parentItem: InventoryItem | null;
}

export default function ComponentSeparationModal({
    isOpen,
    onClose,
    onSuccess,
    parentItem
}: ComponentSeparationModalProps) {
    const [loading, setLoading] = useState(false);
    const [configs, setConfigs] = useState<ComponentConfig[]>([
        { type: "RBC", units: 1 },
        { type: "Plasma", units: 1 }
    ]);

    if (!isOpen || !parentItem) return null;

    const handleSeparate = async () => {
        setLoading(true);
        try {
            await AdvancedInventoryService.separateComponents(parentItem.id, configs);
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Failed to separate components", error);
            alert("Failed to separate components.");
        } finally {
            setLoading(false);
        }
    };

    const updateConfig = (index: number, field: keyof ComponentConfig, value: any) => {
        const newConfigs = [...configs];
        newConfigs[index] = { ...newConfigs[index], [field]: value };
        setConfigs(newConfigs);
    };

    const addConfig = () => {
        setConfigs([...configs, { type: "Platelets", units: 1 }]);
    };

    const removeConfig = (index: number) => {
        if (configs.length > 1) {
            setConfigs(configs.filter((_, i) => i !== index));
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-purple-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-full">
                            <Split className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Component Separation</h2>
                            <p className="text-xs text-purple-600">
                                Processing {parentItem.blood_group} Whole Blood (#{parentItem.id})
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/50 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="bg-blue-50 p-3 rounded-lg flex items-start gap-3 text-sm text-blue-700">
                        <AlertTriangle className="w-4 h-4 mt-0.5" />
                        <p>
                            This will deduct <strong>1 unit</strong> from the parent Whole Blood stock and create new inventory items for the components below.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-gray-700">Resulting Components</label>
                        {configs.map((config, idx) => (
                            <div key={idx} className="flex gap-3 items-center bg-gray-50 p-2 rounded-lg border border-gray-200">
                                <div className="p-2 bg-white rounded border border-gray-100">
                                    <TestTube className="w-4 h-4 text-gray-500" />
                                </div>
                                <select
                                    value={config.type}
                                    onChange={(e) => updateConfig(idx, "type", e.target.value)}
                                    className="flex-1 bg-white border border-gray-300 rounded px-2 py-1.5 text-sm"
                                >
                                    <option value="RBC">Red Blood Cells (RBC)</option>
                                    <option value="Plasma">Fresh Frozen Plasma</option>
                                    <option value="Platelets">Platelets</option>
                                    <option value="Cryo">Cryoprecipitate</option>
                                </select>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">Units:</span>
                                    <input
                                        type="number"
                                        min="1"
                                        value={config.units}
                                        onChange={(e) => updateConfig(idx, "units", parseInt(e.target.value))}
                                        className="w-16 bg-white border border-gray-300 rounded px-2 py-1.5 text-sm"
                                    />
                                </div>
                                <button
                                    onClick={() => removeConfig(idx)}
                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                                    disabled={configs.length <= 1}
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}

                        <Button
                            type="button"
                            variant="outline"
                            onClick={addConfig}
                            className="w-full border-dashed text-gray-500"
                        >
                            + Add Another Component
                        </Button>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button
                        onClick={handleSeparate}
                        disabled={loading}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                        {loading ? "Processing..." : "Confirm Separation"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
