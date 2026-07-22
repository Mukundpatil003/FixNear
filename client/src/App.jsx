import { BrowserRouter, Routes, Route } from "react-router-dom";

// Home
import Home from "./pages/home/Home";

// Auth
import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import VerifyOTP from "./auth/VerifyOTP";
import ResetPassword from "./auth/ResetPassword";

// Provider Pages
import ProvidersResult from "./pages/providers/ProvidersResult";
import ProviderDashboard from "./pages/providers/Dashboard";
import PendingRequests from "./pages/providers/PendingRequests";
import MyBookings from "./pages/providers/MyBookings";
import Profile from "./pages/providers/Profile";
import Notifications from "./pages/providers/Notifications";
import BecomeProvider from "./pages/providers/BecomeProvider";

// Customer Pages
import CustomerDashboard from "./pages/customer/Dashboard";
import CustomerProfile from "./pages/customer/Profile";
import MyRequests from "./pages/customer/MyRequests";
import CustomerBookings from "./pages/customer/MyBookings";
import BookingDetails from "./pages/customer/BookingDetails";
import NearbyProviders from "./pages/customer/NearbyProviders";
import NotificationPage from "./pages/customer/NotificationPage";
import Reviews from "./pages/customer/Reviews";
import TrackProvider from "./pages/customer/TrackProvider";

// Service Request
import CreateRequest from "./pages/service-request/CreateRequest";

// Layout
import CustomerLayout from "./layouts/CustomerLayout";

// Protected Route
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/verify-otp" element={<VerifyOTP />} />

        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/providers" element={<ProvidersResult />} />

        {/* ================= CUSTOMER ================= */}

        <Route
          path="/service-request"
          element={
            <ProtectedRoute roles={["customer"]}>
              <CreateRequest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/become-provider"
          element={
            <ProtectedRoute roles={["customer"]}>
              <BecomeProvider />
            </ProtectedRoute>
          }
        />

        {/* ================= PROVIDER ================= */}

        <Route
          path="/provider/dashboard"
          element={
            <ProtectedRoute roles={["provider"]}>
              <ProviderDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/provider/pending"
          element={
            <ProtectedRoute roles={["provider"]}>
              <PendingRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/provider/bookings"
          element={
            <ProtectedRoute roles={["provider"]}>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/provider/profile"
          element={
            <ProtectedRoute roles={["provider"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/provider/notifications"
          element={
            <ProtectedRoute roles={["provider"]}>
              <Notifications />
            </ProtectedRoute>
          }
        />

        {/* ================= CUSTOMER DASHBOARD ================= */}

        <Route
          element={
            <ProtectedRoute roles={["customer"]}>
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/customer/dashboard"
            element={<CustomerDashboard />}
          />

          <Route
            path="/customer/profile"
            element={<CustomerProfile />}
          />

          <Route
            path="/customer/my-requests"
            element={<MyRequests />}
          />

          <Route
            path="/customer/bookings"
            element={<CustomerBookings />}
          />

          <Route
            path="/customer/bookings/:bookingId"
            element={<BookingDetails />}
          />

          <Route
            path="/customer/providers"
            element={<NearbyProviders />}
          />

          <Route
            path="/customer/notifications"
            element={<NotificationPage />}
          />

          <Route
            path="/customer/reviews"
            element={<Reviews />}
          />

          <Route
            path="/track/:bookingId"
            element={<TrackProvider />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;