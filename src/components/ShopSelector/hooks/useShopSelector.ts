import { useEffect, useState } from "react";
import useCalculateRoute from "./useCalculateRoute";
import useGetOrigin from "./useGetOrigin";
import { ResponseGoogleApiType } from "./types";

const useShopSelector = () => {
  const [visible, setVisible] = useState(false);
  const { origin, originError } = useGetOrigin();
  const [stores, setStores] = useState<ResponseGoogleApiType["stores"] | null>(
    null
  );
  const { data, error, loading, route, setError } = useCalculateRoute({
    origin: origin,
  });

  const [selectedIndexStore, setSelectedIndexStore] = useState<null | number>(
    null
  );
  const [selectedStore, setSelectedStore] = useState(
    stores && selectedIndexStore ? stores[selectedIndexStore] : null
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
    console.log(stores);
  }, [data]);

  useEffect(() => {
    route?.store_index && setSelectedIndexStore(route?.store_index);
  }, [route]);

  useEffect(() => {
    stores &&
      selectedIndexStore &&
      setSelectedStore(stores[selectedIndexStore]);
  }, [selectedIndexStore]);

  useEffect(() => {
    setError(originError);
  }, [originError]);
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
