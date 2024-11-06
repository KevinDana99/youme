import { useEffect, useState } from "react";
import {
  ClosestDestinationType,
  DistanceElementType,
  LocationType,
  ResponseGoogleApiType,
} from "./types";

const useCalculateRoute = ({ origin }: { origin: LocationType }) => {
  const [data, setData] = useState<ResponseGoogleApiType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [route, setRoute] = useState<{
    store_index: number;
    distance: string | undefined;
    duration: string | undefined;
  } | null>(null);
  const handleRequest = async () => {
    setLoading(true);
    try {
      if (origin) {
        const req = await fetch(
          `https://youme.es/wp-json/shop-selector/v1/distances?origins=${origin[0]},${origin[1]}`
        );
        const res: ResponseGoogleApiType = await req.json();
        setData(res);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const calculateRoute = () => {
    if (data?.elements) {
      const distances: Array<DistanceElementType> = data.elements;
      const initialMin: ClosestDestinationType = {
        distance: Infinity,
        index: -1,
      };

      const closest: ClosestDestinationType =
        distances.reduce<ClosestDestinationType>((min, element, index) => {
          if (
            element.status === "OK" &&
            element.distance?.value !== undefined &&
            element.distance.value < min.distance
          ) {
            return { distance: element.distance.value, index: index };
          }
          return min;
        }, initialMin);

      if (closest.index !== -1) {
        const closestDistance = distances[closest.index]?.distance?.text;
        const closestDuration = distances[closest.index]?.duration?.text;

        const minRoute = {
          store_index: closest.index,
          distance: closestDistance,
          duration: closestDuration,
        };
        setRoute(minRoute);
      } else {
        console.log("No se encontraron destinos válidos.");
      }
    }
  };
  useEffect(() => {
    handleRequest();
    data && calculateRoute();
  }, [origin]);
  return {
    data,
    error,
    loading,
    route,
    refetch: handleRequest,
  };
};

export default useCalculateRoute;
