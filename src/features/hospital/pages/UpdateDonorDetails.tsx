import { ArrowLeft, User } from "lucide-react";
import MedicalTestModal from "../components/MedicalTestModal";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function UpdateDonorDetails() {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Main Content */}
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-3xl font-serif text-gray-900">
            Update donor info
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          {/* User Card */}
          <div className="bg-gray-100/50 rounded-xl p-6 mb-8 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 shrink-0">
              <User className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Abayomi Ayodele</h3>
              <p className="text-sm text-gray-500">
                From BHM - HSG Hospital 18:16:1
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6 max-w-2xl">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-900 block">
                Genotype
              </label>
              <div className="relative">
                <select className="w-full bg-white border border-gray-100 h-12 rounded-lg px-4 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm">
                  <option value="" disabled selected>
                    Choose Genotype
                  </option>
                  <option value="AA">AA</option>
                  <option value="AS">AS</option>
                  <option value="SS">SS</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-900 block">
                Blood Group
              </label>
              <div className="relative">
                <select className="w-full bg-white border border-gray-100 h-12 rounded-lg px-4 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm">
                  <option value="" disabled selected>
                    Choose Blood Group
                  </option>
                  <option value="A+">A+</option>
                  <option value="O+">O+</option>
                  <option value="B+">B+</option>
                  <option value="AB+">AB+</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-900 block">
                Height
              </label>
              <input
                placeholder="177cm"
                className="w-full bg-white border border-gray-100 h-12 rounded-lg px-4 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-900 block">
                Platelets Type
              </label>
              <input
                placeholder="Type"
                className="w-full bg-white border border-gray-100 h-12 rounded-lg px-4 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>

            <div className="pt-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg font-semibold">
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Ad & Share */}
      <MedicalTestModal />
    </div>
  );
}
