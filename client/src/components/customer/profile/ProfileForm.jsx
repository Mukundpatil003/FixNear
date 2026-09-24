const ProfileForm = ({
  profile,
  handleChange,
  handleSave,
  saving,
}) => {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900 mb-6">
        Personal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-5 text-xs">
        {/* Name */}
        <div>
          <label className="block mb-2 font-bold uppercase tracking-wider text-slate-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={profile.name || ""}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3.5 font-semibold text-slate-800 outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-bold uppercase tracking-wider text-slate-700">
            Email Address
          </label>
          <input
            type="email"
            value={profile.email || ""}
            readOnly
            className="w-full rounded-2xl border border-slate-200 bg-slate-100 p-3.5 font-semibold text-slate-500 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 font-bold uppercase tracking-wider text-slate-700">
            Mobile Number
          </label>
          <input
            type="text"
            name="phone"
            value={profile.phone || ""}
            onChange={handleChange}
            placeholder="+91 9876543210"
            className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3.5 font-semibold text-slate-800 outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-2 font-bold uppercase tracking-wider text-slate-700">
            City / Location
          </label>
          <input
            type="text"
            name="location"
            value={profile.location || ""}
            onChange={handleChange}
            placeholder="Enter your area / city"
            className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3.5 font-semibold text-slate-800 outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-7 py-3 rounded-2xl text-xs font-bold text-white shadow-md transition-all cursor-pointer ${
            saving
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20 hover:shadow-lg"
          }`}
        >
          {saving ? "Saving Changes..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;