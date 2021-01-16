import type { Country, Company, Genre, Language } from ".";

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  release_date: string;
  genre_ids: number[];
  original_language: Language["iso_639_1"];
  vote_average: number;
  vote_count: number;
  popularity: number;
  overview: string;
  poster_path: string | null;
}

export interface MovieDetailed extends Movie {
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  backdrop_path: string | null;
  production_companies: Company[];
  production_countries: Country[];
  production_countries_ids: string[];
  revenue: number;
  spoken_languages: Language[];
  spoken_languages_ids: string[];
}

export interface NewMovie extends Partial<MovieDetailed> {
  genre_ids: number[];
  spoken_languages_ids: string[];
}

export type PagedResponse<T = unknown> = {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
};

export type MovieListResponse = PagedResponse<Movie>;
