import { Link, useParams, useNavigate } from "react-router-dom";
import { MessageCircle, Star, ExternalLink, Loader2, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { DonorAPI } from "@/core/services/DonorService";

const BloodBankDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [facility, setFacility] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isCheckInSuccess, setIsCheckInSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      fetchDetails();
    }
  }, [id]);

  const fetchDetails = async () => {
    try {
      const response = await DonorAPI.getBloodBankDetails(id!);
      setFacility(response.data.organization);
    } catch (error) {
      console.error("Failed to fetch facility details", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMessage = () => {
    navigate("/donor/messages");
  };

  const handleCheckIn = async () => {
    try {
      const now = new Date();
      await DonorAPI.createAppointment({
        organization_id: id,
        appointment_date: now.toISOString().split("T")[0],
        appointment_time: now.toTimeString().slice(0, 5),
        type: "Walk-in",
        donation_type: "Whole Blood",
        notes: "Walk-in Check-in",
      });
      setIsCheckInSuccess(true);
    } catch (error: any) {
      console.error("Failed to check in", error);
      const message = error.response?.data?.message || "Failed to check in. Please try again.";
      alert(message);
    }
  };

  const getImageUrl = (path: string | null) => {
    if (!path) return "https://placehold.co/100x100/png?text=BB";
    if (path.startsWith("http")) return path;
    return `http://localhost:8000${path.startsWith("/") ? "" : "/"}${path}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!facility) {
    return <div className="text-center py-10">Blood Banks not found.</div>;
  }

  // Mock reviews for now as backend doesn't seem to have them yet
  const reviews = [
    {
      user: "Offshore User",
      date: "9-10-24, 12:00pm",
      rating: 4,
      text: "Donation process was easy and fast. Staff members were kind.",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500">
        <Link
          to="/donor/dashboard"
          className="hover:text-blue-600 transition-colors"
        >
          Dashboard
        </Link>
        <div className="mx-2 text-gray-400">/</div>
        <Link
          to="/donor/blood-banks"
          className="hover:text-blue-600 transition-colors"
        >
          Blood Banks
        </Link>
        <div className="mx-2 text-gray-400">/</div>
        <span className="text-gray-900 font-medium">{facility.name}</span>
      </div>

      {/* Header / Title */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
              <img
                src={getImageUrl(facility.logo)}
                className="w-full h-full object-cover"
                alt="Logo"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-600">
                {facility.name}
              </h1>
              <p className="text-sm text-gray-500">{facility.type}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleMessage}
            className="flex items-center gap-2 px-4 py-2.5 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Message
          </button>
          <button
            onClick={handleCheckIn}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Check className="w-4 h-4" />
            Check In
          </button>
          <Link
            to="schedule"
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <div className="w-4 h-4 rounded-full bg-white text-blue-600 flex items-center justify-center text-xs">
              ✓
            </div>
            Schedule a Donation
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center justify-end gap-12 border-b border-gray-100 pb-4">
        <div className="text-center">
          <p className="font-bold text-gray-900">Mon - Fri</p>
          <p className="text-xs text-gray-400">Reviews</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-gray-900">{reviews.length}</p>
          <p className="text-xs text-gray-400">Reviews</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-gray-900">4.5</p>
          <p className="text-xs text-gray-400">Rating</p>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full h-80 rounded-3xl overflow-hidden shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2673&auto=format&fit=crop"
          className="w-full h-full object-cover bg-gray-100"
          alt="Hospital Building"
        />
      </div>

      {/* Info Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Map Card */}
        <div className="bg-white p-4 rounded-xl border border-blue-100 flex items-start gap-4 col-span-1 md:col-span-1">
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
            <img
              src="https://placehold.co/100x100/png?text=Map"
              className="w-full h-full object-cover"
              alt="Map"
            />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">{facility.name}</h3>
            <p className="text-xs text-gray-500 mt-1 leading-tight">
              {facility.address}
            </p>
            <a
              href={`https://maps.google.com/?q=${facility.latitude},${facility.longitude}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-orange-400 flex items-center gap-1 mt-2 hover:underline"
            >
              Open in Google Map <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col justify-center items-center">
          <h3 className="text-2xl font-bold text-blue-600">
            {facility.inventory_items ? facility.inventory_items.reduce((acc: number, item: any) => acc + item.units_in_stock, 0) : 0}
          </h3>
          <p className="text-xs text-gray-500">Units Available</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col justify-center items-center">
          <h3 className="text-base font-bold text-blue-600 text-center">
            {typeof facility.operating_hours === 'object' && facility.operating_hours
              ? "Mon-Fri: 9AM-5PM"
              : facility.operating_hours || "9AM - 5PM"}
          </h3>
          <p className="text-xs text-gray-500">Operating Hours</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col justify-center items-center">
          <h3 className="text-2xl font-bold text-blue-600">
            {reviews.length}
          </h3>
          <p className="text-xs text-gray-500">Reviews</p>
        </div>
      </div>

      {/* Reviews Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Reviews</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="flex gap-4 pb-6 border-b border-gray-50 last:border-0"
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">
                  {review.user}
                </h4>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                  {review.text}
                </p>
                <div className="flex items-center justify-between mt-2 w-full gap-12">
                  <div className="flex text-yellow-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-200"
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {review.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button className="text-gray-600 font-bold hover:text-gray-900 text-sm">
            View all
          </button>
        </div>
      </div>

      {isCheckInSuccess && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm"
          onClick={() => setIsCheckInSuccess(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 w-full max-w-sm flex flex-col items-center text-center shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200 mb-6">
              <Check className="w-8 h-8 text-white stroke-[3px]" />
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">Done!</h2>
            <p className="text-gray-500 text-sm mb-8 font-medium">Checked In</p>

            <button
              onClick={() => navigate("/donor/dashboard")}
              className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodBankDetails;
