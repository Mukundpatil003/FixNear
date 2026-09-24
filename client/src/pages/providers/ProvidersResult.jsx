import { useEffect, useState } from "react";
import socket from "../../socket/socket";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Users,
  Star,
  MapPin,
  BadgeCheck,
  ArrowLeft
} from "lucide-react";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
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
        setProviders(data.providers || []);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to load nearby service providers");
    } finally {
      setLoading(false);
    }
  };

  const filteredProviders = providers.filter((provider) => {
    const query = search.toLowerCase().trim();
    if (!query) return true;
    const matchesService = provider.service?.toLowerCase().includes(query);
    const matchesName = provider.user?.name?.toLowerCase().includes(query);
    const matchesDesc = provider.description?.toLowerCase().includes(query);
    return matchesService || matchesName || matchesDesc;
  });

  const popularServices = [
    "All Services",
    "Plumber",
    "Electrician",
    "Painter",
    "Carpenter",
    "Cleaner",
    "AC Repair",
    "Mechanic",
  ];

  return (
    <div className="min-h-screen bg-slate-50/70">
      <Navbar />

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Search
          </Link>

          {/* Header Banner */}
          <div className="mb-6 text-center sm:text-left flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                Verified Search Results
              </span>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                Available {service ? `${service}` : "Service"} Technicians
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Showing top-rated professionals nearby with live availability.
              </p>
            </div>

            {/* Quick Filter Search Bar for Services */}
            <div className="relative w-full lg:w-96">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by service (e.g. Plumber, Painter)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-slate-200/80 bg-white py-3 pl-10 pr-4 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Quick Service Category Filter Pills */}
          <div className="mb-8 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Filter Service:</span>
            {popularServices.map((srv) => {
              const isSelected =
                (srv === "All Services" && !search) ||
                search.toLowerCase() === srv.toLowerCase();
              return (
                <button
                  key={srv}
                  onClick={() => setSearch(srv === "All Services" ? "" : srv)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                  }`}
                >
                  {srv}
                </button>
              );
            })}
          </div>

          {/* Metrics Bar */}
          <div className="mb-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <Users className="text-blue-600 mb-2" size={20} />
              <p className="text-2xl font-black text-slate-900">{providers.length}</p>
              <p className="text-xs font-medium text-slate-400">Pros Nearby</p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <Star className="text-amber-400 fill-amber-400 mb-2" size={20} />
              <p className="text-2xl font-black text-slate-900">
                {providers.length
                  ? (
                      providers.reduce((a, b) => a + (b.rating || 0), 0) /
                      providers.length
                    ).toFixed(1)
                  : "5.0"}
              </p>
              <p className="text-xs font-medium text-slate-400">Avg Rating</p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <BadgeCheck className="text-emerald-500 mb-2" size={20} />
              <p className="text-2xl font-black text-slate-900">
                {providers.filter((p) => p.isAvailable).length}
              </p>
              <p className="text-xs font-medium text-slate-400">Online Right Now</p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <MapPin className="text-rose-500 mb-2" size={20} />
              <p className="text-2xl font-black text-slate-900">10 KM</p>
              <p className="text-xs font-medium text-slate-400">Search Radius</p>
            </div>
          </div>

          {loading && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-96 animate-pulse rounded-3xl bg-slate-200/70"
                />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="py-16 text-center text-sm font-bold text-rose-500 bg-white rounded-3xl border border-slate-200">
              {error}
            </div>
          )}

          {!loading && !error && filteredProviders.length === 0 && (
            <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-slate-200 p-8">
              <p className="text-base font-bold text-slate-700">No Service Providers Found</p>
              <p className="text-xs text-slate-400 mt-1">Try expanding your search parameters or check back in a few minutes.</p>
            </div>
          )}

          {!loading && !error && filteredProviders.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProviders.map((provider, index) => (
                <motion.div
                  key={provider._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
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

      <Footer />
    </div>
  );
};

export default ProvidersResult;