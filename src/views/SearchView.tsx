import React from "react";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import { movieApi } from "api/";
import { useFetcher } from "common/";
import { MoviesList } from "components/";

export const SearchView = () => {
  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);
  const query = urlParams.get("q") || "";

  const fetcherFn = React.useCallback(() => movieApi.search(query), [query]);

  const { data, error } = useFetcher(null, fetcherFn);
  const loading = !data && !error;

  return (
    <div className="search-results">
      <h1>Movie Search for: {query}</h1>
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
