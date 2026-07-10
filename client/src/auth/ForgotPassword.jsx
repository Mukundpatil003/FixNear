import AuthNavbar from "../components/auth/AuthNavbar";
import LoginBanner from "../components/auth/LoginBanner";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}

      <AuthNavbar />

      {/* Main Section */}

      <main className="grid min-h-[calc(100vh-80px)] grid-cols-1 lg:grid-cols-[45%_55%]">

        {/* Left Side */}

        <LoginBanner />

        {/* Right Side */}

        <ForgotPasswordForm />

      </main>

    </div>
  );
};

export default ForgotPassword;