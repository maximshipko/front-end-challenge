export * from "./constants";
export * from "./paths";
export * from "./useFetcher";
export * from "./useForm";

export const getYear = (dt: string) => {
  const date = new Date(Date.parse(dt));
  return date.getFullYear();
};

export const sleep = (msec: number = 1000) =>
  new Promise((resolve) => setTimeout(resolve, msec));

export const isEmpty = (obj: any) =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;
