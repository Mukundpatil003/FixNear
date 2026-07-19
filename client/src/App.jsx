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
import CustomerDashboard from "./pages/customer/Dashboard";
import PendingRequests from "./pages/providers/PendingRequests";
import MyBookings from "./pages/providers/MyBookings";
import Profile from "./pages/providers/Profile";
import Notifications from "./pages/providers/Notifications";

// Service Request
import ServiceRequest from "./pages/service-request/ServiceRequest";

// Protected Route
import ProtectedRoute from "./routes/ProtectedRoute";
import BecomeProvider from "./pages/providers/BecomeProvider";
import CreateRequest from "./pages/service-request/CreateRequest";
import MyRequests from "./pages/customer/MyRequests";
import TrackProvider from "./pages/customer/TrackProvider";
import CustomerProfile from "./pages/customer/Profile";
import CustomerLayout from "./layouts/CustomerLayout";
import CustomerBookings from "./pages/customer/MyBookings";
import BookingDetails from "./pages/customer/BookingDetails";
import NearbyProviders from "./pages/customer/NearbyProviders";
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
      roles={["customer"]}
    >
      <CreateRequest />
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
              <ProviderDashboard />
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
        
        <Route
  path="/become-provider"
  element={
    <ProtectedRoute roles={["customer"]}>
      <BecomeProvider />
    </ProtectedRoute>
  }
/>

{/* <Route
  path="/my-requests"
  element={
    <ProtectedRoute roles={["customer"]}>
      <MyRequests />
    </ProtectedRoute>
  }
/> */}

{/* 
<Route
  path="/track/:bookingId"
  element={
    <ProtectedRoute roles={["customer"]}>
      <TrackProvider />
    </ProtectedRoute>
  }
/> */}


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
{/* 
  <Route
    path="/customer/notifications"
    element={<CustomerNotifications />}
  /> */}

  <Route
    path="/track/:bookingId"
    element={<TrackProvider />}
  />

  <Route
  path="/customer/bookings/:bookingId"
  element={<BookingDetails />}
/>
  <Route
    path="/customer/providers"
    element={<NearbyProviders />}
  />

</Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;