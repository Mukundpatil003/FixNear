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
      console.log(data);

      if (data.success) {
        setRequests(data.requests);
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

  const matchesFilter =
    filter === "All" ||
    request.status === filter;

  const matchesSearch =
    request.service
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    request.problem
      .toLowerCase()
      .includes(search.toLowerCase());

  return matchesFilter && matchesSearch;
});


  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  if (!loading && requests.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-bold">
        No Requests Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-8 py-10">

        <h1 className="text-4xl font-bold">
          My Requests
        </h1>

        <p className="mt-3 text-xl text-gray-500">
          Track all your service requests in one place.
        </p>

        <StatsCards requests={requests} />

        <RequestFilters
  filter={filter}
  setFilter={setFilter}
  search={search}
  setSearch={setSearch}
/>

        <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-3">

          <div className="space-y-6 xl:col-span-2">

            
{filteredRequests.map((request) => (
  <RequestCard
    key={request._id}
    request={request}
    onClick={() => setSelectedRequest(request)}
  />
))}
          </div>

          <RequestDetails
  request={selectedRequest}
/>

        </div>

      </div>
    </div>
  );
};

export default MyRequests;