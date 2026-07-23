import { useEffect } from "react";
import { updateProviderLocation } from "../../api/providerApi";

const ProviderLocationTracker = () => {
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        try {
          await updateProviderLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          console.log("📍 Provider Location Updated");
        } catch (err) {
          console.log(err);
        }
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return null;
};

export default ProviderLocationTracker;