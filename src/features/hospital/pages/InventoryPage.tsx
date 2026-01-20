import { MoveUp, MoveDown } from "lucide-react";
import { Link } from "react-router-dom";

const StockItem = ({
  bloodType,
  source,
  lastRestocked,
  quantity,
  isOutOfStock,
}: {
  bloodType: string;
  source: string;
  lastRestocked: string;
  quantity: string;
  isOutOfStock?: boolean;
}) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors px-4 rounded-xl">
    <div className="flex items-center gap-4">
      <div className="font-bold text-gray-700 w-8">{bloodType}</div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {source}
          </span>
        </div>
        <p className="text-[10px] text-gray-400">
          Last restocked • {lastRestocked}
        </p>
      </div>
    </div>
    <div
      className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
        isOutOfStock ? "bg-blue-50 text-blue-500" : "bg-blue-50 text-blue-500"
      }`}
    >
      {quantity}
    </div>
  </div>
);

export default function InventoryPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Sub Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">BMH Hospital</h2>
          <p className="text-sm text-gray-500">Blood Bank</p>
        </div>
        <Link
          to="/hospital/make-request"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-colors shadow-sm"
        >
          Make Request
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        {/* Whole Blood */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs relative overflow-hidden group hover:shadow transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">
                Whole Blood
              </p>
              <h3 className="text-3xl font-bold text-gray-900">200 Units</h3>
            </div>
            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full">
              In stock
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-green-500">
            <span>A-, B+, AB+, O-</span>
            <MoveUp className="w-3 h-3" />
          </div>
        </div>

        {/* Platelets (Out of Stock Example) */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs relative overflow-hidden group hover:shadow transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">
                Whole Blood
              </p>
              <h3 className="text-3xl font-bold text-gray-900">0 Units</h3>
            </div>
            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full bg-opacity-50">
              Out of stock
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-red-500">
            <span>A+, AB-, B</span>
            <MoveDown className="w-3 h-3" />
          </div>
        </div>

        {/* Incoming Stock */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs relative overflow-hidden group hover:shadow transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">
                Incoming stock
              </p>
              <h3 className="text-3xl font-bold text-gray-900">50 Units</h3>
            </div>
            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full bg-opacity-50">
              Out of stock
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-blue-500">
            <span>A+, AB-, B, O+</span>
            <MoveDown className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
        WHOLE BLOOD
      </h3>
      <div className="grid grid-cols-2 gap-8">
        {/* In Stock Column */}
        <div>
          <div className="bg-white rounded p-4 border border-gray-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase">
                IN STOCK
              </h3>
              <button className="text-orange-400 text-xs font-bold hover:text-orange-500">
                See all
              </button>
            </div>
            <StockItem
              bloodType="A-"
              source="BMH Hospital"
              lastRestocked="9 - Sep - 2022, 13:02"
              quantity="100 Units"
            />
            <StockItem
              bloodType="B+"
              source="Tesla Health Clinic"
              lastRestocked="9 - Sep - 2022, 13:02"
              quantity="100 Units"
            />
            <StockItem
              bloodType="AB+"
              source="St Patricks Hospital"
              lastRestocked="9 - Sep - 2022, 13:02"
              quantity="100 Units"
            />
            <StockItem
              bloodType="O-"
              source="St Patricks Hospital"
              lastRestocked="9 - Sep - 2022, 13:02"
              quantity="100 Units"
            />
          </div>
        </div>

        {/* Out of Stock Column */}
        <div>
          <div className="bg-white rounded p-4 border border-gray-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase">
                OUT OF STOCK
              </h3>
              <button className="text-orange-400 text-xs font-bold hover:text-orange-500">
                See all
              </button>
            </div>
            <StockItem
              bloodType="A+"
              source="BMH Hospital"
              lastRestocked="9 - Sep - 2022, 13:02"
              quantity="0 Units"
              isOutOfStock
            />
            <StockItem
              bloodType="B-"
              source="Tesla Health Clinic"
              lastRestocked="9 - Sep - 2022, 13:02"
              quantity="0 Units"
              isOutOfStock
            />
            <StockItem
              bloodType="AB-"
              source="St Patricks Hospital"
              lastRestocked="9 - Sep - 2022, 13:02"
              quantity="0 Units"
              isOutOfStock
            />
            <StockItem
              bloodType="O+"
              source="St Patricks Hospital"
              lastRestocked="9 - Sep - 2022, 13:02"
              quantity="0 Units"
              isOutOfStock
            />
          </div>
        </div>
      </div>

      {/* Platelets Grid */}
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 pt-4">
        PLATELETS
      </h3>
      <div className="grid grid-cols-2 gap-8">
        {/* In Stock Column */}
        <div>
          <div className="bg-white rounded p-4 border border-gray-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase">
                IN STOCK
              </h3>
              <button className="text-orange-400 text-xs font-bold hover:text-orange-500">
                See all
              </button>
            </div>
            <StockItem
              bloodType="A-"
              source="BMH Hospital"
              lastRestocked="9 - Sep - 2022, 13:02"
              quantity="100 Units"
            />
            <StockItem
              bloodType="B+"
              source="Tesla Health Clinic"
              lastRestocked="9 - Sep - 2022, 13:02"
              quantity="100 Units"
            />
            <StockItem
              bloodType="AB+"
              source="St Patricks Hospital"
              lastRestocked="9 - Sep - 2022, 13:02"
              quantity="100 Units"
            />
            <StockItem
              bloodType="O-"
              source="St Patricks Hospital"
              lastRestocked="9 - Sep - 2022, 13:02"
              quantity="100 Units"
            />
          </div>
        </div>

        {/* Out of Stock Column */}
        <div>
          <div className="bg-white rounded p-4 border border-gray-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase">
                OUT OF DSTOCK
              </h3>
              <button className="text-orange-400 text-xs font-bold hover:text-orange-500">
                See all
              </button>
            </div>
            <StockItem
              bloodType="A+"
              source="BMH Hospital"
              lastRestocked="9 - Sep - 2022, 13:02"
              quantity="0 Units"
              isOutOfStock
            />
            <StockItem
              bloodType="B-"
              source="Tesla Health Clinic"
              lastRestocked="9 - Sep - 2022, 13:02"
              quantity="0 Units"
              isOutOfStock
            />
            <StockItem
              bloodType="AB-"
              source="St Patricks Hospital"
              lastRestocked="9 - Sep - 2022, 13:02"
              quantity="0 Units"
              isOutOfStock
            />
            <StockItem
              bloodType="O+"
              source="St Patricks Hospital"
              lastRestocked="9 - Sep - 2022, 13:02"
              quantity="0 Units"
              isOutOfStock
            />
          </div>
        </div>
      </div>
    </div>
  );
}
