import { NavLink, useLocation } from "react-router-dom";
import { hospitalRoutes } from "../../../core/routes/HospitalRoutes";
import { cn } from "../../../lib/utils";
import { useLogout } from "../../../core/hooks/useAuthQueries";
import { X } from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const { mutate: logout, isPending } = useLogout();

  const primaryRoutes = hospitalRoutes.filter((route) => !route.section);
  const secondaryRoutes = hospitalRoutes.filter(
    (route) => route.section === "secondary",
  );

  const handleLinkClick = () => {
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  const NavItem = ({ route }: { route: any }) => {
    const isActive =
      location.pathname === route.path ||
      (route.path === "/hospital/dashboard" &&
        location.pathname === "/hospital");

    if (route.name === "Logout") {
      return (
        <button
          onClick={() => {
            handleLinkClick();
            logout();
          }}
          disabled={isPending}
          className={cn(
            "flex w-full items-center gap-3 px-4 py-3 text-sm font-medium rounded-r-full transition-colors",
            "text-red-500 hover:bg-red-50",
            isPending && "opacity-50 cursor-not-allowed",
          )}
        >
          <route.icon className="w-5 h-5" />
          {isPending ? "Logging out..." : route.name}
        </button>
      );
    }

    return (
      <NavLink
        to={route.path}
        onClick={handleLinkClick}
        className={({ isActive: navLinkIsActive }) =>
          cn(
            "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-r-full transition-colors",
            "hover:bg-gray-50 hover:text-gray-900",
            isActive || navLinkIsActive
              ? "bg-[#FFD600] text-gray-900 font-semibold"
              : "text-gray-500",
          )
        }
      >
        <route.icon
          className={cn(
            "w-5 h-5",
            isActive ? "text-gray-900" : "text-blue-500",
          )}
        />
        {route.name}
      </NavLink>
    );
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={cn(
          "w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 bottom-0 z-50 transition-transform duration-300 lg:translate-x-0 shadow-xl lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo Area */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">💧</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              HemoTracka
            </span>
          </div>
          {/* Close Button Mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 py-6 overflow-y-auto">
          <div className="px-6 mb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Dashboard
            </p>
          </div>

          <div className="space-y-1 pr-4">
            {primaryRoutes.map((route) => (
              <NavItem key={route.path} route={route} />
            ))}
          </div>

          <div className="my-6 border-t border-gray-100 w-full"></div>

          <div className="space-y-1 pr-4">
            {secondaryRoutes.map((route) => (
              <NavItem key={route.path} route={route} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
