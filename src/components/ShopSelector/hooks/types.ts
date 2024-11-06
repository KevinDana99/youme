import stores from "./../mocks.json";
export type LocationType = number[] | null;
export type ResponseGoogleApiType = {
  elements: [
    {
      status: "ZERO_RESULTS" | "OK";
      distance?: {
        text: string;
        value: number;
      };
      duration?: {
        text: string;
        value: number;
      };
    }
  ];
  stores: typeof stores;
};

export type DistanceElementType = {
  status: string;
  distance?: {
    text: string;
    value: number;
  };
  duration?: {
    text: string;
    value: number;
  };
};

export type ClosestDestinationType = {
  distance: number;
  index: number;
};
