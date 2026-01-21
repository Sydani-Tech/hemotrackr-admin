import {
  Users,
  Building2,
  Droplet,
  MessageSquare,
  Bell,
  Package,
  UserCog,
  Settings,
  LogOut,
} from "lucide-react";

export const adminRoutes = [
  {
    name: "Users",
    path: "/admin/dashboard",
    icon: Users,
  },
  {
    name: "Health Facilities",
    path: "/admin/health-facilities",
    icon: Building2,
  },
  {
    name: "Blood Banks",
    path: "/admin/blood-banks",
    icon: Droplet,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: MessageSquare,
  },
  {
    name: "Notification",
    path: "/admin/notifications",
    icon: Bell,
  },
  {
    name: "Inventory",
    path: "/admin/inventory",
    icon: Package,
  },
  {
    name: "Roles",
    path: "/admin/roles",
    icon: UserCog,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
    section: "secondary",
  },
  {
    name: "Logout",
    path: "/auth/login",
    icon: LogOut,
    section: "secondary",
  },
];
