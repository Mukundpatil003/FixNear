import { Outlet } from "react-router-dom";

import Sidebar from "../components/provider/Sidebar";
// import Topbar from "../components/provider/Topbar"; // change if your filename is different

const ProviderLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-72 min-h-screen">

        {/* <Topbar /> */}

        <main className="p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default ProviderLayout;