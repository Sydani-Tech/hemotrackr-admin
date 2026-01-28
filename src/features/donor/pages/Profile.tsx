import { FileText, Save, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { DonorAPI } from "../../../core/services/DonorService";


const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    other_names: "",
    phone: "",
    gender: "",
    date_of_birth: "",
    email: "",
    address: "",
    instagram_handle: "",
    twitter_handle: "",
    profile_picture: null as File | null,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await DonorAPI.getProfile();
      const userData = response.data.user;
      setUser(userData);

      // Map backend data to form state
      setFormData({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        other_names: userData.donor?.other_names || "", // From donor table
        phone: userData.phone || "",
        gender: userData.gender || "",
        date_of_birth: userData.date_of_birth ? userData.date_of_birth.split('T')[0] : "",
        email: userData.email || "",
        address: userData.address || "",
        instagram_handle: userData.donor?.instagram_handle || "",
        twitter_handle: userData.donor?.twitter_handle || "",
        profile_picture: null,
      });
      setProfilePreview(userData.profile_picture_url);
    } catch (error) {
      console.error("Failed to load profile", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, profile_picture: file }));
      setProfilePreview(URL.createObjectURL(file));
      setIsEditing(true); // Auto-enable edit mode if file is selected
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const submitData = new FormData();

      // Append all text fields
      Object.keys(formData).forEach(key => {
        if (key !== 'profile_picture' && key !== 'email') { // Email usually read-only
          // @ts-ignore
          if (formData[key]) submitData.append(key, formData[key]);
        }
      });

      // Append file if exists
      if (formData.profile_picture) {
        submitData.append('profile_picture', formData.profile_picture);
      }

      await DonorAPI.updateProfile(submitData);

      setIsEditing(false);
      // Refresh data to ensure sync
      await fetchProfile();
      // alert("Profile updated successfully"); 
    } catch (error) {
      console.error("Failed to save profile", error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
        <div className="flex items-center gap-4">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  fetchProfile(); // Reset changes
                }}
                disabled={saving}
                className="flex items-center gap-2 text-gray-600 bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 text-white bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              Edit Profile
            </button>
          )}

          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={profilePreview || `https://ui-avatars.com/api/?name=${encodeURIComponent(user ? `${user.first_name} ${user.last_name}` : 'User')}&background=random`}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const name = user ? `${user.first_name} ${user.last_name}` : 'User';
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <label className="text-sm font-medium text-gray-500 block mb-2">
            First Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <div className="bg-gray-100 rounded-xl px-4 py-3 text-gray-600 min-h-[48px] flex items-center">
              {formData.first_name}
            </div>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500 block mb-2">
            Other Names
          </label>
          {isEditing ? (
            <input
              type="text"
              name="other_names"
              value={formData.other_names}
              onChange={handleChange}
              placeholder="Middle name"
              className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <div className="bg-gray-100 rounded-xl px-4 py-3 text-gray-600 min-h-[48px] flex items-center">
              {formData.other_names || "-"}
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500 block mb-2">
            Last Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <div className="bg-gray-100 rounded-xl px-4 py-3 text-gray-600 min-h-[48px] flex items-center">
              {formData.last_name}
            </div>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500 block mb-2">
            Phone Number
          </label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <div className="bg-gray-100 rounded-xl px-4 py-3 text-gray-600 min-h-[48px] flex items-center">
              {formData.phone}
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500 block mb-2">
            Gender
          </label>
          {isEditing ? (
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <div className="bg-gray-100 rounded-xl px-4 py-3 text-gray-600 min-h-[48px] flex items-center">
              {formData.gender}
            </div>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500 block mb-2">
            Date of Birth
          </label>
          {isEditing ? (
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <div className="bg-gray-100 rounded-xl px-4 py-3 text-gray-600 min-h-[48px] flex items-center">
              {formData.date_of_birth}
            </div>
          )}
        </div>

        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-500 block mb-2">
            Email Address
          </label>
          <div className="bg-gray-100 rounded-xl px-4 py-3 text-gray-600 min-h-[48px] flex items-center opacity-70">
            {formData.email}
          </div>
        </div>

        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-500 block mb-2">
            Home Address
          </label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <div className="bg-gray-100 rounded-xl px-4 py-3 text-gray-600 min-h-[48px] flex items-center">
              {formData.address}
            </div>
          )}
        </div>
      </div>

      {/* Social Connections */}
      <div className="mt-8">
        <h3 className="font-bold text-gray-500 mb-2 text-sm">
          Social Connections
        </h3>
        <p className="text-xs text-gray-400 mb-4">
          Help your fans verify your account by connecting social
        </p>

        <div className="space-y-4 max-w-sm">
          {/* Instagram */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-5 h-5 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-pink-600">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    name="instagram_handle"
                    value={formData.instagram_handle}
                    onChange={handleChange}
                    placeholder="Instagram Handle"
                    className="w-full text-sm border border-gray-200 rounded-md px-2 py-1"
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-600">{formData.instagram_handle || "Not connected"}</span>
                )}
              </div>
            </div>
            {!isEditing && formData.instagram_handle && (
              <button className="bg-blue-500 text-white text-xs px-4 py-1.5 rounded-lg active:scale-95 transition-transform">
                Visit
              </button>
            )}
          </div>

          {/* Twitter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-5 h-5 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-blue-400">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    name="twitter_handle"
                    value={formData.twitter_handle}
                    onChange={handleChange}
                    placeholder="Twitter Handle"
                    className="w-full text-sm border border-gray-200 rounded-md px-2 py-1"
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-600">{formData.twitter_handle || "Not connected"}</span>
                )}
              </div>
            </div>
            {!isEditing && formData.twitter_handle && (
              <button className="bg-blue-500 text-white text-xs px-4 py-1.5 rounded-lg active:scale-95 transition-transform">
                Visit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Uploads */}
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">
            Profile Picture
          </label>
          <div className="border border-gray-200 rounded-xl p-3 flex items-center justify-between">
            <span className="text-sm text-gray-500 pl-2">
              {formData.profile_picture ? formData.profile_picture.name : "Upload a Picture"}
            </span>
            <label className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-200">
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              <FileText className="w-4 h-4" />
              <span className="opacity-0 w-0 md:opacity-100 md:w-auto">
                Image
              </span>
            </label>
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">
            Cover Picture
          </label>
          <div className="border border-gray-200 rounded-xl p-3 flex items-center justify-between opacity-50 cursor-not-allowed">
            <span className="text-sm text-gray-500 pl-2">Upload a Picture</span>
            <button disabled className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-xs font-medium text-gray-600">
              <FileText className="w-4 h-4" />
              <span className="opacity-0 w-0 md:opacity-100 md:w-auto">
                Image
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;