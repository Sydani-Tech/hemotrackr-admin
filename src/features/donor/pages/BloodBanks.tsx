import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { List, Map as MapIcon, Plus, Loader2 } from "lucide-react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { DonorAPI } from "@/core/services/DonorService";

// --- Types ---
interface BloodBank {
  id: string;
  name: string;
  address: string;
  phone?: string;
  latitude: number;
  longitude: number;
}

// --- Components ---

const BloodBankList = ({ data }: { data: BloodBank[] }) => {
  if (data.length === 0) {
    return <div className="text-center text-gray-400 py-10">No blood banks found.</div>;
  }
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <Link
          to={`/donor/blood-banks/${item.id}`}
          key={item.id}
          className="block group"
        >
          <div className="bg-white rounded-2xl p-6 flex items-start gap-4 shadow-sm group-hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shrink-0 text-white cursor-pointer group-hover:bg-blue-600">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`font-bold text-blue-500 mb-1`}>{item.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.address}
              </p>
              {item.phone && (
                <p className="text-gray-400 text-xs mt-2">Tel: {item.phone}</p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

const BloodBankMap = ({ data }: { data: BloodBank[] }) => {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const map = React.useRef<maplibregl.Map | null>(null);

  React.useEffect(() => {
    if (map.current) return; // initialize map only once
    if (!mapContainer.current) return;

    // Default center (can be adjusted or set to user location)
    const defaultCenter: [number, number] = [7.49508, 9.05785]; // Abuja approx

    // Determine center based on data if available
    let center = defaultCenter;
    if (data.length > 0 && data[0].longitude && data[0].latitude) {
      center = [data[0].longitude, data[0].latitude];
    }

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: [
              "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            attribution: "&copy; OpenStreetMap Contributors",
            maxzoom: 19,
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
          },
        ],
      },
      center: center,
      zoom: 6,
    });

    // Add zoom controls
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    // Add markers
    data.forEach((loc) => {
      if (!loc.latitude || !loc.longitude) return;

      // Create a DOM element for each marker.
      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundImage =
        'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="%233B82F6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>\')';
      el.style.width = "40px";
      el.style.height = "40px";
      el.style.backgroundSize = "100%";
      el.style.cursor = "pointer";

      // Create Popup
      const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
        `<div style="font-family: sans-serif; padding: 5px;">
           <h3 style="font-weight: bold; margin-bottom: 5px; color: #1f2937;">${loc.name
        }</h3>
           <p style="font-size: 12px; color: #6b7280;">${loc.address.substring(
          0,
          50
        )}...</p>
         </div>`
      );

      // Add marker to map
      new maplibregl.Marker({ element: el })
        .setLngLat([loc.longitude, loc.latitude])
        .setPopup(popup)
        .addTo(map.current!);
    });
  }, [data]);

  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden relative shadow-md border border-gray-100">
      <div ref={mapContainer} className="map-container w-full h-full" />
      <style>{`
            .maplibregl-popup-content {
                border-radius: 12px;
                padding: 12px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }
            .marker {
                transition: transform 0.2s;
            }
            .marker:hover {
                transform: scale(1.1);
            }
        `}</style>
    </div>
  );
};

const BloodBanks = () => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBloodBanks();
  }, []);

  const fetchBloodBanks = async () => {
    try {
      const response = await DonorAPI.getBloodBanks();
      setBloodBanks(response.data.data);
    } catch (error) {
      console.error("Failed to fetch blood banks", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif text-blue-600 font-medium">
          Blood banks near you
        </h1>

        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === "list"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900"
              }`}
          >
            <List className="w-4 h-4" />
            List View
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === "map"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900"
              }`}
          >
            <MapIcon className="w-4 h-4" />
            Map View
          </button>
        </div>
      </div>

      <div className="min-h-[500px]">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : viewMode === "list" ? (
          <BloodBankList data={bloodBanks} />
        ) : (
          <BloodBankMap data={bloodBanks} />
        )}
      </div>
    </div>
  );
};

export default BloodBanks;
