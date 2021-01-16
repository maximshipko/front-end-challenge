export type Country = {
  iso_3166_1: CountryISO;
  id: CountryISO; // the same as iso_3166_1
  english_name: string;
  name: string;
};

export type CountryISO = string; // "US" | "GB" | "DE";
