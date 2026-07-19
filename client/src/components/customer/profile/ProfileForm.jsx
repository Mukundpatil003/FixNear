const ProfileForm = ({
  profile,
  handleChange,
  handleSave,
  saving,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-8">
        Personal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Name */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={profile.name || ""}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Email
          </label>

          <input
            type="email"
            value={profile.email || ""}
            readOnly
            className="w-full border rounded-xl p-3 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={profile.phone || ""}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Location
          </label>

          <input
            type="text"
            name="location"
            value={profile.location || ""}
            onChange={handleChange}
            placeholder="Enter your location"
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">

        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-8 py-3 rounded-xl text-white font-semibold transition-all ${
            saving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </div>

    </div>
  );
};

export default ProfileForm;