import { format } from "date-fns";

export const isServer = () => {
  return typeof window === "undefined";
};

export const getTime = (key = "yyyy-MM-dd") => {
  return format(new Date(), key);
};
