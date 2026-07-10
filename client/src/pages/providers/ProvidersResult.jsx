import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

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

  useEffect(() => {
    fetchProviders();
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

  return (
    <section className="min-h-screen bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-8">

        <div className="mb-12 text-center">

          <h1 className="text-5xl font-extrabold text-gray-900">
            Nearby Providers
          </h1>

          <p className="mt-4 text-lg text-gray-500">
            Service: <span className="font-semibold">{service}</span>
          </p>

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

            {providers.map((provider, index) => (

              <motion.div
                key={provider._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                }}
              >
                <ProviderCard provider={provider} />
              </motion.div>

            ))}

          </div>
        )}

      </div>
    </section>
  );
};

export default ProvidersResult;