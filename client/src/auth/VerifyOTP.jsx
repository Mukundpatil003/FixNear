import AuthNavbar from "../components/auth/AuthNavbar";
import LoginBanner from "../components/auth/LoginBanner";
import OTPForm from "../components/auth/OTPForm";

const VerifyOTP = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}

      <AuthNavbar />

      {/* Main */}

      <main className="grid min-h-[calc(100vh-80px)] grid-cols-1 lg:grid-cols-[45%_55%]">

        {/* Left */}

        <LoginBanner />

        {/* Right */}

        <OTPForm />

      </main>

    </div>
  );
};

export default VerifyOTP;