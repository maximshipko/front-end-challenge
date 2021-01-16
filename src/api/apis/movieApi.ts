import type { MovieDetailed, NewMovie, MovieListResponse } from "..";
import { API_KEY, API_BASE_URL, sleep } from "common/";

const coolMoviesParams = {
  language: "en-US",
  sort_by: "popularity.desc",
  certification_country: "US",
  include_adult: "false",
  include_video: "false",
  "release_date.gte": "2009-01-01",
  "vote_count.gte": "3000",
  "vote_average.gte": "7.5",
};

export const list = (page: number = 1) => {
  const queryString = new URLSearchParams({
    api_key: API_KEY,
    page: String(page),
    ...coolMoviesParams,
  });
  const url = `${API_BASE_URL}discover/movie?${queryString}`;
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      return response.json() as Promise<MovieListResponse>;
    }
  });
};

const emptyResults: MovieListResponse = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const search = (query: string) => {
  if (!query) return Promise.resolve(emptyResults);
  const queryString = new URLSearchParams({
    api_key: String(process.env.REACT_APP_API_KEY),
    query,
  });
  const url = `${API_BASE_URL}search/movie?${queryString}`;
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      return response.json() as Promise<MovieListResponse>;
    }
  });
};

export const details = (movieId: number) => {
  const queryString = new URLSearchParams({
    api_key: String(process.env.REACT_APP_API_KEY),
  });
  const url = `${API_BASE_URL}movie/${movieId}?${queryString}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.json() as Promise<MovieDetailed>;
      }
    })
    .then((movie) => {
      movie.genre_ids = movie.genres.map((g) => g.id);
      movie.spoken_languages_ids = movie.spoken_languages.map(
        (lang) => lang.iso_639_1
      );
      movie.production_countries_ids = movie.production_countries.map(
        (c) => c.iso_3166_1
      );
      return movie;
    });
};

export const remove = (movieId: number) =>
  sleep().then(() => {
    throw new Error("Removing the movie is not allowed at the moment.");
  });

export const create = (movie: NewMovie) =>
  sleep().then(() => {
    throw new Error("Adding new movie is not allowed at the moment.");
  });

export const update = (movie: NewMovie) =>
  sleep().then(() => {
    throw new Error("Updating movies is not allowed at the moment.");
  });
