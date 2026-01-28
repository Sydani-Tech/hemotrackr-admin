
import { Button } from "@/components/ui/button";
import { ChevronLeft, Instagram, Twitter, Facebook, Linkedin, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HospitalAPI } from "@/core/services/HospitalService";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function BloodBankProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Medical Record");
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);
  const [medicalRecords, setMedicalRecords] = useState<any[]>([]);
  const [requestHistory, setRequestHistory] = useState<any[]>([]);
  const [_isHistoryLoading, setIsHistoryLoading] = useState(false);

  useEffect(() => {
    fetchProfileData();
    fetchRequestHistory();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await HospitalAPI.getProfile();
      setProfileData(response.data.organization);
      setMedicalRecords(response.data.medical_records);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      toast.error("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRequestHistory = async () => {
    try {
      setIsHistoryLoading(true);
      const response = await HospitalAPI.getRequestHistory({ per_page: 10 });
      setRequestHistory(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch request history:", error);
    } finally {
      setIsHistoryLoading(false);
    }
  };

  // --- Components ---

  const PatientCard = ({ record }: { record: any }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-full">
      <h3 className="text-blue-600 font-bold uppercase text-xs mb-4">
        PATIENT INFORMATION
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 font-medium">Name</span>
          <span className="text-gray-900 font-bold">{record.name}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 font-medium">Blood Donated</span>
          <span className="text-gray-900 font-bold">{record.bloodDonated}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 font-medium">Amount Donated</span>
          <span className="text-gray-900 font-bold">{record.amount}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 font-medium">Date of Donation</span>
          <span className="text-gray-900 font-bold">{record.date}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 font-medium">Doctor's Note</span>
          <span className="text-gray-500 truncate max-w-[200px]">{record.note}</span>
        </div>
      </div>
    </div>
  );

  // --- Tab Content Renderers ---

  const renderProfile = () => {
    if (!profileData) return null;

    return (
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
          <Button className="bg-[#FFD600] text-black hover:bg-[#ffe033] font-bold px-8 rounded-xl hidden">
            Subscribe
          </Button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm space-y-8">
          {/* Organization Name */}
          <div>
            <label className="text-gray-500 text-sm font-bold mb-2 block">
              Organization Name
            </label>
            <div className="bg-gray-100 p-4 rounded-xl text-gray-700">
              {profileData.name}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-gray-500 text-sm font-bold mb-2 block">
                License Number
              </label>
              <div className="bg-gray-100 p-4 rounded-xl text-gray-700">
                {profileData.license_number}
              </div>
            </div>
            <div>
              <label className="text-gray-500 text-sm font-bold mb-2 block">
                Date Registered
              </label>
              <div className="bg-gray-100 p-4 rounded-xl text-gray-700">
                {profileData.date_registered}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-gray-500 text-sm font-bold mb-2 block">
                Phone Number
              </label>
              <div className="bg-gray-100 p-4 rounded-xl text-gray-700">
                {profileData.phone}
              </div>
            </div>
            <div>
              <label className="text-gray-500 text-sm font-bold mb-2 block">
                Email Address
              </label>
              <div className="bg-gray-100 p-4 rounded-xl text-gray-700">
                {profileData.email}
              </div>
            </div>
          </div>

          <div>
            <label className="text-gray-500 text-sm font-bold mb-2 block">
              Address
            </label>
            <div className="bg-gray-100 p-4 rounded-xl text-gray-700">
              {profileData.address}
            </div>
          </div>

          <div>
            <h3 className="text-gray-500 text-sm font-bold mb-4">
              Social Connections
            </h3>

            <div className="space-y-4">
              {profileData.social_links?.instagram && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Instagram className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 font-medium">Instagram</span>
                  </div>
                  <a
                    href={profileData.social_links.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6">
                      Visit
                    </Button>
                  </a>
                </div>
              )}

              {profileData.social_links?.twitter && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Twitter className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 font-medium">Twitter</span>
                  </div>
                  <a
                    href={profileData.social_links.twitter}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6">
                      Visit
                    </Button>
                  </a>
                </div>
              )}

              {profileData.social_links?.facebook && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Facebook className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 font-medium">Facebook</span>
                  </div>
                  <a
                    href={profileData.social_links.facebook}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6">
                      Visit
                    </Button>
                  </a>
                </div>
              )}

              {profileData.social_links?.linkedin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 font-medium">LinkedIn</span>
                  </div>
                  <a
                    href={profileData.social_links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6">
                      Visit
                    </Button>
                  </a>
                </div>
              )}

              {!profileData.social_links?.instagram && !profileData.social_links?.twitter && !profileData.social_links?.facebook && !profileData.social_links?.linkedin && (
                <p className="text-sm text-gray-400">No social media links connected.</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-gray-400 text-xs mb-2 block">
                Profile Picture
              </label>
              <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                {profileData.logo_url ? (
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 rounded-lg">
                      <AvatarImage src={profileData.logo_url} alt="Logo" />
                      <AvatarFallback className="rounded-lg">LG</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600 font-medium">Current Logo</span>
                  </div>
                ) : (
                  <span className="text-gray-600 text-sm">No Logo Uploaded</span>
                )}
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-2 block">
                Cover Picture
              </label>
              <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                {profileData.cover_photo_url ? (
                  <div className="flex items-center gap-4">
                    <img src={profileData.cover_photo_url} alt="Cover" className="h-12 w-20 object-cover rounded-lg" />
                    <span className="text-sm text-gray-600 font-medium">Current Cover</span>
                  </div>
                ) : (
                  <span className="text-gray-600 text-sm">No Cover Photo Uploaded</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMedicalRecord = () => {
    if (medicalRecords.length === 0) {
      return (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500">No medical records found.</p>
        </div>
      );
    }

    return (
      <div className="animate-in fade-in duration-500 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {medicalRecords.map((record) => (
            <PatientCard key={record.id} record={record} />
          ))}
        </div>
      </div>
    );
  };

  const renderRequestHistory = () => {
    if (requestHistory.length === 0) {
      return (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500">No request history found.</p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-sm p-8 space-y-6 animate-in fade-in duration-500">
        <div className="mb-6">
          <button
            className="bg-blue-600 text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/hospital/requests")}
          >
            View request status
          </button>
        </div>

        <div className="space-y-4">
          {requestHistory.map((request) => (
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
                    {request.type || 'Blood Request'}
                  </h4>
                  <p className="text-gray-400 text-xs mt-1">
                    {request.units_needed} pint{request.units_needed !== 1 ? 's' : ''} • {new Date(request.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/hospital/requests/${request.id}`)}
                className="bg-blue-50 text-blue-600 text-xs font-bold px-6 py-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {renderProfile()}
      <div className="bg-white rounded-xl shadow-sm p-2 flex justify-between items-center px-12 mt-8 mb-8">
        {["Medical Record", "Request History"].map((tab) => (
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
      {activeTab === "Medical Record" && renderMedicalRecord()}
      {activeTab === "Request History" && renderRequestHistory()}
    </div>
  );
}
