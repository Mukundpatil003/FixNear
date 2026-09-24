import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";

const ProfileCard = ({ profile }) => {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col items-center text-center">
      <div className="relative">
        <img
          src={
            profile.profileImage ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || "Customer")}&background=2563eb&color=fff`
          }
          alt="Profile"
          className="h-32 w-32 rounded-full object-cover border-4 border-blue-100 shadow-md"
        />
        <div className="absolute bottom-1 right-1 rounded-full bg-blue-600 p-1.5 text-white shadow-md">
          <ShieldCheck size={16} />
        </div>
      </div>

      <h2 className="mt-4 text-xl font-bold text-slate-900">{profile.name}</h2>
      <span className="mt-1 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 uppercase tracking-wider">
        {profile.role || "Customer"}
      </span>

      <div className="w-full mt-6 space-y-3 border-t border-slate-100 pt-5 text-xs text-slate-600 text-left">
        <div className="flex items-center gap-3">
          <Mail size={16} className="text-blue-600 flex-shrink-0" />
          <span className="truncate">{profile.email}</span>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={16} className="text-emerald-600 flex-shrink-0" />
          <span>{profile.phone || "No phone added"}</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin size={16} className="text-rose-500 flex-shrink-0" />
          <span className="truncate">{profile.location || "Location not set"}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;