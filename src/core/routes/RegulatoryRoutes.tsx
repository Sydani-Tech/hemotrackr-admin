import {
  LayoutDashboard,
  FileText,
  Droplets,
  MessageCircle,
  ClipboardList,
  User,
  Settings,
  LogOut,
} from "lucide-react";

export const regulatoryRoutes = [
  {
    name: "Home",
    path: "/regulation/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Compliance",
    path: "/regulation/compliance",
    icon: FileText,
  },
  {
    name: "Blood Banks",
    path: "/regulation/blood-banks",
    icon: Droplets,
  },
  {
    name: "Messages",
    path: "/regulation/messages",
    icon: MessageCircle,
  },
  {
    name: "Inventory",
    path: "/regulation/inventory",
    icon: ClipboardList,
  },
  
  {
    name: "Profile",
    path: "/regulation/profile",
    icon: User,
    section: "secondary",
  },
  {
    name: "Settings",
    path: "/regulation/settings",
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
