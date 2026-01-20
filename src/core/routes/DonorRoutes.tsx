import {
  LayoutGrid,
  FileText,
  Droplet,
  MessageSquare,
  MessageCircle,
  Bell,
  User,
  Settings,
  LogOut,
} from "lucide-react";

export const donorRoutes = [
  {
    path: "/donor/dashboard",
    name: "Home",
    icon: LayoutGrid,
  },
  {
    path: "/donor/requests",
    name: "Requests",
    icon: FileText,
  },
  {
    path: "/donor/blood-banks",
    name: "Blood Banks",
    icon: Droplet,
  },
  {
    path: "/donor/messages",
    name: "Messages",
    icon: MessageSquare,
  },
  {
    path: "/donor/feedback",
    name: "Feedback",
    icon: MessageCircle,
  },
  {
    path: "/donor/notifications",
    name: "Notification",
    icon: Bell,
  },
  // Divider usually handled in component, but defining items here
  {
    path: "/donor/profile",
    name: "Profile",
    icon: User,
    section: "secondary",
  },
  {
    path: "/donor/settings",
    name: "Settings",
    icon: Settings,
    section: "secondary",
  },
  {
    path: "/auth/login",
    name: "Logout",
    icon: LogOut,
    section: "secondary",
    action: "logout",
  },
];
