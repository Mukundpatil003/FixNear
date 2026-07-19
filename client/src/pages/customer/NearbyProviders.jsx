import { useLocation } from "react-router-dom";

const NearbyProviders = () => {
  const location = useLocation();

  const providers = [
  {
    _id: 1,
    name: "Raj Painter",
    rating: 4.9,
    experience: 10,
    distance: "2.3 km",
    price: 499,
    available: true,
    image:
      "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    _id: 2,
    name: "Amit Painter",
    rating: 4.8,
    experience: 8,
    distance: "3.1 km",
    price: 450,
    available: true,
    image:
      "https://randomuser.me/api/portraits/men/35.jpg",
  },
];

  const service = location.state?.service || "Providers";

  return (
    <div className="p-8">
      <h1 className="text-5xl font-bold">
        Nearby {service}
      </h1>

      <p className="mt-4 text-gray-500">
        Choose the best provider near your location.
      </p>
    </div>
  );
};

export default NearbyProviders;