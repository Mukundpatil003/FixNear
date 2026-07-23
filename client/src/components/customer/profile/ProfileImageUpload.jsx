import { useState } from "react";
import { Camera } from "lucide-react";
import { uploadProfileImage } from "../../../services/customerProfileService";
import useAuth from "../../../hooks/useAuth";

const ProfileImageUpload = ({ profile, setProfile }) => {
  const [uploading, setUploading] = useState(false);

  const { user, updateUser } = useAuth();

  const handleImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploading(true);

      const data = await uploadProfileImage(file);

      // Update profile page
      const updatedProfile = {
        ...profile,
        profileImage: data.image,
      };

      setProfile(updatedProfile);

      // ⭐ Update Navbar & Auth Context
      updateUser({
        ...user,
        profileImage: data.image,
      });

    } catch (error) {
      console.error(error);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-xl font-semibold mb-6">
        Profile Picture
      </h2>

      <div className="flex flex-col items-center">

        <div className="relative">

          <img
            src={
              profile.profileImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                profile.name
              )}`
            }
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
          />

          <label
            htmlFor="profileImage"
            className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full cursor-pointer"
          >
            <Camera size={18} />
          </label>

          <input
            id="profileImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImage}
          />

        </div>

        {uploading && (
          <p className="mt-4 text-blue-600">
            Uploading...
          </p>
        )}

      </div>

    </div>
  );
};

export default ProfileImageUpload;