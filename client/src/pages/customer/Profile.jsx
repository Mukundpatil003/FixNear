import { useEffect, useState } from "react";
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
      alert("Failed to load profile");
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

    // ⭐ Update Auth Context (Navbar updates instantly)
    updateUser({
      ...user,
      name: data.profile.name,
      email: data.profile.email,
      phone: data.profile.phone,
      location: data.profile.location,
      profileImage: data.profile.profileImage,
    });

    alert("Profile Updated Successfully");

  } catch (err) {
    console.error(err);
    alert("Failed to update profile");
  } finally {
    setSaving(false);
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          My Profile
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

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
    </div>
  );
};

export default Profile;