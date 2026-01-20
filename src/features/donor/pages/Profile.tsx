import { FileText, Save, X } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Oluwatosin",
    lastName: "Kokico",
    otherNames: "Johson",
    phone: "234 813 4673 7239",
    gender: "Male",
    dob: "January 37, 1989",
    email: "Admin@BMHosiptal.com",
    address: "No 34 William drive, Victoria Island, Ikeja, Wuse 2, Nigeria.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Logic to save to backend would go here
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
        <div className="flex items-center gap-4">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 text-gray-600 bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 text-white bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
              >
                <Save className="w-4 h-4" /> Save Changes
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
              src="https://ui-avatars.com/api/?name=Preye&background=random"
              alt="Profile"
              className="w-full h-full object-cover"
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
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <div className="bg-gray-100 rounded-xl px-4 py-3 text-gray-600">
              {formData.firstName}
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
              name="otherNames"
              value={formData.otherNames}
              onChange={handleChange}
              className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <div className="bg-gray-100 rounded-xl px-4 py-3 text-gray-600">
              {formData.otherNames}
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
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <div className="bg-gray-100 rounded-xl px-4 py-3 text-gray-600">
              {formData.lastName}
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
            <div className="bg-gray-100 rounded-xl px-4 py-3 text-gray-600">
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
              onChange={(e: any) => handleChange(e)}
              className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          ) : (
            <div className="bg-gray-100 rounded-xl px-4 py-3 text-gray-600">
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
              type="text"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <div className="bg-gray-100 rounded-xl px-4 py-3 text-gray-600">
              {formData.dob}
            </div>
          )}
        </div>

        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-500 block mb-2">
            Email Address
          </label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <div className="bg-gray-100 rounded-xl px-4 py-3 text-gray-600">
              {formData.email}
            </div>
          )}
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
            <div className="bg-gray-100 rounded-xl px-4 py-3 text-gray-600">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center">
                {/* Instagram Icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-full h-full text-pink-600"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-600">
                Instagram
              </span>
            </div>
            <button className="bg-blue-500 text-white text-xs px-4 py-1.5 rounded-lg active:scale-95 transition-transform">
              Visit
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center">
                {/* Twitter Icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-full h-full text-blue-400"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-600">Twitter</span>
            </div>
            <button className="bg-blue-500 text-white text-xs px-4 py-1.5 rounded-lg active:scale-95 transition-transform">
              Visit
            </button>
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
            <span className="text-sm text-gray-500 pl-2">Upload a Picture</span>
            <button className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-xs font-medium text-gray-600">
              <FileText className="w-4 h-4" />
              <span className="opacity-0 w-0 md:opacity-100 md:w-auto">
                Image
              </span>
            </button>
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">
            Cover Picture
          </label>
          <div className="border border-gray-200 rounded-xl p-3 flex items-center justify-between">
            <span className="text-sm text-gray-500 pl-2">Upload a Picture</span>
            <button className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-xs font-medium text-gray-600">
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
