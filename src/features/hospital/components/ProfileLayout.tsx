import { NavLink, Outlet } from "react-router-dom";
import { cn } from "../../../lib/utils";

const HospitalProfileLayout = () => {
  const tabs = [
    { name: "Overview", path: "/hospital/profile", end: true },
    { name: "Settings", path: "/hospital/profile/settings" },
    { name: "Support", path: "/hospital/profile/support" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm p-2 flex justify-between items-center px-12">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            end={tab.end}
            className={({ isActive }) =>
              cn(
                "px-8 py-2 rounded-md font-bold text-sm transition-colors relative",
                isActive
                  ? "text-gray-900 bg-[#FFD600]"
                  : "text-gray-400 hover:text-gray-600 hover:bg-[#FFD600]"
              )
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  );
};

export default HospitalProfileLayout;
