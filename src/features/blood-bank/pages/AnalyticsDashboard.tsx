import { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";
import {
    AnalyticsService,
    type AnalyticsSummary,
    type BloodGroupData,
    type TypeData,
    type ExpiryTimeline,
    type AlertsSummary
} from "@/core/services/AnalyticsService";
import { Loader2, TrendingUp, AlertTriangle, Clock, Droplets } from "lucide-react";

export default function AnalyticsDashboard() {
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
    const [bloodGroupData, setBloodGroupData] = useState<BloodGroupData[]>([]);
    const [typeData, setTypeData] = useState<TypeData[]>([]);
    const [expiryData, setExpiryData] = useState<ExpiryTimeline | null>(null);
    const [alertsData, setAlertsData] = useState<AlertsSummary | null>(null);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [summaryRes, bloodGroupRes, typeRes, expiryRes, alertsRes] = await Promise.all([
                AnalyticsService.getSummary(),
                AnalyticsService.getByBloodGroup(),
                AnalyticsService.getByType(),
                AnalyticsService.getExpiryTimeline(),
                AnalyticsService.getAlertsSummary(),
            ]);

            setSummary(summaryRes);
            setBloodGroupData(bloodGroupRes.data);
            setTypeData(typeRes.data);
            setExpiryData(expiryRes);
            setAlertsData(alertsRes);
        } catch (error) {
            console.error("Failed to load analytics", error);
        } finally {
            setLoading(false);
        }
    };

    // Transform expiry data for pie chart
    const expiryChartData = expiryData
        ? [
            { name: "Expired", value: expiryData.expired, color: "#ef4444" },
            { name: "< 7 Days", value: expiryData.within_7_days, color: "#f97316" },
            { name: "7-14 Days", value: expiryData.within_14_days, color: "#eab308" },
            { name: "14-30 Days", value: expiryData.within_30_days, color: "#22c55e" },
            { name: "> 30 Days", value: expiryData.beyond_30_days, color: "#3b82f6" },
            { name: "No Expiry", value: expiryData.no_expiry, color: "#9ca3af" },
        ].filter(d => d.value > 0)
        : [];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                    <p className="text-sm text-gray-500">Inventory insights and trends</p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Droplets className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-xs font-semibold text-gray-500 uppercase">Total Units</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{summary?.total_units || 0}</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-50 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-orange-600" />
                        </div>
                        <span className="text-xs font-semibold text-gray-500 uppercase">Low Stock</span>
                    </div>
                    <p className="text-3xl font-bold text-orange-600">{summary?.low_stock_count || 0}</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-red-50 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <span className="text-xs font-semibold text-gray-500 uppercase">Out of Stock</span>
                    </div>
                    <p className="text-3xl font-bold text-red-600">{summary?.out_of_stock_count || 0}</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-yellow-50 rounded-lg">
                            <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <span className="text-xs font-semibold text-gray-500 uppercase">Expiring Soon</span>
                    </div>
                    <p className="text-3xl font-bold text-yellow-600">{summary?.expiring_soon_count || 0}</p>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Blood Group Distribution */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4">Stock by Blood Group</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={bloodGroupData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="blood_group" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: 8,
                                        border: "1px solid #e5e7eb",
                                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                                    }}
                                />
                                <Bar dataKey="total_units" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Type Distribution */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4">Stock by Product Type</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={typeData} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 60 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis type="number" tick={{ fontSize: 12 }} />
                                <YAxis type="category" dataKey="type" tick={{ fontSize: 12 }} width={80} />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: 8,
                                        border: "1px solid #e5e7eb",
                                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                                    }}
                                />
                                <Bar dataKey="total_units" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Expiry Timeline Pie */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4">Expiry Timeline</h3>
                    <div className="h-64">
                        {expiryChartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={expiryChartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={2}
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                                        labelLine={false}
                                    >
                                        {expiryChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-400">
                                No expiry data available
                            </div>
                        )}
                    </div>
                </div>

                {/* Alerts Summary */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4">Active Alerts</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                                <span className="font-medium text-red-800">Critical</span>
                            </div>
                            <span className="text-2xl font-bold text-red-600">{alertsData?.critical || 0}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                                <span className="font-medium text-orange-800">Warnings</span>
                            </div>
                            <span className="text-2xl font-bold text-orange-600">{alertsData?.warnings || 0}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                                <span className="font-medium text-blue-800">Info</span>
                            </div>
                            <span className="text-2xl font-bold text-blue-600">{alertsData?.info || 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
