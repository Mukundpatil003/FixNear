import AuthNavbar from "../components/auth/AuthNavbar";
import LoginBanner from "../components/auth/LoginBanner";
import LoginForm from "../components/auth/LoginForm";
import Footer from "../components/layout/Footer";

const Login = () => {
  return (
    <div className="min-h-screen bg-white">

      <AuthNavbar />

      {/* Main */}

      <main className="grid min-h-[calc(100vh-80px)] grid-cols-1 lg:grid-cols-[45%_55%]">

        <LoginBanner />

        <LoginForm />

      </main>

      <Footer />

    </div>
  );
};

export default Login;