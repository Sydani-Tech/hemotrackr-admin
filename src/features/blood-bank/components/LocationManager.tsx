import { useState, useEffect } from "react";
import {
    FolderPlus,
    MapPin,
    Trash2,
    ChevronRight,
    Thermometer,
    Box,
    LayoutGrid
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StorageLocationService, type StorageLocation } from "@/core/services/StorageLocationService";
import { cn } from "@/lib/utils";

interface LocationManagerProps {
    onSelectLocation?: (location: StorageLocation) => void;
    selectionMode?: boolean;
}

export default function LocationManager({ onSelectLocation, selectionMode = false }: LocationManagerProps) {
    const [locations, setLocations] = useState<StorageLocation[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentParent, setCurrentParent] = useState<StorageLocation | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        location_type: "shelf",
        capacity: "",
        min_temperature: "",
        max_temperature: "",
        notes: ""
    });

    useEffect(() => {
        fetchLocations(currentParent?.id);
    }, [currentParent]);

    const fetchLocations = async (parentId?: number) => {
        setLoading(true);
        try {
            const params = parentId ? { parent_id: parentId } : { hierarchy: true };
            const response = await StorageLocationService.getLocations(params);
            setLocations(response.data || []);
        } catch (error) {
            console.error("Failed to fetch locations", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await StorageLocationService.createLocation({
                name: formData.name,
                location_type: formData.location_type as any,
                notes: formData.notes,
                parent_location_id: currentParent?.id || null,
                capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
                min_temperature: formData.min_temperature ? parseFloat(formData.min_temperature) : undefined,
                max_temperature: formData.max_temperature ? parseFloat(formData.max_temperature) : undefined,
            });
            setIsCreateOpen(false);
            resetForm();
            fetchLocations(currentParent?.id);
        } catch (error) {
            console.error("Failed to create location", error);
            alert("Failed to create location");
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            location_type: "shelf",
            capacity: "",
            min_temperature: "",
            max_temperature: "",
            notes: ""
        });
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "fridge": return <Thermometer className="w-4 h-4 text-blue-500" />;
            case "freezer": return <Thermometer className="w-4 h-4 text-cyan-600" />;
            case "shelf": return <LayoutGrid className="w-4 h-4 text-orange-500" />;
            case "container": return <Box className="w-4 h-4 text-brown-500" />;
            default: return <MapPin className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {/* Breadcrumb Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-sm">
                    <button
                        onClick={() => setCurrentParent(null)}
                        className={cn("hover:text-blue-600 font-medium", !currentParent && "text-blue-600")}
                    >
                        All Locations
                    </button>
                    {currentParent && (
                        <>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                            <span className="font-bold text-gray-800">{currentParent.name}</span>
                        </>
                    )}
                </div>
                {!selectionMode && (
                    <Button
                        size="sm"
                        onClick={() => setIsCreateOpen(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
                    >
                        <FolderPlus className="w-4 h-4" />
                        Add Location
                    </Button>
                )}
            </div>

            {/* Location Grid */}
            {loading ? (
                <div className="text-center py-12 text-gray-400">Loading locations...</div>
            ) : locations.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-xl">
                    <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No locations found here</p>
                    {!selectionMode && (
                        <Button
                            variant="link"
                            onClick={() => setIsCreateOpen(true)}
                            className="text-blue-600 mt-2"
                        >
                            Create your first location
                        </Button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {locations.map((loc) => (
                        <div
                            key={loc.id}
                            onClick={() => {
                                if (selectionMode && onSelectLocation) {
                                    onSelectLocation(loc);
                                } else if (loc.location_type === "room" || loc.location_type === "fridge" || loc.location_type === "shelf") {
                                    setCurrentParent(loc);
                                }
                            }}
                            className={cn(
                                "p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer bg-gray-50/50 group",
                                selectionMode && "hover:bg-blue-50 hover:border-blue-300"
                            )}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                        {getTypeIcon(loc.location_type)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-sm">{loc.name}</h3>
                                        <p className="text-[10px] text-gray-500 uppercase font-semibold">{loc.location_type}</p>
                                    </div>
                                </div>
                                {!selectionMode && (
                                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 text-red-500 rounded transition-all">
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                )}
                            </div>

                            <div className="mt-3 flex gap-2 text-[10px] text-gray-500">
                                {loc.min_temperature !== null && (
                                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <Thermometer className="w-3 h-3" />
                                        {loc.current_temperature || loc.min_temperature}°C
                                    </span>
                                )}
                                <span className="bg-gray-200 px-2 py-0.5 rounded-full">
                                    {loc.current_load} units
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Modal */}
            {isCreateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
                        <h2 className="text-lg font-bold mb-4">Add New Location</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold mb-1">Name</label>
                                <input
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border rounded-lg px-3 py-2 text-sm"
                                    placeholder="e.g. Main Fridge, Shelf A"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold mb-1">Type</label>
                                    <select
                                        value={formData.location_type}
                                        onChange={e => setFormData({ ...formData, location_type: e.target.value })}
                                        className="w-full border rounded-lg px-3 py-2 text-sm"
                                    >
                                        <option value="room">Room</option>
                                        <option value="fridge">Fridge</option>
                                        <option value="freezer">Freezer</option>
                                        <option value="shelf">Shelf</option>
                                        <option value="container">Container</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1">Capacity</label>
                                    <input
                                        type="number"
                                        value={formData.capacity}
                                        onChange={e => setFormData({ ...formData, capacity: e.target.value })}
                                        className="w-full border rounded-lg px-3 py-2 text-sm"
                                    />
                                </div>
                            </div>

                            {(formData.location_type === "fridge" || formData.location_type === "freezer") && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold mb-1">Min Temp(°C)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={formData.min_temperature}
                                            onChange={e => setFormData({ ...formData, min_temperature: e.target.value })}
                                            className="w-full border rounded-lg px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold mb-1">Max Temp(°C)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={formData.max_temperature}
                                            onChange={e => setFormData({ ...formData, max_temperature: e.target.value })}
                                            className="w-full border rounded-lg px-3 py-2 text-sm"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="pt-2 flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setIsCreateOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1 bg-blue-600 text-white">
                                    Create Location
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
