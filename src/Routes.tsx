import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./core/provider/AuthProvider";
import { AppQueryProvider } from "./core/provider/AppQueryProvider";
import AuthLayout from "./features/auth/AuthLayout";
import authRoutes from "./core/routes/AuthRoutes";
// import Register from "./features/auth/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./features/donor/pages/Home";
import BloodBanks from "./features/donor/pages/BloodBanks";
import BloodBankDetails from "./features/donor/pages/BloodBankDetails";
import ScheduleDonation from "./features/donor/pages/ScheduleDonation";
import Feedback from "./features/donor/pages/Feedback";
import ProfileLayout from "./features/donor/components/ProfileLayout";
import Profile from "./features/donor/pages/Profile";
import MedicalRecord from "./features/donor/pages/MedicalRecord";
import DonationHistory from "./features/donor/pages/DonationHistory";
import AccountSupport from "./features/donor/pages/AccountSupport";

import Requests from "./features/donor/pages/Requests";
import Messages from "./features/donor/pages/Messages";

// Blood Bank Imports
import BloodBankLayout from "./features/blood-bank/layouts/DashboardLayout";
import BloodBankHome from "./features/blood-bank/pages/Home";
import MakeRequest from "./features/blood-bank/pages/MakeRequest";
import BloodBankRequests from "./features/blood-bank/pages/Requests";
import BloodBankDonations from "./features/blood-bank/pages/Donations";
import TrackRequests from "./features/blood-bank/pages/TrackRequests";
import FeebackPage from "./features/blood-bank/pages/FeebackPage";
import UpdateDonor from "./features/blood-bank/pages/UpdateDonor";
import UpdateDonorDetails from "./features/blood-bank/pages/UpdateDonorDetails";
import AppointmentHistory from "./features/blood-bank/pages/AppointmentHistory";
import AllRequests from "./features/blood-bank/pages/AllRequests";
import InventoryPage from "./features/blood-bank/pages/InventoryPage";
import BloodBankProfile from "./features/blood-bank/pages/Profile";
import HospitalRequests from "./features/blood-bank/pages/hospital-requests/HospitalRequests";
import Riders from "./features/blood-bank/pages/hospital-requests/Riders";

// Hospital Imports
import HospitalLayout from "./features/hospital/layouts/DashboardLayout";
import HospitalHome from "./features/hospital/pages/Home";
import HospitalRequestsPage from "./features/hospital/pages/Requests";
import HospitalFeedback from "./features/hospital/pages/Feedback";
import HospitalProfile from "./features/hospital/pages/Profile";
import HospitalSupport from "./features/hospital/pages/AccountSupport";
import HospitalMessages from "./features/hospital/pages/Messages";
import HospitalDonations from "./features/hospital/pages/Donations";
import HospitalProfileLayout from "./features/hospital/components/ProfileLayout";
import RegulatoryBodyLayout from "./features/reulatory-body/layouts/RegulatoryBodyLayout";
import RegulatoryBodyHome from "./features/reulatory-body/pages/RegulatoryBodyHome";
import RegulatoryBodyCompliance from "./features/reulatory-body/pages/RegulatoryBodyCompliance";
import RegulatoryBodyBloodBanks from "./features/reulatory-body/pages/RegulatoryBodyBloodBanks";
import RegulatoryBodyFacilityList from "./features/reulatory-body/pages/RegulatoryBodyFacilityList";
import RegulatoryBodyMessages from "./features/reulatory-body/pages/RegulatoryBodyMessages";
import RegulatoryBodyInventory from "./features/reulatory-body/pages/RegulatoryBodyInventory";
import RegulatoryBodyProfile from "./features/reulatory-body/pages/RegulatoryBodyProfile";
import RegulatoryBodyEditProfile from "./features/reulatory-body/pages/RegulatoryBodyEditProfile";
import RegulatoryBodySettings from "./features/reulatory-body/pages/RegulatoryBodySettings";
import { ProtectedRoute } from "./core/routes/ProtectedRoute";
import { PublicRoute } from "./core/routes/PublicRoute";

// Services (for loaders)
import { bloodBankDashboardLoader } from "./core/services/blood-bank/blood-bank-dashboard.loader";
import AdminLayout from "./features/admin/layouts/AdminLayout";
import AdminHome from "./features/admin/pages/Home";
import HealthFacilities from "./features/admin/pages/HealthFacilities";
import FacilityDetails from "./features/admin/pages/FacilityDetails";
import AdminBloodBanks from "./features/admin/pages/AdminBloodBanks";
import AdminMessages from "./features/admin/pages/AdminMessages";
import AdminInventory from "./features/admin/pages/AdminInventory";
import AdminInventoryDetails from "./features/admin/pages/AdminInventoryDetails";
import AdminSettings from "./features/admin/pages/AdminSettings";

// AuthWrapper component to ensure AuthProvider is inside the Router context
const AuthWrapper = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

const router = createBrowserRouter([
  {
    element: <AuthWrapper />,
    children: [
      {
        path: "/",
        element: <Navigate to="/auth/register" />,
      },
      {
        path: "/auth",
        element: <PublicRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              { index: true, element: <Navigate to="login" /> },
              // { path: "register", element: <Register /> }, // Already in authRoutes
              ...authRoutes.map(({ component: Component, route }) => ({
                path: route,
                element: <Component />,
              })),
            ],
          },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={["donor"]} />,
        children: [
          {
            path: "/donor",
            element: <DashboardLayout />,
            children: [
              { index: true, element: <Navigate to="dashboard" /> },
              {
                path: "dashboard",
                element: <Home />,
                // loader: donorDashboardLoader,
              },
              { path: "requests", element: <Requests /> },
              { path: "messages", element: <Messages /> },
              { path: "blood-banks", element: <BloodBanks /> },
              { path: "blood-banks/:id", element: <BloodBankDetails /> },
              {
                path: "blood-banks/:id/schedule",
                element: <ScheduleDonation />,
              },
              {
                path: "appointments/create/:id",
                element: <ScheduleDonation />,
              },
              {
                path: "donations",
                element: <DonationHistory />,
              },
              { path: "feedback", element: <Feedback /> },
              {
                path: "profile",
                element: <ProfileLayout />,
                children: [
                  { index: true, element: <Profile /> },
                  { path: "medical-record", element: <MedicalRecord /> },
                  { path: "history", element: <DonationHistory /> },
                  { path: "support", element: <AccountSupport /> },
                ],
              },
              {
                path: "settings",
                element: <Navigate to="profile/support" />,
              },
              {
                path: "*",
                element: <div className="p-4">Page under construction</div>,
              },
            ],
          },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={["blood_banks"]} />,
        children: [
          {
            path: "/blood-bank",
            element: <BloodBankLayout />,
            children: [
              { index: true, element: <Navigate to="dashboard" /> },
              {
                path: "dashboard",
                element: <BloodBankHome />,
                loader: bloodBankDashboardLoader,
              },
              { path: "make-request", element: <MakeRequest /> },
              { path: "requests/status", element: <BloodBankRequests /> },
              { path: "donations", element: <BloodBankDonations /> },
              { path: "requests", element: <TrackRequests /> },
              { path: "messages", element: <Messages /> },
              { path: "feedback", element: <FeebackPage /> },
              { path: "update-donor", element: <UpdateDonor /> },
              { path: "update-donor/:id", element: <UpdateDonorDetails /> },
              { path: "appointment-history", element: <AppointmentHistory /> },
              { path: "all-requests", element: <AllRequests /> },
              { path: "inventory", element: <InventoryPage /> },
              { path: "profile", element: <BloodBankProfile /> },
              { path: "hospital-requests", element: <HospitalRequests /> },
              { path: "hospital-requests/riders", element: <Riders /> },
              { path: "riders", element: <Riders /> },
              {
                path: "*",
                element: <div className="p-4">Page under construction</div>,
              },
            ],
          },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={["facilities"]} />,
        children: [
          {
            path: "/hospital",
            element: <HospitalLayout />,
            children: [
              { index: true, element: <Navigate to="dashboard" /> },
              {
                path: "dashboard",
                element: <HospitalHome />,
                // loader: hospitalDashboardLoader,
              },
              { path: "requests", element: <HospitalRequestsPage /> },
              { path: "donations", element: <HospitalDonations /> },
              { path: "messages", element: <HospitalMessages /> },
              { path: "feedback", element: <HospitalFeedback /> },
              {
                path: "profile",
                element: <HospitalProfileLayout />,
                children: [
                  { index: true, element: <HospitalProfile /> },
                  { path: "support", element: <HospitalSupport /> },
                ],
              },
              {
                path: "*",
                element: <div className="p-4">Page under construction</div>,
              },
            ],
          },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={["regulatory_body"]} />,
        children: [
          {
            path: "/regulation",
            element: <RegulatoryBodyLayout />,
            children: [
              { index: true, element: <Navigate to="dashboard" /> },
              {
                path: "dashboard",
                element: <RegulatoryBodyHome />,
              },
              { path: "compliance", element: <RegulatoryBodyCompliance /> },
              { path: "blood-banks", element: <RegulatoryBodyBloodBanks /> },
              { path: "facilities", element: <RegulatoryBodyFacilityList /> },
              { path: "messages", element: <RegulatoryBodyMessages /> },
              { path: "inventory", element: <RegulatoryBodyInventory /> },
              { path: "profile", element: <RegulatoryBodyProfile /> },
              {
                path: "profile/edit",
                element: <RegulatoryBodyEditProfile />,
              },
              { path: "settings", element: <RegulatoryBodySettings /> },
              {
                path: "*",
                element: <div className="p-4">Page under construction</div>,
              },
            ],
          },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "/admin",
            element: <AdminLayout />,
            children: [
              { index: true, element: <Navigate to="dashboard" /> },
              {
                path: "dashboard",
                element: <AdminHome />,
              },
              { path: "health-facilities", element: <HealthFacilities /> },
              { path: "health-facilities/:id", element: <FacilityDetails /> },
              { path: "blood-banks", element: <AdminBloodBanks /> },
              { path: "blood-banks/:id", element: <FacilityDetails /> },
              { path: "messages", element: <AdminMessages /> },
              { path: "inventory", element: <AdminInventory /> },
              { path: "inventory/:id", element: <AdminInventoryDetails /> },
              { path: "settings", element: <AdminSettings /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default function AppRoutes() {
  return (
    <AppQueryProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AppQueryProvider>
  );
}
