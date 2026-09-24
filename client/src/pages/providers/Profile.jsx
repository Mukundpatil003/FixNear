import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Topbar from "../../components/provider/Topbar";
import { getProviderProfile, updateProviderProfile } from "../../api/providerApi";
import { uploadImage } from "../../api/uploadApi";
import { FaCamera } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    service: "",
    experience: "",
    phone: "",
    address: "",
    pricePerHour: "",
    description: "",
    isAvailable: true,
  });

  const { updateUser } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProviderProfile();

      if (res.success) {
        setProvider(res.provider);
        setForm({
          service: res.provider.service || "",
          experience: res.provider.experience || "",
          phone: res.provider.phone || "",
          address: res.provider.address || "",
          pricePerHour: res.provider.pricePerHour || "",
          description: res.provider.description || "",
          isAvailable: res.provider.isAvailable,
        });
      }
    } catch (error) {
      toast.error("Failed to load provider profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvailability = () => {
    setForm({
      ...form,
      isAvailable: !form.isAvailable,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      let imageUrl = provider?.user?.profileImage || "";

      if (selectedImage) {
        const upload = await uploadImage(selectedImage);
        imageUrl = upload.image;
      }

      const res = await updateProviderProfile({
        ...form,
        profileImage: imageUrl,
      });

      if (res.success) {
        toast.success(res.message || "Provider profile updated!");
        updateUser(res.user);
        fetchProfile();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Profile update failed"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-xs font-bold text-slate-500">Loading Profile Details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Topbar
        provider={provider}
        isAvailable={form.isAvailable}
        onAvailabilityChange={handleAvailability}
      />

      <div className="pt-2">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Provider Business Profile
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Update your service details, hourly rates, experience, and photo.
            </p>
          </div>

          {/* Avatar Upload Header */}
          <div className="flex flex-col items-center sm:flex-row gap-6 border-b border-slate-100 pb-8">
            <div className="relative">
              <img
                src={
                  preview ||
                  provider?.user?.profileImage ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    provider?.user?.name || "Provider"
                  )}&background=2563eb&color=fff`
                }
                alt="profile"
                className="h-32 w-32 rounded-full border-4 border-blue-100 object-cover shadow-md"
              />

              <label
                htmlFor="image"
                className="absolute bottom-1 right-1 cursor-pointer rounded-full bg-blue-600 p-2.5 text-white shadow-md hover:bg-blue-700 transition-colors"
              >
                <FaCamera className="text-xs" />
              </label>

              <input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-lg font-extrabold text-slate-900">
                {provider?.user?.name}
              </h2>
              <p className="text-xs text-slate-500">{provider?.user?.email}</p>
              <span className="inline-block mt-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 uppercase tracking-wider">
                {form.service || "Technician"}
              </span>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2 text-xs">
            <div>
              <label className="mb-2 block font-bold uppercase tracking-wider text-slate-700">
                Primary Service Specialty
              </label>
              <input
                name="service"
                value={form.service}
                onChange={handleChange}
                placeholder="e.g. Electrician, Plumber"
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3.5 font-semibold text-slate-800 outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>

            <div>
              <label className="mb-2 block font-bold uppercase tracking-wider text-slate-700">
                Years of Experience
              </label>
              <input
                name="experience"
                value={form.experience}
                onChange={handleChange}
                placeholder="e.g. 5"
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3.5 font-semibold text-slate-800 outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>

            <div>
              <label className="mb-2 block font-bold uppercase tracking-wider text-slate-700">
                Contact Phone
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3.5 font-semibold text-slate-800 outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>

            <div>
              <label className="mb-2 block font-bold uppercase tracking-wider text-slate-700">
                Hourly Rate (₹)
              </label>
              <input
                name="pricePerHour"
                value={form.pricePerHour}
                onChange={handleChange}
                placeholder="e.g. 350"
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3.5 font-semibold text-slate-800 outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block font-bold uppercase tracking-wider text-slate-700">
                Service Address / Operating Hub
              </label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Full street address and landmark"
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3.5 font-semibold text-slate-800 outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block font-bold uppercase tracking-wider text-slate-700">
                Bio & Experience Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your qualifications, skills, and guarantee..."
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3.5 font-semibold text-slate-800 outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>

            <div className="md:col-span-2 flex justify-end pt-4">
              <button
                type="submit"
                disabled={saving}
                className={`rounded-2xl px-8 py-3.5 font-bold text-white shadow-md transition-all cursor-pointer ${
                  saving
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20 hover:shadow-lg"
                }`}
              >
                {saving ? "Saving Changes..." : "Save Business Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;