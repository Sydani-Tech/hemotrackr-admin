import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Instagram,
  Twitter,
  Upload,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MedicalTestModal from "../components/MedicalTestModal";
import { BloodBankAPI } from "@/core/services/BloodBankService";
import { toast } from "react-toastify";

// --- Types ---
interface ProfileData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  organization?: {
    id: number;
    name: string;
    type: string;
    role: string;
    email: string;
    contact_email: string;
    phone: string;
    address: string;
    license_number: string;
    status: string;
    logo_url?: string;
    cover_photo_url?: string;
    latitude?: number;
    longitude?: number;
    description?: string;
    services?: string[];
    facebook_link?: string;
    twitter_link?: string;
    instagram_link?: string;
    linkedin_link?: string;
    created_at?: string;
  };
}

interface DonationRecord {
  id: number;
  donor: {
    first_name: string;
    last_name: string;
  };
  blood_group: string;
  units: number;
  donation_date: string;
  doctor_notes?: string;
  status: string;
}

// --- Components ---

const PatientCard = ({ record }: { record: DonationRecord }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-full">
    <h3 className="text-blue-600 font-bold uppercase text-xs mb-4">
      DONOR INFORMATION
    </h3>
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600 font-medium">Name</span>
        <span className="text-gray-900 font-bold">
          {record.donor.first_name} {record.donor.last_name}
        </span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600 font-medium">Blood Group</span>
        <span className="text-gray-900 font-bold">{record.blood_group}</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600 font-medium">Units Donated</span>
        <span className="text-gray-900 font-bold">{record.units} pints</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600 font-medium">Date of Donation</span>
        <span className="text-gray-900 font-bold">
          {new Date(record.donation_date).toLocaleDateString()}
        </span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600 font-medium">Doctor's Note</span>
        <span className="text-gray-500">{record.doctor_notes || "N/A"}</span>
      </div>
    </div>
  </div>
);

const ToggleSwitch = ({
  label,
  defaultChecked = true,
}: {
  label: string;
  defaultChecked?: boolean;
}) => {
  const [enabled, setEnabled] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-4">
      <span className="text-gray-600 text-sm">{label}</span>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-11 h-6 flex items-center rounded-full px-1 transition-colors ${enabled ? "bg-blue-600" : "bg-gray-300"
          }`}
      >
        <span
          className={`w-4 h-4 bg-white rounded-full transition-transform ${enabled ? "translate-x-5" : "translate-x-0"
            }`}
        />
      </button>
    </div>
  );
};

export default function BloodBankProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Profile");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    facebook_link: "",
    twitter_link: "",
    instagram_link: "",
    linkedin_link: "",
  });

  useEffect(() => {
    loadProfile();
    loadDonations();
    loadRequests();
  }, []);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const response = await BloodBankAPI.getProfile();
      setProfile(response.data.user);

      // Populate form data
      const org = response.data.user.organization;
      if (org) {
        setFormData({
          name: org.name || "",
          address: org.address || "",
          description: org.description || "",
          facebook_link: org.facebook_link || "",
          twitter_link: org.twitter_link || "",
          instagram_link: org.instagram_link || "",
          linkedin_link: org.linkedin_link || "",
        });
      }
    } catch (error) {
      console.error("Failed to load profile", error);
      toast.error("Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      await BloodBankAPI.updateProfile(formData);
      toast.success("Profile updated successfully");
      setIsEditMode(false);
      loadProfile(); // Reload to get updated data
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    // Reset form data to current profile values
    const org = profile?.organization;
    if (org) {
      setFormData({
        name: org.name || "",
        address: org.address || "",
        description: org.description || "",
        facebook_link: org.facebook_link || "",
        twitter_link: org.twitter_link || "",
        instagram_link: org.instagram_link || "",
        linkedin_link: org.linkedin_link || "",
      });
    }
  };

  const loadDonations = async () => {
    try {
      const response = await BloodBankAPI.getDonations();
      setDonations(response.data.data || []);
    } catch (error) {
      console.error("Failed to load donations", error);
    }
  };

  const loadRequests = async () => {
    try {
      const response = await BloodBankAPI.getMyRequests();
      setRequests(response.data.data || []);
    } catch (error) {
      console.error("Failed to load requests", error);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await BloodBankAPI.uploadLogo(file);
      toast.success("Logo uploaded successfully");
      loadProfile();
    } catch (error) {
      console.error("Failed to upload logo", error);
      toast.error("Failed to upload logo");
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await BloodBankAPI.uploadCoverPhoto(file);
      toast.success("Cover photo uploaded successfully");
      loadProfile();
    } catch (error) {
      console.error("Failed to upload cover photo", error);
      toast.error("Failed to upload cover photo");
    }
  };

  // --- Tab Content Renderers ---

  const renderProfile = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
        </div>
        <div className="flex gap-3">
          {isEditMode ? (
            <>
              <Button
                onClick={handleCancelEdit}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 font-bold px-8 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="bg-blue-600 text-white hover:bg-blue-700 font-bold px-8 rounded-xl"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => setIsEditMode(true)}
                className="bg-blue-600 text-white hover:bg-blue-700 font-bold px-8 rounded-xl"
              >
                Edit Profile
              </Button>
              <Button className="bg-[#FFD600] text-black hover:bg-[#ffe033] font-bold px-8 rounded-xl">
                Subscribe
              </Button>
            </>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-sm space-y-8">
          {/* Organization Name */}
          <div>
            <label className="text-gray-500 text-sm font-bold mb-2 block">
              Organization Name {isEditMode && <span className="text-blue-600">*</span>}
            </label>
            {isEditMode ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white border border-gray-300 p-4 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter organization name"
              />
            ) : (
              <div className="bg-gray-100 p-4 rounded-xl text-gray-700">
                {profile?.organization?.name || "N/A"}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="text-gray-500 text-sm font-bold mb-2 block">
                License Number
              </label>
              <div className="bg-gray-100 p-4 rounded-xl text-gray-700">
                {profile?.organization?.license_number || "N/A"}
              </div>
            </div>
            <div>
              <label className="text-gray-500 text-sm font-bold mb-2 block">
                Date Registered
              </label>
              <div className="bg-gray-100 p-4 rounded-xl text-gray-700">
                {profile?.organization?.created_at
                  ? new Date(profile.organization.created_at).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="text-gray-500 text-sm font-bold mb-2 block">
                Contact 1
              </label>
              <div className="bg-gray-100 p-4 rounded-xl text-gray-700">
                {profile?.organization?.phone || profile?.phone || "N/A"}
              </div>
            </div>
            <div>
              <label className="text-gray-500 text-sm font-bold mb-2 block">
                Contact 2
              </label>
              <div className="bg-gray-100 p-4 rounded-xl text-gray-700">
                {profile?.organization?.contact_email || "N/A"}
              </div>
            </div>
          </div>

          <div>
            <label className="text-gray-500 text-sm font-bold mb-2 block">
              Email Address
            </label>
            <div className="bg-gray-100 p-4 rounded-xl text-gray-700">
              {profile?.organization?.email || profile?.email || "N/A"}
            </div>
          </div>

          <div>
            <label className="text-gray-500 text-sm font-bold mb-2 block">
              Address {isEditMode && <span className="text-blue-600">*</span>}
            </label>
            {isEditMode ? (
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-white border border-gray-300 p-4 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                placeholder="Enter organization address"
              />
            ) : (
              <div className="bg-gray-100 p-4 rounded-xl text-gray-700">
                {profile?.organization?.address || "N/A"}
              </div>
            )}
          </div>

          <div>
            <label className="text-gray-500 text-sm font-bold mb-2 block">
              Description
            </label>
            {isEditMode ? (
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-white border border-gray-300 p-4 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                placeholder="Enter organization description"
              />
            ) : (
              <div className="bg-gray-100 p-4 rounded-xl text-gray-700">
                {profile?.organization?.description || "N/A"}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-gray-500 text-sm font-bold mb-4">
              Social Connections
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Help your community verify your account by connecting social media
            </p>
            <div className="space-y-4">
              {/* Instagram */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <Instagram className="w-5 h-5 text-gray-400" />
                  {isEditMode ? (
                    <input
                      type="url"
                      value={formData.instagram_link}
                      onChange={(e) => setFormData({ ...formData, instagram_link: e.target.value })}
                      className="flex-1 bg-white border border-gray-300 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Instagram profile URL"
                    />
                  ) : (
                    <span className="text-gray-600 font-medium">
                      {profile?.organization?.instagram_link ? "Instagram" : "Not connected"}
                    </span>
                  )}
                </div>
                {!isEditMode && profile?.organization?.instagram_link && (
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6"
                    onClick={() => window.open(profile?.organization?.instagram_link, "_blank")}
                  >
                    Visit
                  </Button>
                )}
              </div>

              {/* Twitter */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <Twitter className="w-5 h-5 text-gray-400" />
                  {isEditMode ? (
                    <input
                      type="url"
                      value={formData.twitter_link}
                      onChange={(e) => setFormData({ ...formData, twitter_link: e.target.value })}
                      className="flex-1 bg-white border border-gray-300 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Twitter profile URL"
                    />
                  ) : (
                    <span className="text-gray-600 font-medium">
                      {profile?.organization?.twitter_link ? "Twitter" : "Not connected"}
                    </span>
                  )}
                </div>
                {!isEditMode && profile?.organization?.twitter_link && (
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6"
                    onClick={() => window.open(profile?.organization?.twitter_link, "_blank")}
                  >
                    Visit
                  </Button>
                )}
              </div>

              {/* Facebook */}
              {isEditMode && (
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 text-gray-400 text-xs font-bold">FB</span>
                  <input
                    type="url"
                    value={formData.facebook_link}
                    onChange={(e) => setFormData({ ...formData, facebook_link: e.target.value })}
                    className="flex-1 bg-white border border-gray-300 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Facebook page URL"
                  />
                </div>
              )}

              {/* LinkedIn */}
              {isEditMode && (
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 text-gray-400 text-xs font-bold">IN</span>
                  <input
                    type="url"
                    value={formData.linkedin_link}
                    onChange={(e) => setFormData({ ...formData, linkedin_link: e.target.value })}
                    className="flex-1 bg-white border border-gray-300 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="LinkedIn profile URL"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="text-gray-400 text-xs mb-2 block">
                Profile Picture
              </label>
              <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label htmlFor="logo-upload" className="cursor-pointer flex-1">
                  <span className="text-gray-600 text-sm">Upload a Picture</span>
                </label>
                <div className="flex items-center gap-2 bg-gray-200 px-3 py-1.5 rounded-lg">
                  <Upload className="w-4 h-4 text-gray-600" />
                  <div className="text-[10px] text-gray-500 leading-tight">
                    <div className="font-bold">Image</div>
                    <div>Max 2MB - JPG/PNG</div>
                  </div>
                </div>
              </div>
              {profile?.organization?.logo_url && (
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/storage/${profile.organization.logo_url}`}
                  alt="Logo"
                  className="mt-2 w-20 h-20 object-cover rounded"
                />
              )}
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-2 block">
                Cover Picture
              </label>
              <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="hidden"
                  id="cover-upload"
                />
                <label htmlFor="cover-upload" className="cursor-pointer flex-1">
                  <span className="text-gray-600 text-sm">Upload a Picture</span>
                </label>
                <div className="flex items-center gap-2 bg-gray-200 px-3 py-1.5 rounded-lg">
                  <Upload className="w-4 h-4 text-gray-600" />
                  <div className="text-[10px] text-gray-500 leading-tight">
                    <div className="font-bold">Image</div>
                    <div>Max 5MB - JPG/PNG</div>
                  </div>
                </div>
              </div>
              {profile?.organization?.cover_photo_url && (
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/storage/${profile.organization.cover_photo_url}`}
                  alt="Cover"
                  className="mt-2 w-full h-20 object-cover rounded"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderMedicalRecord = () => (
    <div className="animate-in fade-in duration-500 space-y-6">
      {donations.length === 0 ? (
        <div className="bg-white p-8 rounded-xl text-center text-gray-500">
          No donation records found
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-6">
            {donations.slice(0, 6).map((record) => (
              <PatientCard key={record.id} record={record} />
            ))}
          </div>
          {donations.length > 6 && (
            <div className="flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-12 rounded-xl">
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderRequestHistory = () => (
    <div className="bg-white rounded-xl shadow-sm p-8 space-y-6 animate-in fade-in duration-500">
      <div className="mb-6">
        <button
          className="bg-blue-600 text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          onClick={() => navigate("/blood-bank/requests")}
        >
          View request status
        </button>
      </div>

      {requests.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No blood requests found
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-blue-600 text-lg">
                  {request.blood_group}
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold text-sm">
                    {request.type} request
                  </h4>
                  <p className="text-gray-400 text-xs mt-1">
                    {request.units_needed} pint{request.units_needed > 1 ? "s" : ""} •{" "}
                    {new Date(request.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                className="bg-blue-50 text-blue-600 text-xs font-bold px-6 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                onClick={() => navigate(`/blood-bank/requests/${request.id}`)}
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAccountSupport = () => (
    <div className="grid grid-cols-3 gap-8 animate-in fade-in duration-500">
      {/* Left Column */}
      <div className="space-y-8 col-span-2">
        <div className="bg-white p-6 rounded-2xl">
          <h3 className="font-bold text-gray-800 mb-4">
            Notifications and Alerts
          </h3>
          <div className="divide-y divide-gray-50">
            <ToggleSwitch label="Receive notifications for blood requests" />
            <ToggleSwitch label="Receive message notifications" />
            <ToggleSwitch label="Receive notifications from blood banks" />
            <ToggleSwitch label="Receive notifications of scheduled donations" />
            <ToggleSwitch label="Receive notifications of walk in donations" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl">
          <h3 className="font-bold text-gray-800 mb-4">Privacy and Security</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Blood Inventory</span>
              <button className="text-gray-400 hover:text-gray-600 flex items-center gap-1">
                Show <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Contact Information</span>
              <button className="text-gray-400 hover:text-gray-600 flex items-center gap-1">
                Show <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>License Number</span>
              <button className="text-gray-400 hover:text-gray-600 flex items-center gap-1">
                Show <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Who can message you?</span>
              <button className="text-gray-400 hover:text-gray-600 flex items-center gap-1">
                Everyone <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="pt-2">
              <button className="text-gray-600 text-sm hover:text-blue-600">
                Change Password
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl">
          <h3 className="font-bold text-gray-800 mb-4">Help and Support</h3>
          <div className="space-y-4 text-sm text-gray-600">
            <button className="block hover:text-blue-600">
              Customer support
            </button>
            <button className="block hover:text-blue-600">
              Leave a complaint
            </button>
            <button className="block hover:text-blue-600">
              Visit our Website
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Ad & Share (Reused from MakeRequest idea) */}
      <MedicalTestModal />
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm p-2 flex justify-between items-center px-12">
        {[
          "Profile",
          "Medical Record",
          "Request History",
          "Account Support",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-2 rounded-md font-bold text-sm transition-colors relative ${activeTab === tab
              ? "text-gray-900 bg-[#FFD600]"
              : "text-gray-400 hover:text-gray-600 hover:bg-[#FFD600]"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div>
        {activeTab === "Profile" && renderProfile()}
        {activeTab === "Medical Record" && renderMedicalRecord()}
        {activeTab === "Request History" && renderRequestHistory()}
        {activeTab === "Account Support" && renderAccountSupport()}
      </div>
    </div>
  );
}
