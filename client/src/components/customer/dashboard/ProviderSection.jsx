import ProviderCard from "./ProviderCard";

const ProviderSection = ({ providers = [] }) => {
  return (
    <section className="mt-16">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-[42px] font-bold text-slate-900">
            Top Rated Providers
          </h2>

          <p className="mt-2 text-slate-500">
            Best professionals near you
          </p>

        </div>

      </div>

      {providers.length === 0 ? (

        <div className="rounded-[30px] bg-white py-20 text-center shadow">

          No Providers Found

        </div>

      ) : (

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {providers.map((provider) => (

            <ProviderCard
              key={provider._id}
              provider={provider}
            />

          ))}

        </div>

      )}

    </section>
  );
};

export default ProviderSection;