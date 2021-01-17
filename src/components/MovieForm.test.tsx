import { render, act, screen, cleanup } from "@testing-library/react";

import { MovieForm } from ".";
import { MovieDetailed, genreApi, configApi } from "api/";
import type { Genre, Country, Language } from "api/";

const genre: Genre = { id: 28, name: "Action" };
const country: Country = {
  iso_3166_1: "US",
  id: "US",
  english_name: "United States of America",
  name: "United States of America",
};
const language: Language = {
  iso_639_1: "en",
  id: "en",
  name: "English",
  english_name: "English",
};
const movie: MovieDetailed = {
  id: 1,
  title: "Avatar",
  original_title: "Avatar",
  release_date: "2009-12-10",
  genres: [genre],
  genre_ids: [genre.id],
  original_language: language.id,
  vote_average: 7.5,
  vote_count: 22706,
  popularity: 100.125,
  overview: "In the 22nd century...",
  poster_path: "/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg",
  budget: 237000000,
  homepage: "http://www.avatarmovie.com/",
  imdb_id: "tt0499549",
  backdrop_path: null,
  production_companies: [],
  production_countries: [country],
  production_countries_ids: [country.id],
  revenue: 2787965087,
  spoken_languages: [language],
  spoken_languages_ids: [language.id],
};
describe("Movie Form", () => {
  afterEach(cleanup);

  describe("New Movie", () => {
    it("should render empty form with CREATE button", async () => {
      const genrePromise = Promise.resolve({ genres: [genre] });
      const countryPromise = Promise.resolve([country]);
      const languagePromise = Promise.resolve([language]);
      // @ts-expect-error
      genreApi.list = jest.fn(() => genrePromise);
      // @ts-expect-error
      configApi.countryList = jest.fn(() => countryPromise);
      // @ts-expect-error
      configApi.languageList = jest.fn(() => languagePromise);

      render(<MovieForm movie={null} />);

      expect(genreApi.list).toHaveBeenCalledTimes(1);
      expect(configApi.countryList).toHaveBeenCalledTimes(1);
      expect(configApi.languageList).toHaveBeenCalledTimes(1);

      await act(() =>
        Promise.all([genrePromise, countryPromise, languagePromise]).then()
      );
      screen.getByLabelText(/^Genres/);
      screen.getByLabelText(/^Production Countries/);
      screen.getByLabelText(/^Spoken Languages/);
      screen.getByLabelText(/^Title/);

      screen.getByText(/^Create$/i);
    });

    it("should fetch genres, countries and languages from api", async () => {
      const genrePromise = Promise.resolve({ genres: [genre] });
      const countryPromise = Promise.resolve([country]);
      const languagePromise = Promise.resolve([language]);
      // @ts-expect-error
      genreApi.list = jest.fn(() => genrePromise);
      // @ts-expect-error
      configApi.countryList = jest.fn(() => countryPromise);
      // @ts-expect-error
      configApi.languageList = jest.fn(() => languagePromise);

      render(<MovieForm movie={null} />);

      await act(() =>
        Promise.all([genrePromise, countryPromise, languagePromise]).then()
      );
      screen.getByLabelText(/^Genres/);
      screen.getByLabelText(/^Production Countries/);
      screen.getByLabelText(/^Spoken Languages/);
    });

    it.skip("should display validation errors when clicking on Create button", async () => {
      // TODO:
    });
    it.skip("should display spiner when clicking on Create button", async () => {
      // TODO:
    });
    it.skip("should redirect user to edit page after successful creation of a movie", async () => {
      // TODO:
    });
  });

  describe("Edit Movie", () => {
    it("should render with movie details and UPDATE/REMOVE buttons", async () => {
      const genrePromise = Promise.resolve({ genres: [genre] });
      const countryPromise = Promise.resolve([country]);
      const languagePromise = Promise.resolve([language]);
      // @ts-expect-error
      genreApi.list = jest.fn(() => genrePromise);
      // @ts-expect-error
      configApi.countryList = jest.fn(() => countryPromise);
      // @ts-expect-error
      configApi.languageList = jest.fn(() => languagePromise);

      render(<MovieForm movie={movie} />);

      await act(() =>
        Promise.all([genrePromise, countryPromise, languagePromise]).then()
      );

      expect(screen.getByLabelText(/^Title/i)).toHaveValue(movie.title);
      expect(screen.getByLabelText(/^Original Title/i)).toHaveValue(
        movie.original_title
      );
      expect(screen.getByLabelText(/^Release Date/i)).toHaveValue(
        movie.release_date
      );
      expect(screen.getByLabelText(/^Poster path/i)).toHaveValue(
        movie.poster_path
      );
      expect(screen.getByLabelText(/^Homepage URL/i)).toHaveValue(
        movie.homepage
      );
      expect(screen.getByLabelText(/^IMDB Id/i)).toHaveValue(movie.imdb_id);
      expect(screen.getByLabelText(/^Budget/i)).toHaveValue(movie.budget);
      expect(screen.getByLabelText(/^Revenue/i)).toHaveValue(movie.revenue);
      expect(screen.getByLabelText(/^Original Language/i)).toHaveTextContent(
        language.name
      );
      expect(screen.getByLabelText(/^Genres/i)).toHaveTextContent(
        movie.genres.map((g) => g.name).join(", ")
      );
      expect(screen.getByLabelText(/^Spoken Languages/i)).toHaveTextContent(
        movie.spoken_languages.map((lang) => lang.name).join(", ")
      );
      expect(screen.getByLabelText(/^Production Countries/i)).toHaveTextContent(
        movie.production_countries.map((country) => country.name).join(", ")
      );

      screen.getByText(/^Update$/i);
      screen.getByText(/^Remove$/i);
    });
  });
});
