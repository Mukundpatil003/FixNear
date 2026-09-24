import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

  useEffect(() => {
    socket.on("newRequest", (request) => {
      setRequests((prev) => {
        const alreadyExists = prev.find((item) => item._id === request._id);
        if (alreadyExists) return prev;
        return [request, ...prev];
      });

      toast.success("🔔 New Service Request Received!");
    });

    socket.on("requestAccepted", (requestId) => {
      setRequests((prev) => prev.filter((item) => item._id !== requestId));
    });

    socket.on("requestRejected", () => {
      fetchData();
    });

    return () => {
      socket.off("newRequest");
      socket.off("requestAccepted");
      socket.off("requestRejected");
    };
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [requestRes, profileRes] = await Promise.all([
        getPendingRequests(),
        getProviderProfile(),
      ]);

      if (requestRes.success) {
        setRequests(requestRes.requests || []);
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

  const handleAccept = async (requestId) => {
    try {
      const res = await acceptRequest(requestId);

      if (res.success) {
        toast.success(res.message || "Request accepted!");
        setRequests((prev) => prev.filter((item) => item._id !== requestId));
        socket.emit("requestAccepted", requestId);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to accept request");
    }
  };

  const handleReject = async (requestId) => {
    try {
      const res = await rejectRequest(requestId);

      if (res.success) {
        toast.success(res.message || "Request declined");
        setRequests((prev) => prev.filter((item) => item._id !== requestId));
        socket.emit("requestRejected", requestId);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to decline request");
    }
  };

  const handleAvailability = async () => {
    try {
      const res = await updateProviderProfile({
        isAvailable: !provider.isAvailable,
      });

      if (res.success) {
        fetchData();
        toast.success("Availability status updated");
      }
    } catch (error) {
      toast.error("Unable to update availability");
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-xs font-bold text-slate-500">Checking pending requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Topbar
        provider={provider}
        isAvailable={provider?.isAvailable}
        onAvailabilityChange={handleAvailability}
      />

      <div className="pt-2">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Pending Job Requests
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Review and accept incoming customer requests near your location.
            </p>
          </div>

          <span className="rounded-full bg-blue-50 border border-blue-200 px-3.5 py-1.5 text-xs font-bold text-blue-600">
            {requests.length} Requests Pending
          </span>
        </div>

        {requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
            <p className="text-sm font-bold text-slate-700">No Pending Requests</p>
            <p className="text-xs text-slate-400 mt-1">Make sure your status is toggled ON to receive live customer requests.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
  );
};

export default PendingRequests;