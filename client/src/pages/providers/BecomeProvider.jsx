import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { becomeProvider } from "../../api/providerApi";
import useAuth from "../../hooks/useAuth";

import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";

const BecomeProvider = () => {
  const navigate = useNavigate();
const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    service: "",
    experience: "",
    phone: "",
    address: "",
    latitude: "",
    longitude: "",
    pricePerHour: 500,
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const getCurrentLocation = () => {

  if (!navigator.geolocation) {
    return toast.error("Geolocation not supported");
  }

  navigator.geolocation.getCurrentPosition(

    async (position) => {

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      try {

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        const data = await res.json();

        setFormData((prev) => ({
          ...prev,
          latitude,
          longitude,
          address: data.display_name || "",
        }));

        toast.success("Location Detected");

      } catch (err) {

        toast.error("Failed to fetch address");

      }

    },

    (error) => {

      console.log(error);

      toast.error("Location Permission Denied");

    },

    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }

  );

};
const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation

  if (!formData.service) {
    return toast.error("Please select service");
  }

  if (!formData.experience) {
    return toast.error("Please enter experience");
  }
  
  if (!/^[6-9]\d{9}$/.test(formData.phone)) {
  return toast.error("Enter Valid Phone Number");
}
if (Number(formData.experience) <= 0) {
  return toast.error(
    "Experience should be greater than 0"
  );

}

  if (formData.phone.length !== 10) {
    return toast.error("Phone number must be 10 digits");
  }

  if (!formData.address) {
    return toast.error("Please enter address");
  }
if (Number(formData.pricePerHour) < 100) {
  return toast.error(
    "Minimum Price ₹100"
  );
}
  if (formData.description.length < 20) {
  return toast.error(
    "Description must contain at least 20 characters"
  );
}

  if (
    !formData.latitude ||
    !formData.longitude
  ) {
    return toast.error(
      "Please capture your current location"
    );
  }

  try {

    setLoading(true);

    const data = await becomeProvider(formData);

    if (data.success) {

      setSuccess(true);

setTimeout(() => {

   login(data.user);

   navigate("/provider/profile");

},1500);

    }

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Something went wrong"
    );

  } finally {

    setLoading(false);

  }

};
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EEF5FF] py-16">
        {
loading && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">

<div className="rounded-3xl bg-white p-8 shadow-2xl">

<div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"/>

<p className="mt-5 font-bold">

Creating Provider Profile...

</p>

</div>

</div>

)
}

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-8 lg:grid-cols-2">

        {/* LEFT */}

        <motion.div
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >

          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Join Our Network
          </span>

          <h1 className="mt-8 text-6xl font-extrabold leading-tight">

            Earn More By Joining

            <span className="block text-blue-600">
              FixNear
            </span>

          </h1>

          <p className="mt-8 text-xl leading-9 text-gray-500">

            Empowering skilled professionals with the tools
            to grow their business, reach more customers,
            and manage bookings effortlessly.

          </p>

          <div className="mt-14 space-y-10">

            <div className="flex gap-5">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">

                <FaMoneyBillWave className="text-xl text-blue-600" />

              </div>

              <div>

                <h3 className="text-2xl font-bold">
                  Earn upto ₹50,000/month
                </h3>

                <p className="mt-2 text-gray-500">
                  Get bookings regularly and grow
                  your income.
                </p>

              </div>

            </div>

            <div className="flex gap-5">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">

                <FaClock className="text-xl text-blue-600" />

              </div>

              <div>

                <h3 className="text-2xl font-bold">
                  Flexible Hours
                </h3>

                <p className="mt-2 text-gray-500">
                  Work whenever you want.
                </p>

              </div>

            </div>

            <div className="flex gap-5">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">

                <FaShieldAlt className="text-xl text-blue-600" />

              </div>

              <div>

                <h3 className="text-2xl font-bold">
                  Verified Customers
                </h3>

                <p className="mt-2 text-gray-500">
                  Only genuine customers can
                  book your services.
                </p>

              </div>

            </div>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{
            opacity: 0,
            x: 50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="rounded-3xl bg-white p-10 shadow-2xl"
        >

          <h2 className="text-center text-5xl font-bold">

            Create Your Profile

          </h2>

          <p className="mt-3 text-center text-gray-500">

            Takes less than 3 minutes to get started

          </p>

      <form
                onSubmit={handleSubmit}
              className="mt-10 space-y-7"
    >
            {/* Service */}

            <div>

              <label className="mb-2 block font-semibold">
                Service Category
              </label>

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="h-14 w-full rounded-xl border px-4"
              >

                <option value="">
                  Select Service
                </option>

               <option value="Electrician">
Electrician
</option>

<option value="Plumber">
Plumber
</option>

<option value="Cleaner">
Cleaner
</option>

<option value="Carpenter">
Carpenter
</option>

<option value="Painter">
Painter
</option>

<option value="AC Technician">
AC Technician
</option>
              </select>

            </div>

            {/* Experience */}

            <div>

              <label className="mb-2 block font-semibold">
                Experience
              </label>

              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Years of Experience"
                className="h-14 w-full rounded-xl border px-4"
              />

            </div>

            {/* Phone */}

            <div>

              <label className="mb-2 block font-semibold">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className="h-14 w-full rounded-xl border px-4"
              />

            </div>

            {/* Address */}

            <div>

              <label className="mb-2 block font-semibold">
                Address
              </label>

              <div className="relative">

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter Full Address"
                  className="h-14 w-full rounded-xl border px-4 pr-14"
                />

                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="absolute right-4 top-4"
                >

                  <FaMapMarkerAlt
                    className="text-2xl text-blue-600"
                  />

                </button>

              </div>

            </div>

            {/* Price */}

            <div>

              <label className="mb-2 block font-semibold">
                Price Per Hour ₹
              </label>

              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                name="pricePerHour"
                value={formData.pricePerHour}
                onChange={handleChange}
                className="w-full"
              />

              <p className="mt-2 text-center text-2xl font-bold text-blue-600">

                ₹{formData.pricePerHour}

              </p>

            </div>

            {/* Description */}

            <div>

              <label className="mb-2 block font-semibold">
                About You
              </label>

              <textarea
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your skills..."
                className="w-full rounded-xl border p-4"
              />

            </div>

            {/* Button */}

           <button
type="submit"
disabled={loading}
className="h-14 w-full rounded-xl bg-blue-600 text-lg font-bold text-white transition hover:bg-blue-700 disabled:opacity-70"
>

{loading
? "Creating Profile..."
: "Continue"}

</button>
{success && (

<motion.div

initial={{
opacity:0,
scale:0.8
}}

animate={{
opacity:1,
scale:1
}}

className="mt-6 flex items-center justify-center gap-3 rounded-xl bg-green-50 p-4"

>

<FaCheckCircle className="text-green-600 text-xl" />
<p className="font-semibold text-green-700">

Provider Profile Created Successfully

</p>

</motion.div>

)}
          </form>

        </motion.div>

      </div>

    </section>
    
  );
};

export default BecomeProvider;