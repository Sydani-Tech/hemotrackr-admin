import { Droplet } from "lucide-react";

const DonationHistory = () => {
  const history = Array(7).fill({
    hospital: "General Hospital",
    amount: "1 Pint of Blood",
    time: "2 Wks ago",
    date: "9 March",
  });

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Donation History
      </h2>

      <div className="space-y-4">
        {history.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all cursor-default"
          >
            <div className="flex items-center gap-4">
              {/* Droplet with red background to match image exactly if needed, though image shows white bg with red icon. 
                                Image 1 shows: White box with Red Droplet. My code: White box with Red Droplet. Correct.
                            */}
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <Droplet className="w-6 h-6 text-red-500 fill-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">
                  {item.hospital}
                </h3>
                <div className="text-xs text-gray-500 mt-1 flex gap-2">
                  <span className="font-medium text-purple-900">
                    {item.amount}
                  </span>
                  <span className="text-gray-400">• {item.time}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 text-white rounded-xl px-4 py-2 text-center min-w-[70px] shadow-sm shadow-blue-200">
              <span className="block text-lg font-bold leading-none mb-0.5">
                {item.date.split(" ")[0]}
              </span>
              <span className="block text-[10px] uppercase font-medium">
                {item.date.split(" ")[1]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationHistory;
