import { Button } from "@/components/ui/button";
import { MoveDown, MoveUp, Loader2, Plus, Minus, Bell, MapPin, X, Split } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { InventoryService, type InventoryItem } from "@/core/services/InventoryService";
import { AlertService } from "@/core/services/AlertService";
import { useAuth } from "@/core/provider/AuthProvider";
import StockInModal from "../components/StockInModal";
import StockOutModal from "../components/StockOutModal";
import AlertPanel from "../components/AlertPanel";
import LocationManager from "../components/LocationManager";
import ComponentSeparationModal from "../components/ComponentSeparationModal";

// Helper component for stock rows
const StockItem = ({
  item,
  onSeparate,
}: {
  item: InventoryItem & { units: number; location: string };
  onSeparate: (item: InventoryItem) => void;
}) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors px-4 rounded-xl">
    <div className="flex items-center gap-4">
      <div className="font-bold text-gray-700 w-8">{item.blood_group}</div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {item.location}
          </span>
          {item.type === "Whole Blood" && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onSeparate(item)}
              className="h-5 px-2 text-[10px] text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            >
              <Split className="w-3 h-3 mr-1" /> Separate
            </Button>
          )}
        </div>
        <p className="text-[10px] text-gray-400">
          Last updated • {new Date(item.updated_at).toLocaleDateString()}
        </p>
      </div>
    </div>
    <div
      className={`px-4 py-1.5 rounded-lg text-xs font-bold ${item.units === 0 ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-500"
        } `}
    >
      {item.units} Units
    </div>
  </div>
);

export default function InventoryPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isStockInOpen, setIsStockInOpen] = useState(false);
  const [isStockOutOpen, setIsStockOutOpen] = useState(false);
  const [isAlertPanelOpen, setIsAlertPanelOpen] = useState(false);
  const [isLocationManagerOpen, setIsLocationManagerOpen] = useState(false);
  const [separationItem, setSeparationItem] = useState<InventoryItem | null>(null);

  const [unreadAlerts, setUnreadAlerts] = useState(0);

  useEffect(() => {
    fetchInventory();
    fetchUnreadAlerts();
  }, []);

  const fetchUnreadAlerts = async () => {
    try {
      await AlertService.checkAlerts();
      const count = await AlertService.getUnreadCount();
      setUnreadAlerts(count.count);
    } catch (error) {
      console.error("Failed to fetch alerts", error);
    }
  };

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const response = await InventoryService.getInventory();
      setInventory(response.data || []);
    } catch (error) {
      console.error("Failed to fetch inventory", error);
    } finally {
      setLoading(false);
    }
  };

  // Group inventory
  const groupedInventory = inventory.reduce((acc, item) => {
    const key = `${item.blood_group}-${item.type}`;
    if (!acc[key]) {
      acc[key] = {
        ...item,
        units: item.units_in_stock,
        location: item.location || "Main Storage",
      };
    } else {
      acc[key].units += item.units_in_stock;
    }
    return acc;
  }, {} as Record<string, any>);

  const inventoryItems = Object.values(groupedInventory);

  // Filters
  const wholeBloodInStock = inventoryItems.filter(
    (item) => item.type === "Whole Blood" && item.units > 0
  );
  const wholeBloodOutOfStock = inventoryItems.filter(
    (item) => item.type === "Whole Blood" && item.units === 0
  );
  const plateletsInStock = inventoryItems.filter(
    (item) => (item.type === "PLT" || item.type === "Platelets") && item.units > 0
  );
  const plateletsOutOfStock = inventoryItems.filter(
    (item) => (item.type === "PLT" || item.type === "Platelets") && item.units === 0
  );

  const totalWholeBlood = wholeBloodInStock.reduce((sum, item) => sum + item.units, 0);
  const totalPlatelets = plateletsInStock.reduce((sum, item) => sum + item.units, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{user?.name || "Blood Bank"}</h2>
          <p className="text-sm text-gray-500">Blood Inventory Management</p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <Button
            variant="outline"
            className="relative"
            onClick={() => setIsAlertPanelOpen(true)}
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {unreadAlerts > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {unreadAlerts}
              </span>
            )}
          </Button>
          <Button
            onClick={() => navigate("/blood-bank/make-request")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
          >
            Request Blood
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <Button
          onClick={() => setIsStockInOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Stock In
        </Button>
        <Button
          onClick={() => setIsStockOutOpen(true)}
          variant="outline"
          className="border-red-300 text-red-600 hover:bg-red-50 flex items-center gap-2"
        >
          <Minus className="w-4 h-4" />
          Stock Out
        </Button>
        <Button
          onClick={() => setIsLocationManagerOpen(true)}
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
        >
          <MapPin className="w-4 h-4" />
          Locations
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">Whole Blood</p>
              <h3 className="text-3xl font-bold text-gray-900">{totalWholeBlood} Units</h3>
            </div>
            <div className={`p-2 rounded-full ${totalWholeBlood > 0 ? 'bg-blue-50' : 'bg-red-50'}`}>
              <MoveUp className={`w-5 h-5 ${totalWholeBlood > 0 ? 'text-blue-500' : 'text-red-500'}`} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">Platelets</p>
              <h3 className="text-3xl font-bold text-gray-900">{totalPlatelets} Units</h3>
            </div>
            <div className={`p-2 rounded-full ${totalPlatelets > 0 ? 'bg-blue-50' : 'bg-red-50'}`}>
              <MoveDown className={`w-5 h-5 ${totalPlatelets > 0 ? 'text-blue-500' : 'text-red-500'}`} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-center items-center text-center">
          <p className="text-sm text-gray-500 mb-2">Total Combined Stock</p>
          <h3 className="text-4xl font-black text-gray-800">{totalWholeBlood + totalPlatelets}</h3>
          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full mt-2 font-medium">Available Units</span>
        </div>
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Whole Blood Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wilder">Whole Blood Inventory</h3>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {wholeBloodInStock.length > 0 ? (
              wholeBloodInStock.map((item) => (
                <StockItem
                  key={`${item.blood_group}-wb`}
                  item={item}
                  onSeparate={(itm) => setSeparationItem(itm)}
                />
              ))
            ) : (
              <div className="p-8 text-center text-gray-400 text-sm">No items in stock</div>
            )}
          </div>
        </div>

        {/* Platelets Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wilder">Platelets Inventory</h3>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {plateletsInStock.length > 0 ? (
              plateletsInStock.map((item) => (
                <StockItem
                  key={`${item.blood_group}-plt`}
                  item={item}
                  onSeparate={(itm) => setSeparationItem(itm)}
                />
              ))
            ) : (
              <div className="p-8 text-center text-gray-400 text-sm">No items in stock</div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <StockInModal
        isOpen={isStockInOpen}
        onClose={() => setIsStockInOpen(false)}
        onSuccess={fetchInventory}
      />
      <StockOutModal
        isOpen={isStockOutOpen}
        onClose={() => setIsStockOutOpen(false)}
        onSuccess={fetchInventory}
      />

      {/* Side Panels */}
      <AlertPanel
        isOpen={isAlertPanelOpen}
        onClose={() => {
          setIsAlertPanelOpen(false);
          fetchUnreadAlerts();
        }}
      />

      {isLocationManagerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="absolute inset-0 -z-10" onClick={() => setIsLocationManagerOpen(false)} />
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden h-[80vh] flex flex-col">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Storage Locations</h2>
              <button onClick={() => setIsLocationManagerOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              <LocationManager />
            </div>
          </div>
        </div>
      )}

      {/* Component Separation Modal */}
      {separationItem && (
        <ComponentSeparationModal
          isOpen={!!separationItem}
          parentItem={separationItem}
          onClose={() => setSeparationItem(null)}
          onSuccess={fetchInventory}
        />
      )}
    </div>
  );
}
