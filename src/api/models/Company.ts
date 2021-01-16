import type { Country } from ".";
export type Company = {
  id: number;
  logo_path: string;
  name: string;
  origin_country?: Country["iso_3166_1"];
};
