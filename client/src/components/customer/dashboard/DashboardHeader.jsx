import SearchBar from "./SearchBar";
import useAuth from "../../../hooks/useAuth";

const DashboardHeader = () => {
  const { user } = useAuth();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

      {/* Left */}

      <div>

        <h1 className="text-[46px] font-extrabold leading-tight text-slate-900">
          👋 {greeting} {user?.name || "Customer"}
        </h1>

        <p className="mt-3 text-xl text-slate-500">
          Your home is in good hands today.
        </p>

      </div>

      {/* Right */}

      <SearchBar />

    </div>
  );
};

export default DashboardHeader;