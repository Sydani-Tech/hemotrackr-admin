import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ScheduleSuccessModal from "../components/ScheduleSuccessModal";

const ScheduleDonation = () => {
  const navigate = useNavigate();
  const [donationType, setDonationType] = React.useState<
    "Blood" | "Platelets" | "Bone Marrow"
  >("Blood");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="flex gap-8 items-start">
      {/* Main Form Section */}
      <div className="flex-1 bg-white rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 border border-blue-500 rounded-xl px-6 py-4 flex items-center gap-3 bg-white">
            <div className="w-5 h-5 text-blue-500">
              {/* Clock/Schedule Icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <span className="font-semibold text-gray-900">
              Schedule a donation
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
          {/* Donation Type */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3 block">
              SELECT DONATION TYPE
            </label>
            <div className="flex gap-2">
              {(["Blood", "Platelets", "Bone Marrow"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setDonationType(type)}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                    donationType === type
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Blood Group */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
              BLOOD GROUP
            </label>
            <div className="relative">
              <select className="w-full bg-gray-100 border-none rounded-xl px-4 py-3.5 text-gray-500 text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                <option>Choose Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Genotype */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
              GENOTYPE
            </label>
            <div className="relative">
              <select className="w-full bg-gray-100 border-none rounded-xl px-4 py-3.5 text-gray-500 text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                <option>Choose Genotype</option>
                <option>AA</option>
                <option>AS</option>
                <option>SS</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
              PATIENT GENDER
            </label>
            <div className="relative">
              <select className="w-full bg-gray-100 border-none rounded-xl px-4 py-3.5 text-gray-500 text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
              SELECT DATE
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full bg-gray-100 border-none rounded-xl px-4 py-3.5 text-gray-500 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
              SELECT TIME
            </label>
            <div className="relative">
              <input
                type="time"
                className="w-full bg-gray-100 border-none rounded-xl px-4 py-3.5 text-gray-500 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white w-32 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
          >
            Schedule
          </button>
        </form>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 space-y-8">
        {/* Ad Card */}
        <div className="bg-gray-900 rounded-2xl overflow-hidden relative shadow-xl h-48">
          <div className="absolute inset-0 bg-linear-to-r from-black/80 to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Doctor"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
            <p className="text-[10px] font-bold uppercase tracking-wider mb-2 text-blue-400">
              FREE MEDICAL TEST
            </p>
            <h3 className="font-bold text-sm mb-4 leading-tight">
              Get your free medical test at HTPS Hospital
            </h3>
            <button className="bg-white text-gray-900 text-[10px] font-bold px-3 py-1.5 rounded">
              Click to find out more.
            </button>
          </div>
        </div>

        {/* Share */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Share</h3>
          <div className="flex gap-4 text-gray-400">
            <a href="#" className="hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="#" className="hover:text-black transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="hover:text-gray-600 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <ScheduleSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};

export default ScheduleDonation;
