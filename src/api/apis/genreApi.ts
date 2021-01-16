import type { Genre } from "..";
import { API_KEY, API_BASE_URL } from "common/";

type GenreListResponse = {
  genres: Genre[];
};

export const list = (language: string = "en") => {
  const queryString = new URLSearchParams({
    api_key: API_KEY,
    language,
  });
  const url = `${API_BASE_URL}genre/movie/list?${queryString}`;
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      return response.json() as Promise<GenreListResponse>;
    }
  });
};
