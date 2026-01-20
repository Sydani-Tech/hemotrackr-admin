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

export const bloodBankRoutes = [
  {
    name: "Home",
    path: "/blood-bank/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Requests",
    path: "/blood-bank/requests",
    icon: FileText,
  },
  {
    name: "Donations",
    path: "/blood-bank/donations",
    icon: Droplets,
  },
  {
    name: "Messages",
    path: "/blood-bank/messages",
    icon: MessageCircle,
  },
  {
    name: "Feedback",
    path: "/blood-bank/feedback",
    icon: MessageSquare,
  },
  {
    name: "Notification",
    path: "/blood-bank/notifications",
    icon: Bell,
  },
  {
    name: "Profile",
    path: "/blood-bank/profile",
    icon: User,
    section: "secondary",
  },
  {
    name: "Settings",
    path: "/blood-bank/settings",
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
