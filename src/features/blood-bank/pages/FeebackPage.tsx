import { ArrowLeft, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MedicalTestModal from "../components/MedicalTestModal";

const feedbackData = [
  {
    id: 1,
    name: "Offshore Winch",
    comment: "Donation process was easy and fast. Staff members were kind.",
    rating: 5,
    date: "9-10-24, 12:00pm",
  },
  {
    id: 2,
    name: "Offshore Winch",
    comment: "Donation process was easy and fast. Staff members were kind.",
    rating: 4,
    date: "9-10-24, 12:00pm",
  },
  {
    id: 3,
    name: "Offshore Winch",
    comment: "Donation process was easy and fast. Staff members were kind.",
    rating: 5,
    date: "9-10-24, 12:00pm",
  },
  {
    id: 4,
    name: "Offshore Winch",
    comment: "Donation process was easy and fast. Staff members were kind.",
    rating: 3,
    date: "9-10-24, 12:00pm",
  },
  {
    id: 5,
    name: "Offshore Winch",
    comment: "Donation process was easy and fast. Staff members were kind.",
    rating: 5,
    date: "9-10-24, 12:00pm",
  },
];

export default function FeebackPage() {
  const navigate = useNavigate();

  return (
    <>
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
              Donor Feedback
            </h2>
          </div>

          <div className=" bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="space-y-6">
              {feedbackData.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-gray-100 last:border-0 pb-6 last:pb-0"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar Placeholder */}
                    <div className="w-12 h-12 bg-gray-200 rounded-full shrink-0" />

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                      </div>

                      <p className="text-gray-500 text-sm mb-2 max-w-md">
                        {item.comment}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < item.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Ad & Share */}
        <MedicalTestModal />
      </div>
    </>
  );
}
