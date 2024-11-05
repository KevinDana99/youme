import { useEffect, useState } from "react";
import {
  ClosestDestinationType,
  DistanceElementType,
  LocationType,
  ResponseGoogleApiType,
} from "./types";
/*
const mock = {
  destination_addresses: [
    "Av. d'Estrasburg, 38, 08206 Sabadell, Barcelona, Spain",
    "",
  ],
  origin_addresses: ["Av. d'Estrasburg, 42, 08206 Sabadell, Barcelona, Spain"],
  rows: [
    {
      elements: [
        {
          distance: {
            text: "18 m",
            value: 18,
          },
          duration: {
            text: "1 min",
            value: 2,
          },
          status: "OK",
        },
        {
          distance: {
            text: "1 m",
            value: 1,
          },
          duration: {
            text: "1 min",
            value: 1,
          },
          status: "OK",
        },
        {
          status: "NOT_FOUND",
        },
      ],
    },
  ],
  status: "OK",
};
*/
const useCalculateRoute = ({
  origin,
  destination,
  apiKey,
}: {
  origin: LocationType;
  destination: string;
  apiKey: string;
}) => {
  const [data, setData] = useState<ResponseGoogleApiType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [route, setRoute] = useState<{
    store_index: number;
    distance: string | undefined;
    duration: string | undefined;
  } | null>(null);
  const handleRequest = async (destinationSelected?: string) => {
    setLoading(true);
    const dest = destinationSelected ?? destination;
    try {
      if (origin && dest) {
        const req = await fetch(
          `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin[0]},${origin[1]}&destinations=${dest}&mode=driving&key=${apiKey}`
        );
        const res: ResponseGoogleApiType = await req.json();
        setData(res);

        if (res) {
          res.rows[0].elements.find(
            (el) =>
              el.status === "ZERO_RESULTS" &&
              setError(
                "La ubicacion de destino o origen es invalida o se encuentran lejanas"
              )
          );
        }
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const calculateRoute = () => {
    if (data?.rows[0].elements) {
      const distances: Array<DistanceElementType> = data.rows[0].elements;

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
  }, [origin, data]);
  return {
    data,
    error,
    loading,
    route,
    refetch: handleRequest,
  };
};

export default useCalculateRoute;
