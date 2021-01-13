export interface Movie {
  id: number;
  title: string;
  original_title: string;
  release_date: string;
  genre_ids: number[];
  original_language: LanguageISO;
  vote_average: number;
  vote_count: number;
  popularity: number;
  overview: string;
  poster_path: string | null;
}

export interface MovieDetailed extends Omit<Movie, "genre_ids"> {
  budget: number;
  genres: Genres[];
  homepage: string;
  imdb_id: string;
  backdrop_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  spoken_languages: SpokenLanguages[];
}

export interface NewMovie
  extends Partial<
    Omit<MovieDetailed, "id" | "vote_average" | "vote_count" | "popularity">
  > {}

type Genres = {
  id: number;
  name: string;
};

type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: CountryISO;
};

type ProductionCountry = {
  iso_3166_1: CountryISO;
  name: string;
};

type SpokenLanguages = {
  iso_639_1: LanguageISO;
  name: string;
  english_name: string;
};

type CountryISO = string; //TODO: "US" | "GB" | "DE";
type LanguageISO = string; // TODO: "en" | "de";
