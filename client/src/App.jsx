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
import Dashboard from "./pages/providers/Dashboard";
import PendingRequests from "./pages/providers/PendingRequests";
import MyBookings from "./pages/providers/MyBookings";
import Profile from "./pages/providers/Profile";
import Notifications from "./pages/providers/Notifications";

// Service Request
import ServiceRequest from "./pages/service-request/ServiceRequest";

// Protected Route
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route
          path="/providers"
          element={<ProvidersResult />}
        />

        {/* Customer */}

        <Route
          path="/service-request"
          element={
            <ProtectedRoute
              roles={["customer", "provider"]}
            >
              <ServiceRequest />
            </ProtectedRoute>
          }
        />

        {/* Provider */}

        <Route
          path="/provider/dashboard"
          element={
            <ProtectedRoute
              roles={["provider"]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/provider/pending"
          element={
            <ProtectedRoute
              roles={["provider"]}
            >
              <PendingRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/provider/bookings"
          element={
            <ProtectedRoute
              roles={["provider"]}
            >
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/provider/profile"
          element={
            <ProtectedRoute
              roles={["provider"]}
            >
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/provider/notifications"
          element={
            <ProtectedRoute
              roles={["provider"]}
            >
              <Notifications />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;