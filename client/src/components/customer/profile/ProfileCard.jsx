import { Mail, Phone, MapPin } from "lucide-react";

const ProfileCard = ({ profile }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center">
      <img
        src={
          profile.profileImage ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}`
        }
        alt="Profile"
        className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
      />

      <h2 className="mt-5 text-2xl font-bold">{profile.name}</h2>

      <span className="mt-2 px-4 py-1 rounded-full bg-blue-100 text-blue-700 capitalize">
        {profile.role}
      </span>

      <div className="w-full mt-8 space-y-4">
        <div className="flex items-center gap-3">
          <Mail size={18} />
          <span>{profile.email}</span>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={18} />
          <span>{profile.phone}</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin size={18} />
          <span>{profile.location || "Not Added"}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;