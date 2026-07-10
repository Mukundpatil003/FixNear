import AuthNavbar from "../components/auth/AuthNavbar";
import LoginBanner from "../components/auth/LoginBanner";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-white">

      <AuthNavbar />

      <main className="grid min-h-[calc(100vh-82px)] lg:grid-cols-2">

        <LoginBanner />

        <RegisterForm />

      </main>

    </div>
  );
};

export default Register;