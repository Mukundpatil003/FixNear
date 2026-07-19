import { Outlet } from "react-router-dom";
import Sidebar from "../components/customer/Sidebar";

const CustomerLayout = () => {
  return (
    <div className="flex h-screen bg-[#F5F7FB]">

      {/* Sidebar */}

      <Sidebar />

      {/* Right Side */}

      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>

    </div>
  );
};

export default CustomerLayout;