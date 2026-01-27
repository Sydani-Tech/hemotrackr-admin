import { useState, useEffect } from "react";
import {
    Bell,
    Shield,
    Share2,
    Save,
    Loader2,
    Globe,
    Facebook,
    Twitter,
    Instagram,
    Linkedin
} from "lucide-react";
import { BloodBankAPI } from "@/core/services/BloodBankService";
import { toast } from "react-toastify";

const Settings = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        receive_notifications: false,
        show_inventory: false,
        show_contact: false,
        facebook_link: "",
        twitter_link: "",
        instagram_link: "",
        linkedin_link: ""
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await BloodBankAPI.getSettings();
            if (response.data.data) {
                setFormData({
                    receive_notifications: !!response.data.data.receive_notifications,
                    show_inventory: !!response.data.data.show_inventory,
                    show_contact: !!response.data.data.show_contact,
                    facebook_link: response.data.data.facebook_link || "",
                    twitter_link: response.data.data.twitter_link || "",
                    instagram_link: response.data.data.instagram_link || "",
                    linkedin_link: response.data.data.linkedin_link || "",
                });
            }
        } catch (error) {
            console.error("Failed to fetch settings", error);
            // toast.error("Failed to load settings");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await BloodBankAPI.updateSettings(formData);
            toast.success("Settings updated successfully");
        } catch (error: any) {
            console.error("Failed to update settings", error);
            toast.error(error.response?.data?.message || "Failed to update settings");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                <p className="text-sm text-gray-500">Manage your organization preferences and visibility</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Visual Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Notifications Card */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-100 transition-colors">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Bell className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Notifications</h3>
                                <p className="text-xs text-gray-500">Control your alert preferences</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700">Receive Push Notifications</h4>
                                <p className="text-xs text-gray-400">Get alerted for new requests and updates</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="receive_notifications"
                                    checked={formData.receive_notifications}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>

                    {/* Privacy Card */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-100 transition-colors">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Privacy & Visibility</h3>
                                <p className="text-xs text-gray-500">Control what others can see</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700">Public Inventory</h4>
                                    <p className="text-xs text-gray-400">Allow hospitals to search your stock</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="show_inventory"
                                        checked={formData.show_inventory}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700">Show Contact Info</h4>
                                    <p className="text-xs text-gray-400">Make email & phone visible on profile</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="show_contact"
                                        checked={formData.show_contact}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                            <Share2 className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Social Links</h3>
                            <p className="text-xs text-gray-500">Connect your social media profiles</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Facebook className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="url"
                                name="facebook_link"
                                value={formData.facebook_link}
                                onChange={handleChange}
                                className="pl-10 block w-full border-gray-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="https://facebook.com/your-page"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Twitter className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="url"
                                name="twitter_link"
                                value={formData.twitter_link}
                                onChange={handleChange}
                                className="pl-10 block w-full border-gray-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="https://twitter.com/your-handle"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Instagram className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="url"
                                name="instagram_link"
                                value={formData.instagram_link}
                                onChange={handleChange}
                                className="pl-10 block w-full border-gray-200 rounded-xl focus:ring-pink-500 focus:border-pink-500 text-sm"
                                placeholder="https://instagram.com/your-handle"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Linkedin className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="url"
                                name="linkedin_link"
                                value={formData.linkedin_link}
                                onChange={handleChange}
                                className="pl-10 block w-full border-gray-200 rounded-xl focus:ring-blue-700 focus:border-blue-700 text-sm"
                                placeholder="https://linkedin.com/company/your-page"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Saving Changes...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Save Settings
                            </>
                        )}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default Settings;
