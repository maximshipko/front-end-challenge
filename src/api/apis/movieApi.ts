import type { Movie, MovieDetailed, NewMovie } from "../models";

type PagedResponse<T> = {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
};

type MovieListResponse = PagedResponse<Movie>;
const baseUrl = process.env.REACT_APP_API_BASE || "/";
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
    api_key: String(process.env.REACT_APP_API_KEY),
    page: String(page),
    ...coolMoviesParams,
  });
  const url = `${baseUrl}discover/movie?${queryString}`;
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
  const url = `${baseUrl}search/movie?${queryString}`;
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
  const url = `${baseUrl}movie/${movieId}?${queryString}`;
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      return response.json() as Promise<MovieDetailed>;
    }
  });
};

export const remove = (movieId: number) =>
  Promise.reject(new Error("Removing the movie is not allowed at the moment."));

export const create = (movie: NewMovie) =>
  Promise.reject(new Error("Adding new movie is not allowed at the moment."));

export const update = (movie: Movie) =>
  Promise.reject(new Error("Updating movies is not allowed at the moment."));
