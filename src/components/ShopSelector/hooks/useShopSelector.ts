import { useEffect, useState } from "react";
import useCalculateRoute from "./useCalculateRoute";
import useGetOrigin from "./useGetOrigin";
import { ResponseGoogleApiType } from "./types";

const useShopSelector = () => {
  const [visible, setVisible] = useState(false);
  const { origin } = useGetOrigin();
  const [stores, setStores] = useState<ResponseGoogleApiType["stores"] | null>(
    null
  );
  const { data, error, loading, route } = useCalculateRoute({
    origin: origin,
  });

  const [selectedIndexStore, setSelectedIndexStore] = useState<number>(0);
  const [selectedStore, setSelectedStore] = useState(
    stores
      ? stores[selectedIndexStore]
      : {
          coords: { lat: [0, 0], lng: [0, 0] },
          name: "youme",
        }
  );

  const handleOpenSelector = () => {
    setVisible(!visible);
  };
  const handleSelectedStore = (index: number) => {
    setSelectedIndexStore(index);
    stores && setSelectedStore(stores[index]);
    setVisible(false);
  };

  useEffect(() => {
    data?.stores && setStores(data.stores);
  }, [data]);

  useEffect(() => {
    route?.store_index && setSelectedIndexStore(route?.store_index);
    stores && setSelectedStore(stores[selectedIndexStore]);
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
