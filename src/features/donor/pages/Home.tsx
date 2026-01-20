import {Clock, MessageSquare} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-3xl p-8 flex items-center justify-between relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            WELCOME
          </p>
          <h1 className="text-4xl font-serif text-gray-900 mb-4">
            Start by donating to save a life.
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Aliquet elit hac facilisis
            non faucibus mi vestibulum mattis et. Sed quis consequat integer
            accumsan amet nunc libero lacus et. Vitae risus curabitur.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/donor/blood-banks"
              className="bg-[#5D4ED8] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#4c3fc2] transition-colors"
            >
              Donate Here
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 font-medium">
                18,887 Blood Donors
              </span>
            </div>
          </div>
        </div>

        {/* Ad Card (Right Side) */}
        <div className="w-80 bg-gray-900 rounded-2xl overflow-hidden relative shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
          <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Doctor"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
            <p className="text-xs font-bold uppercase tracking-wider mb-2 text-blue-400">
              FREE MEDICAL TEST
            </p>
            <h3 className="font-bold text-lg mb-4 leading-tight">
              Get your free medical test at HTPS Hospital
            </h3>
            <button className="bg-white text-gray-900 text-xs font-bold px-4 py-2 rounded-lg">
              Click to find out more.
            </button>
          </div>
        </div>
      </div>

      {/* Shortcuts */}
      <div>
        <h2 className="text-2xl font-serif text-gray-900 mb-6">Shortcuts</h2>
        <div className="space-y-4">
          {/* Walk in Blood Donation */}
          <div className="bg-white border border-blue-500 rounded-2xl p-4 flex items-center justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                !!
              </div>
              <span className="font-medium text-gray-900">
                Walk in Blood Donation
              </span>
            </div>

            {/* Status/Badge */}
            <div className="absolute -top-1 right-12">
              <div className="bg-[#FFD600] px-3 py-1 rounded-b-lg shadow-sm">
                <span className="text-xs font-bold">Start</span>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=User" alt="User" />
            </div>
          </div>

          {/* Schedule a donation */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between hover:border-gray-200 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                <Clock className="w-5 h-5" />
              </div>
              <span className="font-medium text-gray-700">
                Schedule a donation
              </span>
            </div>
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
              <div className="w-3 h-3 text-gray-400">✓</div>
            </div>
          </div>

          {/* Message */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between hover:border-gray-200 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="font-medium text-gray-700">Message</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
              <div className="w-3 h-3 text-gray-400">✓</div>
            </div>
          </div>

          {/* Donation History */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between hover:border-gray-200 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                <Clock className="w-5 h-5" />
              </div>
              <span className="font-medium text-gray-700">
                Donation History
              </span>
            </div>
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
              <div className="w-3 h-3 text-gray-400">✓</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
