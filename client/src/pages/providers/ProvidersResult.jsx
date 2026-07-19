import { useEffect, useState } from "react"
import socket from "../../socket/socket";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Users,
  Star,
  MapPin,
  BadgeCheck,
} from "lucide-react";

import { searchProviders } from "../../api/serviceRequestApi";
import ProviderCard from "../../components/home/Providers/ProviderCard";

const ProvidersResult = () => {
  const [searchParams] = useSearchParams();

  const service = searchParams.get("service");
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const [search, setSearch] = useState("");

useEffect(() => {

  socket.connect();

  return () => {

    socket.disconnect();

  };

}, []);

useEffect(() => {

  fetchProviders();

}, [service, latitude, longitude]);

useEffect(() => {

  socket.on("providerAvailabilityChanged", () => {

    console.log("Availability Changed");

    fetchProviders();

  });

  return () => {

    socket.off("providerAvailabilityChanged");

  };

}, []);

  const fetchProviders = async () => {
    try {
      setLoading(true);

      const data = await searchProviders({
        service,
        latitude,
        longitude,
      });

      if (data.success) {
        setProviders(data.providers);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to load nearby providers");
    } finally {
      setLoading(false);
    }
  };

  const filteredProviders = providers.filter((provider) =>
  provider.user?.name
    ?.toLowerCase()
    .includes(search.toLowerCase())
);

  return (
    <section className="min-h-screen bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-8">
<div className="mb-16">

  <motion.div

    initial={{ opacity: 0, y: -40 }}

    animate={{ opacity: 1, y: 0 }}

    className="text-center"

  >

    <h1 className="text-6xl font-black tracking-tight text-slate-900">

      Nearby {service}s

    </h1>

    <p className="mt-4 text-lg text-slate-500">

      Find trusted and verified professionals near you.

    </p>

  </motion.div>

  {/* Stats */}

  <div className="mt-12 grid gap-6 md:grid-cols-4">

    <div className="rounded-3xl bg-white p-6 shadow-md">

      <Users className="mb-3 text-indigo-600" />

      <h2 className="text-3xl font-bold">
        {providers.length}
      </h2>

      <p className="text-gray-500">
        Providers
      </p>

    </div>

    <div className="rounded-3xl bg-white p-6 shadow-md">

      <Star className="mb-3 text-yellow-500" />

      <h2 className="text-3xl font-bold">
        {providers.length
          ? (
              providers.reduce(
                (a, b) => a + (b.rating || 0),
                0
              ) / providers.length
            ).toFixed(1)
          : "0.0"}
      </h2>

      <p className="text-gray-500">
        Average Rating
      </p>

    </div>

    <div className="rounded-3xl bg-white p-6 shadow-md">

      <BadgeCheck className="mb-3 text-green-600" />

      <h2 className="text-3xl font-bold">
        {
          providers.filter(
            (p) => p.isAvailable
          ).length
        }
      </h2>

      <p className="text-gray-500">
        Available
      </p>

    </div>

    <div className="rounded-3xl bg-white p-6 shadow-md">

      <MapPin className="mb-3 text-red-500" />

      <h2 className="text-3xl font-bold">
        10 KM
      </h2>

      <p className="text-gray-500">
        Search Radius
      </p>

    </div>

  </div>

  {/* Search */}

  <div className="relative mt-10">

    <Search
      className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
      size={22}
    />

    <input
      type="text"
      placeholder="Search Provider..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="w-full rounded-2xl border bg-white py-4 pl-14 pr-5 text-lg shadow-sm outline-none focus:border-indigo-500"
    />

  </div>

</div>

        {loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[520px] animate-pulse rounded-3xl bg-gray-200"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="text-center text-xl font-semibold text-red-500">
            {error}
          </div>
        )}

        {!loading && !error && providers.length === 0 && (
          <div className="text-center text-xl text-gray-500">
            No Providers Found
          </div>
        )}

        {!loading && !error && providers.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

            {filteredProviders.map((provider, index) => (

              <motion.div
                key={provider._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                }}
              >
                <ProviderCard
    provider={provider}
    service={service}
    latitude={latitude}
    longitude={longitude}
/>
              </motion.div>

            ))}

          </div>
        )}

      </div>
    </section>
  );
};

export default ProvidersResult;