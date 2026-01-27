import { useState, useEffect } from "react";
import {
    Bell,
    Check,
    Trash2,
    Calendar,
    Info,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    Loader2,
    CheckCheck
} from "lucide-react";
import { BloodBankAPI } from "@/core/services/BloodBankService";
import { toast } from "react-toastify";

const Notifications = () => {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        unread: 0,
        read: 0
    });
    const [processingId, setProcessingId] = useState<number | string | null>(null);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const response = await BloodBankAPI.getNotifications();
            const data = response.data.data || response.data || [];

            // Sort by created_at desc just in case
            const sorted = data.sort((a: any, b: any) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );

            setNotifications(sorted);

            // Calculate stats
            const unread = sorted.filter((n: any) => !n.read_at).length;
            setStats({
                total: sorted.length,
                unread,
                read: sorted.length - unread
            });
        } catch (error) {
            console.error("Failed to fetch notifications", error);
            // toast.error("Failed to load notifications");
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id: string | number) => {
        setProcessingId(id);
        try {
            await BloodBankAPI.markNotificationAsRead(id);
            // Optimistic update
            setNotifications(prev => prev.map(n =>
                n.id === id ? { ...n, read_at: new Date().toISOString() } : n
            ));
            setStats(prev => ({
                ...prev,
                unread: Math.max(0, prev.unread - 1),
                read: prev.read + 1
            }));
        } catch (error) {
            console.error("Failed to mark as read", error);
            toast.error("Failed to update status");
        } finally {
            setProcessingId(null);
        }
    };

    const handleMarkAllRead = async () => {
        if (stats.unread === 0) return;

        setProcessingId('all');
        try {
            await BloodBankAPI.markAllNotificationsAsRead();
            setNotifications(prev => prev.map(n => ({ ...n, read_at: new Date().toISOString() })));
            setStats(prev => ({
                total: prev.total,
                unread: 0,
                read: prev.total
            }));
            toast.success("All notifications marked as read");
        } catch (error) {
            console.error("Failed to mark all as read", error);
            toast.error("Failed to update all");
        } finally {
            setProcessingId(null);
        }
    };

    const handleDelete = async (id: string | number) => {
        if (!confirm("Delete this notification?")) return;

        setProcessingId(id);
        try {
            await BloodBankAPI.deleteNotification(id);
            setNotifications(prev => prev.filter(n => n.id !== id));
            setStats(prev => {
                const isUnread = notifications.find(n => n.id === id && !n.read_at);
                return {
                    total: prev.total - 1,
                    unread: isUnread ? prev.unread - 1 : prev.unread,
                    read: isUnread ? prev.read : prev.read - 1
                };
            });
            toast.success("Notification removed");
        } catch (error) {
            console.error("Failed to delete notification", error);
            toast.error("Failed to delete");
        } finally {
            setProcessingId(null);
        }
    };

    const getIcon = (type: string) => {
        switch (type?.toLowerCase()) {
            case 'success':
            case 'approved':
                return <CheckCircle2 className="w-5 h-5 text-green-500" />;
            case 'error':
            case 'rejected':
            case 'cancelled':
                return <XCircle className="w-5 h-5 text-red-500" />;
            case 'warning':
            case 'alert':
                return <AlertTriangle className="w-5 h-5 text-orange-500" />;
            case 'info':
            default:
                return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 172800) return 'Yesterday';
        return date.toLocaleDateString();
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                    <p className="text-sm text-gray-500">Stay updated with your latest activities</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                        <span className="font-bold text-blue-600">{stats.unread}</span> Unread
                    </div>
                    <button
                        onClick={handleMarkAllRead}
                        disabled={stats.unread === 0 || processingId === 'all'}
                        className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold transition-colors disabled:opacity-50 shadow-sm"
                    >
                        {processingId === 'all' ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCheck className="w-4 h-4" />}
                        Mark all read
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-3" />
                        <p>Loading notifications...</p>
                    </div>
                ) : notifications.length > 0 ? (
                    <div className="divide-y divide-gray-50">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`flex items-start gap-4 p-5 transition-colors group ${!notification.read_at ? 'bg-blue-50/50' : 'hover:bg-gray-50'
                                    }`}
                            >
                                {/* Icon */}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${!notification.read_at ? 'bg-white shadow-sm' : 'bg-gray-100'
                                    }`}>
                                    {getIcon(notification.data?.type || notification.type)}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-1">
                                        <h3 className={`text-sm font-bold ${!notification.read_at ? 'text-gray-900' : 'text-gray-700'
                                            }`}>
                                            {notification.data?.title || "Notification"}
                                        </h3>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {formatTime(notification.created_at)}
                                            </span>

                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {!notification.read_at && (
                                                    <button
                                                        onClick={() => handleMarkAsRead(notification.id)}
                                                        disabled={processingId === notification.id}
                                                        className="p-1.5 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                                                        title="Mark as read"
                                                    >
                                                        {processingId === notification.id ? (
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                        ) : (
                                                            <Check className="w-4 h-4" />
                                                        )}
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(notification.id)}
                                                    className="p-1.5 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={`text-sm ${!notification.read_at ? 'text-gray-800' : 'text-gray-500'
                                        }`}>
                                        {notification.data?.message || JSON.stringify(notification.data)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Bell className="w-8 h-8 text-gray-300" />
                        </div>
                        <p className="text-lg font-semibold text-gray-900">No notifications</p>
                        <p className="text-sm max-w-xs text-center mt-1">
                            You're all caught up! Check back later for updates.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
