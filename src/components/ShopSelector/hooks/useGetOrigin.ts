import { useEffect, useState } from "react";

const useGetOrigin = () => {
  const [origin, setOrigin] = useState<number[] | null>(null);
  const [originError, setOriginError] =
    useState<GeolocationPositionError["message"]>();
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
            reject(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        setOriginError("Localizacion no soportada en tu dispositivo");
      }
    });
  };

  const originRequest = async () => {
    try {
      const location = await getCurrentLocation();
      const originLocation = [location.lat, location.lng];
      setOrigin(originLocation);
    } catch (err) {
      const error = err as GeolocationPositionError;
      if (error.code === 1) {
        setOriginError(
          "El contenido que intentas cargar debe tener la localizacion activada para poder funcionar"
        );
      } else {
        setOriginError(error.message);
      }
    }
  };

  useEffect(() => {
    const handleRequest = async () => {
      await originRequest();
    };
    handleRequest();
  }, []);

  return { origin, originError };
};

export default useGetOrigin;
