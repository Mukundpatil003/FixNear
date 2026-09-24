import { useState } from "react";
import { Camera } from "lucide-react";
import { uploadProfileImage } from "../../../services/customerProfileService";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const ProfileImageUpload = ({ profile, setProfile }) => {
  const [uploading, setUploading] = useState(false);
  const { user, updateUser } = useAuth();

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const data = await uploadProfileImage(file);

      const updatedProfile = {
        ...profile,
        profileImage: data.image,
      };

      setProfile(updatedProfile);

      updateUser({
        ...user,
        profileImage: data.image,
      });

      toast.success("Profile photo updated!");
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <h2 className="text-base font-bold text-slate-900 mb-4">
        Profile Avatar
      </h2>

      <div className="flex flex-col items-center sm:flex-row sm:items-center gap-6">
        <div className="relative">
          <img
            src={
              profile.profileImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                profile.name || "User"
              )}&background=2563eb&color=fff`
            }
            alt="Profile"
            className="h-28 w-28 rounded-full object-cover border-4 border-blue-100 shadow-md"
          />

          <label
            htmlFor="profileImage"
            className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-full cursor-pointer shadow-md transition-transform hover:scale-105"
          >
            <Camera size={16} />
          </label>

          <input
            id="profileImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImage}
          />
        </div>

        <div className="text-center sm:text-left space-y-1">
          <p className="text-xs font-bold text-slate-800">Upload new avatar</p>
          <p className="text-[11px] text-slate-400">JPG, PNG or WEBP formats supported.</p>
          {uploading && (
            <p className="text-xs font-bold text-blue-600 animate-pulse mt-2">
              Uploading photo...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUpload;