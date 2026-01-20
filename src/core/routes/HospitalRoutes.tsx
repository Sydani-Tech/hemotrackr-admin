import {
  LayoutDashboard,
  FileText,
  Droplets,
  MessageCircle,
  MessageSquare,
  Bell,
  User,
  Settings,
  LogOut,
} from "lucide-react";

export const hospitalRoutes = [
  {
    name: "Home",
    path: "/hospital/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Requests",
    path: "/hospital/requests",
    icon: FileText,
  },
  {
    name: "Donations",
    path: "/hospital/donations",
    icon: Droplets,
  },
  {
    name: "Messages",
    path: "/hospital/messages",
    icon: MessageCircle,
  },
  {
    name: "Feedback",
    path: "/hospital/feedback",
    icon: MessageSquare,
  },
  {
    name: "Notification",
    path: "/hospital/notifications",
    icon: Bell,
  },
  {
    name: "Profile",
    path: "/hospital/profile",
    icon: User,
    section: "secondary",
  },
  {
    name: "Settings",
    path: "/hospital/settings",
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
