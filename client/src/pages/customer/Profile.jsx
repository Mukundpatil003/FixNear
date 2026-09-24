import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getProfile,
  updateProfile,
} from "../../services/customerProfileService";

import ProfileCard from "../../components/customer/profile/ProfileCard";
import ProfileImageUpload from "../../components/customer/profile/ProfileImageUpload";
import ProfileForm from "../../components/customer/profile/ProfileForm";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user, updateUser } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data.profile);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const data = await updateProfile(profile);
      setProfile(data.profile);

      updateUser({
        ...user,
        name: data.profile.name,
        email: data.profile.email,
        phone: data.profile.phone,
        location: data.profile.location,
        profileImage: data.profile.profileImage,
      });

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-xs font-bold text-slate-500">Loading Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
          Account Profile
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your personal information and contact preferences.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <ProfileCard profile={profile} />

        <div className="lg:col-span-2 space-y-6">
          <ProfileImageUpload
            profile={profile}
            setProfile={setProfile}
          />

          <ProfileForm
            profile={profile}
            handleChange={handleChange}
            handleSave={handleSave}
            saving={saving}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;