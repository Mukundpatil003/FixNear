import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Sidebar from "../../components/provider/Sidebar";
import Topbar from "../../components/provider/Topbar";

import {
  getProviderProfile,
  updateProviderProfile,
} from "../../api/providerApi";
import { uploadImage } from "../../api/uploadApi";
import {
  FaCamera,
  FaUserCircle,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] =
  useState(null);

const [preview, setPreview] =
  useState("");

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
      toast.error("Failed to load profile");
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

    let imageUrl =
      provider?.user?.profileImage || "";

    if (selectedImage) {

      const upload =
        await uploadImage(selectedImage);

      imageUrl = upload.image;

    }

    const res =
      await updateProviderProfile({

        ...form,

        profileImage: imageUrl,

      });

if (res.success) {

   toast.success(res.message);

  updateUser(res.user);

fetchProfile();
}

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Update failed"
    );

  }

};
  const handleImageChange = (e) => {

  const file = e.target.files[0];

  if (!file) return;

  setSelectedImage(file);

  setPreview(URL.createObjectURL(file));

};

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 p-8">

        <Topbar
          provider={provider}
          isAvailable={form.isAvailable}
          onAvailabilityChange={handleAvailability}
        />

        <div className="mt-8 rounded-3xl bg-white p-8 shadow">

          <h1 className="mb-8 text-3xl font-bold">
            Provider Profile
          </h1>
          <div className="mb-10 flex flex-col items-center">

  <div className="relative">

    <img
      src={
        preview ||
        provider?.user?.profileImage ||
        "https://placehold.co/180x180?text=Profile"
      }
      alt="profile"
      className="h-44 w-44 rounded-full border-4 border-blue-500 object-cover shadow-lg"
    />

    <label
      htmlFor="image"
      className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-blue-600 p-3 text-white"
    >
      <FaCamera />
    </label>

    <input
      id="image"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleImageChange}
    />

  </div>

  <h2 className="mt-5 text-2xl font-bold">
    {provider?.user?.name}
  </h2>

  <p className="text-gray-500">
    {provider?.user?.email}
  </p>

</div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-6 md:grid-cols-2"
          >

            <input
              name="service"
              value={form.service}
              onChange={handleChange}
              placeholder="Service"
              className="rounded-xl border p-4"
            />

            <input
              name="experience"
              value={form.experience}
              onChange={handleChange}
              placeholder="Experience"
              className="rounded-xl border p-4"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="rounded-xl border p-4"
            />

            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="rounded-xl border p-4"
            />

            <input
              name="pricePerHour"
              value={form.pricePerHour}
              onChange={handleChange}
              placeholder="Price Per Hour"
              className="rounded-xl border p-4"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="Description"
              className="rounded-xl border p-4 md:col-span-2"
            />

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700 md:col-span-2"
            >
              Save Changes
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Profile;