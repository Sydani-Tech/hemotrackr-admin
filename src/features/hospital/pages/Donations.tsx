import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import ScheduleSuccessModal from "../components/ScheduleSuccessModal";
import { useState } from "react";

const Donations = () => {
  const navigate = useNavigate();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const walkInDonors = [
    {
      id: 1,
      name: "Dayo Temi",
      bloodType: "A-",
      type: "Whole Blood",
      date: "9 - Sep - 2022, 13:02",
      category: "Blood Donor",
    },
    {
      id: 2,
      name: "Dayo Temi",
      bloodType: "O+",
      type: "Platelet",
      date: "9 - Sep - 2022, 13:02",
      category: "Blood donor",
    },
    {
      id: 3,
      name: "Dayo Temi",
      bloodType: "O+",
      type: "Platelet",
      date: "9 - Sep - 2022, 13:02",
      category: "Blood donor",
    },
  ];

  const scheduledDonors = [
    {
      id: 1,
      name: "Dayo Temi",
      bloodType: "A-",
      type: "Whole Blood",
      date: "9 - Sep - 2022, 13:02",
      category: "Blood Donor",
    },
    {
      id: 2,
      name: "Dayo Temi",
      bloodType: "O+",
      type: "Platelet",
      date: "9 - Sep - 2022, 13:02",
      category: "Blood donor",
    },
    {
      id: 3,
      name: "Dayo Temi",
      bloodType: "O+",
      type: "Platelet",
      date: "9 - Sep - 2022, 13:02",
      category: "Blood donor",
    },
  ];

  const DonationItem = ({ donor }: { donor: any }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${
            donor.bloodType === "A-"
              ? "bg-blue-50 text-blue-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {donor.bloodType}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-gray-700">{donor.name}</h3>
            <span className="bg-blue-100 text-blue-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {donor.category}
            </span>
          </div>
          <p className="text-xs text-gray-400">
            {donor.type} • {donor.date}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-8 py-2 rounded-lg text-xs font-bold transition-colors" onClick={()=>setIsSuccessModalOpen(true)}>
          Accept
        </button>
        <button className="bg-red-100 text-red-500 hover:bg-red-200 px-8 py-2 rounded-lg text-xs font-bold transition-colors">
          Reject
        </button>
        <button className="bg-green-100 text-green-700 hover:bg-green-200 px-6 py-2 rounded-lg text-xs font-bold transition-colors">
          View Profile
        </button>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Walk-in Donations */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-3xl font-serif text-gray-900">
            Walk-in donations
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          {walkInDonors.map((donor) => (
            <DonationItem key={donor.id} donor={donor} />
          ))}
        </div>
      </div>

      {/* Scheduled Donations */}
      <div>
        <h2 className="text-3xl font-serif text-gray-900 mb-6 pl-12">
          Scheduled donations
        </h2>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          {scheduledDonors.map((donor) => (
            <DonationItem key={donor.id} donor={donor} />
          ))}
        </div>
      </div>

      <ScheduleSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};

export default Donations;
