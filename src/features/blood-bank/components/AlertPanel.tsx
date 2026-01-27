import { useState, useEffect } from "react";
import {
    Bell,
    X,
    Check,
    AlertTriangle,
    Info,
    AlertOctagon,
    CheckCircle2,
    RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertService, type InventoryAlert, type AlertSummary } from "@/core/services/AlertService";
import { cn } from "@/lib/utils";

interface AlertPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AlertPanel({ isOpen, onClose }: AlertPanelProps) {
    const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
    const [summary, setSummary] = useState<AlertSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [checking, setChecking] = useState(false);
    const [filter, setFilter] = useState<"all" | "unread" | "critical">("all");

    useEffect(() => {
        if (isOpen) {
            loadData();
        }
    }, [isOpen, filter]);

    const loadData = async () => {
        setLoading(true);
        try {
            // Load summary
            const summaryData = await AlertService.getSummary();
            setSummary(summaryData);

            // Load alerts based on filter
            const params: any = {};
            if (filter === "unread") params.is_read = false;
            if (filter === "critical") params.severity = "critical";

            const alertsData = await AlertService.getAlerts(params);
            setAlerts(alertsData.data || []);
        } catch (error) {
            console.error("Failed to load alerts", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckNow = async () => {
        setChecking(true);
        try {
            await AlertService.checkAlerts();
            await loadData();
        } catch (error) {
            console.error("Failed to check alerts", error);
        } finally {
            setChecking(false);
        }
    };

    const markAsRead = async (id: number) => {
        try {
            await AlertService.markAsRead(id);
            // Optimistic update
            setAlerts(alerts.map(a => a.id === id ? { ...a, is_read: true } : a));
            // Refresh summary
            const summaryData = await AlertService.getSummary();
            setSummary(summaryData);
        } catch (error) {
            console.error("Failed to mark as read", error);
        }
    };

    const markAllRead = async () => {
        try {
            await AlertService.markAllAsRead();
            setAlerts(alerts.map(a => ({ ...a, is_read: true })));
            loadData(); // Refresh to get updated summary
        } catch (error) {
            console.error("Failed to mark all as read", error);
        }
    };

    const acknowledge = async (id: number) => {
        try {
            await AlertService.acknowledge(id);
            // Optimistic update
            setAlerts(alerts.map(a => a.id === id ? { ...a, is_acknowledged: true } : a));
        } catch (error) {
            console.error("Failed to acknowledge", error);
        }
    };

    const getIcon = (severity: string) => {
        switch (severity) {
            case "critical": return <AlertOctagon className="w-5 h-5 text-red-500" />;
            case "warning": return <AlertTriangle className="w-5 h-5 text-orange-500" />;
            default: return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    const getBgColor = (severity: string) => {
        switch (severity) {
            case "critical": return "bg-red-50 border-red-100";
            case "warning": return "bg-orange-50 border-orange-100";
            default: return "bg-blue-50 border-blue-100";
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-gray-100 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-gray-700" />
                    <h2 className="font-bold text-gray-800">Alerts & Notifications</h2>
                    {summary?.total ? (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {summary.total}
                        </span>
                    ) : null}
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>
            </div>

            {/* Filters & Actions */}
            <div className="p-4 border-b border-gray-100 flex flex-col gap-3">
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant={filter === "all" ? "default" : "outline"}
                        onClick={() => setFilter("all")}
                        className="text-xs h-8"
                    >
                        All
                    </Button>
                    <Button
                        size="sm"
                        variant={filter === "unread" ? "default" : "outline"}
                        onClick={() => setFilter("unread")}
                        className="text-xs h-8"
                    >
                        Unread
                    </Button>
                    <Button
                        size="sm"
                        variant={filter === "critical" ? "default" : "outline"}
                        onClick={() => setFilter("critical")}
                        className="text-xs h-8 text-red-600 border-red-200 hover:bg-red-50"
                    >
                        Critical
                    </Button>
                </div>
                <div className="flex justify-between items-center">
                    <button
                        onClick={markAllRead}
                        className="text-xs text-blue-600 font-medium hover:underline"
                    >
                        Mark all as read
                    </button>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCheckNow}
                        disabled={checking}
                        className="text-xs h-8 text-gray-500"
                    >
                        <RefreshCw className={cn("w-3 h-3 mr-1", checking && "animate-spin")} />
                        Check Now
                    </Button>
                </div>
            </div>

            {/* Alert List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/30">
                {loading ? (
                    <div className="text-center py-10 text-gray-400 text-sm">Loading alerts...</div>
                ) : alerts.length === 0 ? (
                    <div className="text-center py-10">
                        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3 opacity-20" />
                        <p className="text-gray-500 text-sm">No alerts found</p>
                    </div>
                ) : (
                    alerts.map((alert) => (
                        <div
                            key={alert.id}
                            className={cn(
                                "p-4 rounded-xl border transition-all relative group",
                                getBgColor(alert.severity),
                                !alert.is_read && "ring-1 ring-offset-1 ring-blue-400 shadow-sm"
                            )}
                        >
                            <div className="flex gap-3">
                                <div className="mt-0.5">{getIcon(alert.severity)}</div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-gray-800 text-sm">{alert.title}</h3>
                                        <span className="text-[10px] text-gray-500">
                                            {new Date(alert.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {alert.message}
                                    </p>

                                    {/* Actions */}
                                    <div className="flex gap-3 mt-3 pt-2 border-t border-black/5 opacity-80 group-hover:opacity-100 transition-opacity">
                                        {!alert.is_read && (
                                            <button
                                                onClick={() => markAsRead(alert.id)}
                                                className="text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                            >
                                                <Check className="w-3 h-3" /> Mark Read
                                            </button>
                                        )}
                                        {!alert.is_acknowledged && (
                                            <button
                                                onClick={() => acknowledge(alert.id)}
                                                className="text-[10px] font-bold text-gray-500 hover:text-gray-700 flex items-center gap-1"
                                            >
                                                Acknowledge
                                            </button>
                                        )}
                                        {alert.is_acknowledged && (
                                            <span className="text-[10px] font-bold text-green-600 flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3" /> Acknowledged
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
