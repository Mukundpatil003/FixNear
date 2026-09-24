import { useEffect, useState } from "react";
import StatsCards from "../../components/customer/StatsCards";
import RequestFilters from "../../components/customer/RequestFilters";
import RequestCard from "../../components/customer/RequestCard";
import RequestDetails from "../../components/customer/RequestDetails";
import { getMyRequests } from "../../api/serviceRequestApi";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fetchRequests = async () => {
    try {
      const data = await getMyRequests();
      if (data.success) {
        setRequests(data.requests);
        if (data.requests.length > 0) {
          setSelectedRequest(data.requests[0]);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filteredRequests = requests.filter((request) => {
    const matchesFilter = filter === "All" || request.status === filter;
    const matchesSearch =
      request.service?.toLowerCase().includes(search.toLowerCase()) ||
      request.problem?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-xs font-bold text-slate-500">Loading requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
          My Service Requests
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor request statuses, track technician arrival, and view job details.
        </p>
      </div>

      {/* Stats Summary */}
      <StatsCards requests={requests} />

      {/* Filters and Search */}
      <RequestFilters
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7 xl:col-span-8">
          {filteredRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
              <p className="text-sm font-bold text-slate-600">No requests found</p>
              <p className="text-xs text-slate-400 mt-1">Try changing your search query or filter tab.</p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <RequestCard
                key={request._id}
                request={request}
                onClick={() => setSelectedRequest(request)}
              />
            ))
          )}
        </div>

        <div className="lg:col-span-5 xl:col-span-4">
          <RequestDetails request={selectedRequest} />
        </div>
      </div>
    </div>
  );
};

export default MyRequests;