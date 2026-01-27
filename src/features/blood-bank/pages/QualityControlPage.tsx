import { useState, useEffect } from "react";
import {
    CheckCircle2,
    XCircle,
    AlertTriangle,
    TestTube,
    Search,
    Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdvancedInventoryService } from "@/core/services/AdvancedInventoryService";
import type { InventoryItem } from "@/core/services/InventoryService";
import { toast } from "react-toastify";

export default function QualityControlPage() {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ pending: 0, passed: 0, failed: 0, quarantine: 0 });
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [itemsRes, statsRes] = await Promise.all([
                AdvancedInventoryService.getPendingQualityChecks(),
                AdvancedInventoryService.getQualityStats()
            ]);
            setItems(itemsRes.data);
            setStats(statsRes);
        } catch (error) {
            console.error("Failed to load QC data", error);
            toast.error("Failed to load quality control data");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: number, status: "passed" | "failed" | "quarantine") => {
        try {
            await AdvancedInventoryService.updateQualityStatus(id, status);
            toast.success(`Item marked as ${status}`);
            fetchData(); // Refresh list
        } catch (error) {
            console.error("Failed to update status", error);
            toast.error("Failed to update quality status");
        }
    };

    const filteredItems = items.filter(item =>
        item.blood_group.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toString().includes(searchTerm)
    );

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quality Control</h1>
                    <p className="text-sm text-gray-500">Verify and approve incoming inventory</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search ID or Type..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 border rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Filter className="w-4 h-4" /> Filter
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Pending</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.pending}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Passed</p>
                    <p className="text-2xl font-bold text-green-600">{stats.passed}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Failed</p>
                    <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-orange-100 shadow-sm">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Quarantine</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.quarantine}</p>
                </div>
            </div>

            {/* Pending List */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="font-bold text-gray-800 flex items-center gap-2">
                        <TestTube className="w-5 h-5 text-gray-500" />
                        Pending Verification ({filteredItems.length})
                    </h2>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading...</div>
                ) : filteredItems.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">
                        <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-100" />
                        No items pending verification
                    </div>
                ) : (
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Blood Group</th>
                                <th className="p-4">Received Date</th>
                                <th className="p-4">Donor/Source</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50">
                                    <td className="p-4 font-mono text-gray-600">#{item.id}</td>
                                    <td className="p-4 font-bold text-gray-800">{item.type}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-red-50 text-red-700 rounded-md font-bold text-xs">
                                            {item.blood_group}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-500">
                                        {new Date(item.created_at || "").toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-gray-600">
                                        {/* Placeholder for donor logic if relation exists */}
                                        {item.donor_id ? `Donor #${item.donor_id}` : "External Transfer"}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                className="bg-green-600 hover:bg-green-700 text-white h-8 px-3"
                                                onClick={() => handleStatusUpdate(item.id, "passed")}
                                            >
                                                <CheckCircle2 className="w-4 h-4 mr-1" /> Pass
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="bg-orange-500 hover:bg-orange-600 text-white h-8 px-3"
                                                onClick={() => handleStatusUpdate(item.id, "quarantine")}
                                            >
                                                <AlertTriangle className="w-4 h-4 mr-1" /> Flag
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                className="h-8 px-3"
                                                onClick={() => handleStatusUpdate(item.id, "failed")}
                                            >
                                                <XCircle className="w-4 h-4 mr-1" /> Fail
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
