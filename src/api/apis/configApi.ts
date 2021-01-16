import type { Country, Language } from "..";
import { API_KEY, API_BASE_URL } from "common/";

type LanguageListResponse = Language[];

export const languageList = () => {
  const queryString = new URLSearchParams({
    api_key: API_KEY,
  });
  const url = `${API_BASE_URL}configuration/languages?${queryString}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.json() as Promise<LanguageListResponse>;
      }
    })
    .then((languages) =>
      languages.map((lang) => {
        lang.id = lang.iso_639_1;
        lang.name = lang.name ? lang.name : lang.english_name;
        return lang;
      })
    );
};

type CountryListResponse = Country[];

export const countryList = () => {
  const queryString = new URLSearchParams({
    api_key: API_KEY,
  });
  const url = `${API_BASE_URL}configuration/countries?${queryString}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.json() as Promise<CountryListResponse>;
      }
    })
    .then((countries) =>
      countries.map((country) => {
        country.id = country.iso_3166_1;
        country.name = country.name ? country.name : country.english_name;
        return country;
      })
    );
};
