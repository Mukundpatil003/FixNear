import { BrowserRouter, Routes, Route } from "react-router-dom";

// Home
import Home from "./pages/home/Home";

// Auth Pages
import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import VerifyOTP from "./auth/VerifyOTP";
import ResetPassword from "./auth/ResetPassword";

// Provider Pages
import ProvidersResult from "./pages/providers/ProvidersResult";

// Service Request
import ServiceRequest from "./pages/service-request/ServiceRequest";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Home */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* Login */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Forgot Password */}

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Verify OTP */}

        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />

        {/* Reset Password */}

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* Providers Result */}

        <Route
          path="/providers"
          element={<ProvidersResult />}
        />

        {/* Service Request */}

        <Route
          path="/service-request"
          element={<ServiceRequest />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;