import React from "react";
import { CircularProgress } from "@material-ui/core";

import { movieApi } from "api/";
import { useFetcher } from "common/";
import { MoviesList } from "components/";

// TODO: add pagination

export const MoviesListView = () => {
  const { data, error } = useFetcher("greateMovies", movieApi.list);
  const loading = !data && !error;
  return (
    <div className="movies">
      <h1>Great Movies</h1>
      {loading ? (
        <div>
          <CircularProgress size={16} /> Loading...
        </div>
      ) : (
        <MoviesList movies={data.results} />
      )}
      {error ? <p>⚠️ Something went wrong.</p> : null}
    </div>
  );
};
