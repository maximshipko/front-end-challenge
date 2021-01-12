export * from "./constants";
export * from "./paths";
export * from "./useFetcher";

export const getYear = (dt: string) => {
  const date = new Date(Date.parse(dt));
  return date.getFullYear();
};