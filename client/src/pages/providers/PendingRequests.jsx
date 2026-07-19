import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Sidebar from "../../components/provider/Sidebar";
import Topbar from "../../components/provider/Topbar";
import PendingRequestCard from "../../components/provider/PendingRequestCard";

import {
  getPendingRequests,
  acceptRequest,
  rejectRequest,
} from "../../api/bookingApi";

import {
  getProviderProfile,
  updateProviderProfile,
} from "../../api/providerApi";

import socket from "../../socket/socket";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===========================
  // Initial Load + Socket Connect
  // ===========================

  useEffect(() => {
    fetchData();

    socket.connect();

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      socket.emit("join", user.id);
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  // ===========================
  // Listen New Requests
  // ===========================

  useEffect(() => {
    socket.on("newRequest", (request) => {
      console.log("New Request :", request);

      setRequests((prev) => {
        const alreadyExists = prev.find(
          (item) => item._id === request._id
        );

        if (alreadyExists) return prev;

        return [request, ...prev];
      });

      toast.success("New Service Request Received");
    });

    // Someone accepted request
    socket.on("requestAccepted", (requestId) => {
      setRequests((prev) =>
        prev.filter((item) => item._id !== requestId)
      );
    });

    // Someone rejected request
    socket.on("requestRejected", () => {
      fetchData();
    });

    return () => {
      socket.off("newRequest");
      socket.off("requestAccepted");
      socket.off("requestRejected");
    };
  }, []);

  // ===========================
  // Fetch Data
  // ===========================

  const fetchData = async () => {
    try {
      setLoading(true);

      const [requestRes, profileRes] = await Promise.all([
        getPendingRequests(),
        getProviderProfile(),
      ]);

      if (requestRes.success) {
        setRequests(requestRes.requests);
      }

      if (profileRes.success) {
        setProvider(profileRes.provider);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load pending requests");
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Accept
  // ===========================

  const handleAccept = async (requestId) => {
    try {
      const res = await acceptRequest(requestId);

      if (res.success) {
        toast.success(res.message);

        setRequests((prev) =>
          prev.filter((item) => item._id !== requestId)
        );

        socket.emit("requestAccepted", requestId);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed"
      );
    }
  };

  // ===========================
  // Reject
  // ===========================

  const handleReject = async (requestId) => {
    try {
      const res = await rejectRequest(requestId);

      if (res.success) {
        toast.success(res.message);

        setRequests((prev) =>
          prev.filter((item) => item._id !== requestId)
        );

        socket.emit("requestRejected", requestId);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to reject request"
      );
    }
  };

  // ===========================
  // Availability
  // ===========================

  const handleAvailability = async () => {
    try {
      const res = await updateProviderProfile({
        isAvailable: !provider.isAvailable,
      });

      if (res.success) {
        fetchData();
        toast.success("Availability Updated");
      }
    } catch (error) {
      toast.error("Unable to update availability");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 p-8">
        <Topbar
          provider={provider}
          isAvailable={provider?.isAvailable}
          onAvailabilityChange={handleAvailability}
        />

        <div className="mt-8">
          <h1 className="mb-6 text-3xl font-bold">
            Pending Requests
          </h1>

          {requests.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center text-gray-500 shadow">
              No Pending Requests
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {requests.map((request) => (
                <PendingRequestCard
                  key={request._id}
                  request={request}
                  onAccept={handleAccept}
                  onReject={handleReject}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingRequests;