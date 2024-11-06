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

  const handleRedirectionUser = (url: string) => {
    if (
      window.location.href === url ||
      window.location.href.includes("?selected-shop")
    ) {
      return;
    } else {
      window.location.href = url;
    }
  };

  useEffect(() => {
    data?.stores && setStores(data.stores);
  }, [data]);

  useEffect(() => {
    route?.store_index && setSelectedIndexStore(route?.store_index);
  }, [route]);

  useEffect(() => {
    if (stores && selectedIndexStore) {
      setSelectedStore(stores[selectedIndexStore]);
      !window.location.href.includes("?selected-shop") &&
        handleRedirectionUser(stores[selectedIndexStore].url);
    }
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
