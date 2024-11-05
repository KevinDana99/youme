import { useEffect, useState } from "react";
import storesMock from "../mocks.json";
import useCalculateRoute from "./useCalculateRoute";
import useGetOrigin from "./useGetOrigin";

const useShopSelector = ({
  API_KEY_GOOGLE_MAPS,
  stores,
}: {
  API_KEY_GOOGLE_MAPS: string;
  stores: typeof storesMock;
}) => {
  const [visible, setVisible] = useState(false);
  const { origin } = useGetOrigin();

  let destinationAllCoords = "";

  stores.map((store, index) => {
    if (index === 0) {
      destinationAllCoords =
        destinationAllCoords + `${store.coords.lat},${store.coords.lng}`;
    } else {
      destinationAllCoords =
        destinationAllCoords + `|${store.coords.lat},${store.coords.lng}`;
    }
  });
  const { data, error, loading, route } = useCalculateRoute({
    origin: origin,
    destination: destinationAllCoords,
    apiKey: API_KEY_GOOGLE_MAPS,
  });

  const [selectedIndexStore, setSelectedIndexStore] = useState<number>(0);

  const [selectedStore, setSelectedStore] = useState(
    stores[selectedIndexStore]
  );

  const handleOpenSelector = () => {
    setVisible(!visible);
  };
  const handleSelectedStore = (index: number) => {
    setSelectedIndexStore(index);
    setSelectedStore(stores[index]);
    setVisible(false);
  };

  useEffect(() => {
    route?.store_index && setSelectedIndexStore(route?.store_index);
    setSelectedStore(stores[selectedIndexStore]);
  }, [route]);
  return {
    visible,
    selectedIndexStore,
    selectedStore,
    handleOpenSelector,
    handleSelectedStore,
    stores,
    data,
    error,
    loading,
  };
};

export default useShopSelector;
