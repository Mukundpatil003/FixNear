import { FiBell } from "react-icons/fi";

const Topbar = ({
  provider,
  isAvailable,
  onAvailabilityChange,
}) => {
  return (
    <header className="flex h-20 items-center justify-between rounded-3xl bg-white px-8 shadow-sm">

      {/* Left */}

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          Provider Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Welcome back 👋
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        {/* Availability */}

        <div className="flex items-center gap-3 rounded-full border px-5 py-3">

          <span className="text-sm font-semibold text-slate-600">
            Availability
          </span>

          <button
            onClick={onAvailabilityChange}
            className={`relative h-7 w-14 rounded-full transition ${
              isAvailable
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                isAvailable
                  ? "left-8"
                  : "left-1"
              }`}
            />
          </button>

        </div>

        {/* Notification */}

        <button className="relative rounded-full border p-3 hover:bg-slate-100">

          <FiBell size={22} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        {/* Provider */}

        <div className="flex items-center gap-4">

          <img
            src={
              provider?.profileImage ||
              "https://placehold.co/80x80?text=User"
            }
            alt="Provider"
            className="h-12 w-12 rounded-full object-cover"
          />

          <div>

            <h3 className="font-bold text-slate-900">
              {provider?.user?.name || "Provider"}
            </h3>

            <p className="text-sm text-slate-500">
              {provider?.service}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Topbar;