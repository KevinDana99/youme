import { useEffect, useState } from "react";

const useGetOrigin = () => {
  const [origin, setOrigin] = useState<number[] | null>(null);

  const getCurrentLocation = () => {
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            resolve({ lat, lng });
          },
          (error) => {
            reject(error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        reject("Geolocation not supported");
      }
    });
  };

  const originRequest = async () => {
    const location = await getCurrentLocation();
    const originLocation = [location.lat, location.lng];
    setOrigin(originLocation);
  };

  useEffect(() => {
    const handleRequest = async () => {
      await originRequest();
    };
    handleRequest();
  }, []);

  return { origin };
};

export default useGetOrigin;
