import { Droplet, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { authInstance } from "@/core/api/apiInstances";

const DonationHistory = () => {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonationHistory();
  }, []);

  const fetchDonationHistory = async () => {
    try {
      const response = await authInstance.get("/donor/donations/history");
      setDonations(response.data.data || response.data);
    } catch (error) {
      console.error("Failed to fetch donation history", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Donation History
      </h2>

      <div className="space-y-4">
        {donations.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>No donation history yet.</p>
            <p className="text-sm mt-2">Your donations will appear here.</p>
          </div>
        ) : (
          donations.map((donation) => (
            <div
              key={donation.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all cursor-default"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Droplet className="w-6 h-6 text-red-500 fill-red-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">
                    {donation.organization?.name || "Unknown Organization"}
                  </h3>
                  <div className="text-xs text-gray-500 mt-1 flex gap-2">
                    <span className="font-medium text-purple-900">
                      {donation.units} Pint{donation.units > 1 ? 's' : ''} of {donation.blood_group} Blood
                    </span>
                    <span className="text-gray-400">
                      • {new Date(donation.donation_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600 text-white rounded-xl px-4 py-2 text-center min-w-[70px] shadow-sm shadow-blue-200">
                <span className="block text-lg font-bold leading-none mb-0.5">
                  {new Date(donation.donation_date).getDate()}
                </span>
                <span className="block text-[10px] uppercase font-medium">
                  {new Date(donation.donation_date).toLocaleString('default', { month: 'short' })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DonationHistory;
