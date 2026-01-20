import { CalendarDays, ChevronDown, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAccountScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center md:items-start md:justify-start px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 py-8">
      <div className="max-w-md mx-auto w-full">
        <div className="mb-5 text-center">
          <h1 className="text-2xl font-bold text-primary mb-1">
            Create an account
          </h1>
          <p className="text-gray-500 text-sm">enter your details</p>
        </div>

        <form className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Peter Obi"
              className="w-full bg-gray-200/70 border-none rounded-md px-4 py-2 text-sm text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-primary "
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="08135126541"
              className="w-full bg-gray-200/70 border-none rounded-md px-4 py-2 text-sm text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Date of Birth */}
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">
                Date of Birth
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="03/04/1992"
                  className="w-full bg-gray-200/70 border-none rounded-md px-4 py-2 text-sm text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-primary"
                />
                <CalendarDays className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">
                Gender
              </label>
              <div className="relative">
                <select className="w-full bg-gray-200/70 border-none rounded-md px-4 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-primary appearance-none">
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <ChevronDown className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">
              Email Address
            </label>
            <input
              type="email"
              placeholder="ciromaske@gmail.com"
              className="w-full bg-gray-200/70 border-none rounded-md px-4 py-2 text-sm text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-primary focus:bg-white border border-gray-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">
              Enter Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="***********"
                className="w-full bg-white border border-gray-200/70 rounded-md px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <EyeClosed className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="***********"
                className="w-full bg-white border border-gray-200 rounded-md px-4 py-2  text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? (
                  <EyeClosed className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors shadow-lg shadow-blue-500/30 my-6 h-12"
            onClick={() => {
              navigate("/auth/register/success");
            }}
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
}
