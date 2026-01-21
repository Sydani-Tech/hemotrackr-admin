
import { Droplet, User } from "lucide-react";

const AdminInventoryDetails = () => {

  // Mock header info
  const facilityName = "BMH Hospital";
  const facilityType = "Blood Bank";

  const bloodGroups = [
    {
      type: "A+",
      status: "Instock",
      inStock: true,
      percent: 80,
      color: "#EF4444",
    },
    {
      type: "A-",
      status: "Instock",
      inStock: true,
      percent: 70,
      color: "#EF4444",
    },
    {
      type: "O+",
      status: "Out of Stock",
      inStock: false,
      percent: 0,
      color: "#EF4444",
    },
    {
      type: "O-",
      status: "Instock",
      inStock: true,
      percent: 12,
      color: "#EF4444",
    },
    {
      type: "AB+",
      status: "In stock",
      inStock: true,
      percent: 50,
      color: "#EF4444",
    },
    {
      type: "AB-",
      status: "Out of stock",
      inStock: false,
      percent: 0,
      color: "#EF4444",
    },
    {
      type: "B+",
      status: "Instock",
      inStock: true,
      percent: 12,
      color: "#EF4444",
    },
    {
      type: "B-",
      status: "Out of stock",
      inStock: false,
      percent: 0,
      color: "#EF4444",
    },
  ];

  const inStockItems = [
    {
      type: "A+",
      bank: "BMH Hospital",
      address: "No 12, Hopkins ST, AGEGE",
      amount: "22 pt",
      last: "12 - Oct - 2024, 14:00",
    },
    {
      type: "B+",
      bank: "Tesla Health Clinic",
      address: "No 12, Hopkins ST, AGEGE",
      amount: "22 pt",
      last: "12 - Oct - 2024, 14:00",
    },
    {
      type: "O+",
      bank: "Tesla Health Clinic",
      address: "No 12, Hopkins ST, AGEGE",
      amount: "22 pt",
      last: "12 - Oct - 2024, 14:00",
    },
    {
      type: "AB-",
      bank: "Tesla Health Clinic",
      address: "No 12, Hopkins ST, AGEGE",
      amount: "22 Pt",
      last: "12 - Oct - 2024, 14:00",
    },
  ];

  const outStockItems = [
    {
      type: "A+",
      bank: "BMH Hospital",
      address: "No 12, Hopkins ST, AGEGE",
      amount: "0 pt",
      last: "12 - Oct - 2024, 14:00",
    },
    {
      type: "B+",
      bank: "Tesla Health Clinic",
      address: "No 12, Hopkins ST, AGEGE",
      amount: "0 pt",
      last: "12 - Oct - 2024, 14:00",
    },
    {
      type: "O+",
      bank: "Tesla Health Clinic",
      address: "No 12, Hopkins ST, AGEGE",
      amount: "0 pt",
      last: "12 - Oct - 2024, 14:00",
    },
    {
      type: "AB-",
      bank: "Tesla Health Clinic",
      address: "No 12, Hopkins ST, AGEGE",
      amount: "0 pt",
      last: "12 - Oct - 2024, 14:00",
    },
  ];

  const StockTable = ({ title, items }: { title: string; items: any[] }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-500 text-sm uppercase">{title}</h3>
        <button className="bg-[#DBEAFE] text-blue-600 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1">
          View all ▼
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="pb-4 font-bold text-sm text-gray-900 w-24">
                Blood Type
              </th>
              <th className="pb-4 font-bold text-sm text-gray-900">
                Blood Bank
              </th>
              <th className="pb-4 font-bold text-sm text-gray-900 text-center">
                Pints Available
              </th>
              <th className="pb-4 font-bold text-sm text-gray-900 text-right">
                Last Restocked
              </th>
            </tr>
          </thead>
          <tbody className="space-y-4">
            {items.map((item, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-blue-50 text-blue-600`}
                    >
                      {item.type}
                    </div>
                    <Droplet className="w-4 h-4 text-red-500 fill-red-500" />
                  </div>
                </td>
                <td className="py-4">
                  <div>
                    <p className="font-bold text-gray-700 text-sm">
                      {item.bank}
                    </p>
                    <p className="text-[10px] text-gray-400">{item.address}</p>
                  </div>
                </td>
                <td className="py-4 text-center font-medium text-gray-600">
                  {item.amount}
                </td>
                <td className="py-4 text-right text-xs text-gray-500 font-medium">
                  {item.last}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start md:items-center bg-white p-6 rounded-2xl border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{facilityName}</h1>
          <p className="text-gray-500">{facilityType}</p>
        </div>
        <button className="bg-[#6366F1] hover:bg-[#4F46E5] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <User className="w-4 h-4" /> View profile
        </button>
      </div>

      {/* Blood Groups Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bloodGroups.map((group, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[160px]"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Droplet className="w-5 h-5 text-red-500 fill-red-500" />
                <span className="text-lg font-bold text-gray-900">
                  {group.type}
                </span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-1 rounded-md ${group.inStock ? "bg-[#DBEAFE] text-blue-600" : "bg-gray-100 text-gray-500"}`}
              >
                {group.status}
              </span>
            </div>

            <div>
              <p className="text-[10px] text-gray-400 font-medium mb-1">
                📅 Incoming Stock:{" "}
                <span className="text-gray-900">
                  {group.inStock ? "50pt 20 Oct 2024" : "None"}
                </span>
              </p>

              <div className="relative pt-2">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${group.percent}%`,
                      background:
                        group.percent > 50
                          ? "linear-gradient(90deg, #EF4444 0%, #10B981 100%)"
                          : "#D1D5DB", // Mocking the gradient
                    }}
                  ></div>
                </div>
                <p className="text-right text-[10px] font-bold text-gray-500 mt-1">
                  {group.percent}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* In Stock & Out of Stock Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <StockTable title="IN STOCK" items={inStockItems} />
        <StockTable title="OUT OF STOCK" items={outStockItems} />
      </div>

      {/* Duplicate rows for visual fullness if needed, or just leave as is since mock is enough */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <StockTable title="IN STOCK" items={inStockItems} />
        <StockTable title="OUT OF STOCK" items={outStockItems} />
      </div>
    </div>
  );
};

export default AdminInventoryDetails;
