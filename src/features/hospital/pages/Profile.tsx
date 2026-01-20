import { Button } from "@/components/ui/button";
import { ChevronLeft, Instagram, Twitter, Upload } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// --- Mock Data ---

const medicalRecords = [
  {
    id: 1,
    name: "Dayo Kingsley",
    bloodDonated: "B+",
    amount: "2 pints",
    date: "January 10, 2024",
    note: "Lorem Ipsum Avec...",
  },
  {
    id: 2,
    name: "Dayo Kingsley",
    bloodDonated: "B+",
    amount: "2 pints",
    date: "January 10, 2024",
    note: "Lorem Ipsum Avec...",
  },
  {
    id: 3,
    name: "Dayo Kingsley",
    bloodDonated: "B+",
    amount: "2 pints",
    date: "January 10, 2024",
    note: "Lorem Ipsum Avec...",
  },
  {
    id: 4,
    name: "Dayo Kingsley",
    bloodDonated: "B+",
    amount: "2 pints",
    date: "January 10, 2024",
    note: "Lorem Ipsum Avec...",
  },
  {
    id: 5,
    name: "Dayo Kingsley",
    bloodDonated: "B+",
    amount: "2 pints",
    date: "January 10, 2024",
    note: "Lorem Ipsum Avec...",
  },
  {
    id: 6,
    name: "Dayo Kingsley",
    bloodDonated: "B+",
    amount: "2 pints",
    date: "January 10, 2024",
    note: "Lorem Ipsum Avec...",
  },
];

const requestHistory = [
  {
    id: 1,
    type: "Blood request",
    bloodType: "A-",
    pints: 2,
    date: "9 - Sep - 2022, 13:02",
  },
  {
    id: 2,
    type: "Platelet request",
    bloodType: "O+",
    pints: 2,
    date: "9 - Sep - 2022, 13:02",
  },
  {
    id: 3,
    type: "Blood request",
    bloodType: "A-",
    pints: 2,
    date: "9 - Sep - 2022, 13:02",
  },
  {
    id: 4,
    type: "Platelet request",
    bloodType: "O+",
    pints: 2,
    date: "9 - Sep - 2022, 13:02",
  },
  {
    id: 5,
    type: "Blood request",
    bloodType: "B+",
    pints: 2,
    date: "9 - Sep - 2022, 13:02",
  },
  {
    id: 6,
    type: "Blood request",
    bloodType: "A-",
    pints: 2,
    date: "9 - Sep - 2022, 13:02",
  },
  {
    id: 7,
    type: "Blood request",
    bloodType: "A-",
    pints: 2,
    date: "9 - Sep - 2022, 13:02",
  },
];

// --- Components ---

const PatientCard = ({ record }: { record: (typeof medicalRecords)[0] }) => (
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
        <span className="text-gray-500">{record.note}</span>
      </div>
    </div>
  </div>
);

export default function BloodBankProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Medical Record");

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
        <Button className="bg-[#FFD600] text-black hover:bg-[#ffe033] font-bold px-8 rounded-xl">
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
            Black Magic Hospital
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="text-gray-500 text-sm font-bold mb-2 block">
              License Number
            </label>
            <div className="bg-gray-100 p-4 rounded-xl text-gray-700">
              LG12356-HP
            </div>
          </div>
          <div>
            <label className="text-gray-500 text-sm font-bold mb-2 block">
              Date Registered
            </label>
            <div className="bg-gray-100 p-4 rounded-xl text-gray-700">
              January 31, 1989
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="text-gray-500 text-sm font-bold mb-2 block">
              Contact 1
            </label>
            <div className="bg-gray-100 p-4 rounded-xl text-gray-700">
              +234 813 4673 7239
            </div>
          </div>
          <div>
            <label className="text-gray-500 text-sm font-bold mb-2 block">
              Contact 2
            </label>
            <div className="bg-gray-100 p-4 rounded-xl text-gray-700">
              +234 813 4673 7239
            </div>
          </div>
        </div>

        <div>
          <label className="text-gray-500 text-sm font-bold mb-2 block">
            Email Address
          </label>
          <div className="bg-gray-100 p-4 rounded-xl text-gray-700">
            Admin@BMHosiptal.com
          </div>
        </div>

        <div>
          <label className="text-gray-500 text-sm font-bold mb-2 block">
            Address
          </label>
          <div className="bg-gray-100 p-4 rounded-xl text-gray-700">
            No 34 William drive, Victoria Island, Ikeja, Wuse 2, Nigeria.
          </div>
        </div>

        <div>
          <h3 className="text-gray-500 text-sm font-bold mb-4">
            Social Connections
          </h3>
          <p className="text-xs text-gray-400 mb-6">
            Help your fans verity your account by connecting social
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600 font-medium">Instagram</span>
              </div>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6">
                Visit
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Twitter className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600 font-medium">Twitter</span>
              </div>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6">
                Visit
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="text-gray-400 text-xs mb-2 block">
              Profile Picture
            </label>
            <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
              <span className="text-gray-600 text-sm">Upload a Picture</span>
              <div className="flex items-center gap-2 bg-gray-200 px-3 py-1.5 rounded-lg">
                <Upload className="w-4 h-4 text-gray-600" />
                <div className="text-[10px] text-gray-500 leading-tight">
                  <div className="font-bold">Image</div>
                  <div>528kB - JPG</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-2 block">
              Cover Picture
            </label>
            <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
              <span className="text-gray-600 text-sm">Upload a Picture</span>
              <div className="flex items-center gap-2 bg-gray-200 px-3 py-1.5 rounded-lg">
                <Upload className="w-4 h-4 text-gray-600" />
                <div className="text-[10px] text-gray-500 leading-tight">
                  <div className="font-bold">Image</div>
                  <div>528kB - JPG</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMedicalRecord = () => (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {medicalRecords.map((record) => (
          <PatientCard key={record.id} record={record} />
        ))}
      </div>
      {/* Pagination Mock */}
      <div className="flex justify-center gap-2 mt-8">
        <button className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
          1
        </button>
        <button className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 font-bold text-sm flex items-center justify-center hover:bg-gray-200">
          2
        </button>
        <button className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 font-bold text-sm flex items-center justify-center hover:bg-gray-200">
          3
        </button>
      </div>
      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-12 rounded-xl">
          Next
        </Button>
      </div>
    </div>
  );

  const renderRequestHistory = () => (
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
                {request.bloodType}
              </div>
              <div>
                <h4 className="text-gray-900 font-bold text-sm">
                  {request.type}
                </h4>
                <p className="text-gray-400 text-xs mt-1">
                  {request.pints} pint • {request.date}
                </p>
              </div>
            </div>
            <button className="bg-blue-50 text-blue-600 text-xs font-bold px-6 py-2 rounded-lg hover:bg-blue-100 transition-colors">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {renderProfile()}
      <div className="bg-white rounded-xl shadow-sm p-2 flex justify-between items-center px-12 mt-8 mb-8">
        {["Medical Record", "Request History"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-2 rounded-md font-bold text-sm transition-colors relative ${
              activeTab === tab
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
