import AuthNavbar from "../components/auth/AuthNavbar";
import LoginBanner from "../components/auth/LoginBanner";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <div className="min-h-screen bg-white">

      <AuthNavbar />

      <main className="grid min-h-[calc(100vh-80px)] grid-cols-1 lg:grid-cols-[45%_55%]">

        <LoginBanner />

        <ResetPasswordForm />

      </main>

    </div>
  );
};

export default ResetPassword;