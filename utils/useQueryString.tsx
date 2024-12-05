import { ObjectedParams } from "@/types/user";

const objectToQueryString = (params: ObjectedParams): string => {
  return Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
};

export const useObjectToQueryString = (): ((
  params: ObjectedParams
) => string) => {
  return objectToQueryString;
};
