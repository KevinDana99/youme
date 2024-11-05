export type LocationType = number[] | null;
export type ResponseGoogleApiType = {
  destination_addresses: string[];
  origin_addresses: string[];
  rows: [
    {
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
    }
  ];
  status: "OK";
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
