import { useLocation } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import { movieApi } from "api/";
import { useFetcher } from "common/";
import { MoviesList } from "components/";

export const SearchView = () => {
  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);
  const query = urlParams.get("q") || "";

  const { data, error } = useFetcher(query, () => movieApi.search(query));
  const loading = !data && !error;

  return (
    <div className="search-results">
      <h1>Movie Search for: {query}</h1>
      {loading ? (
        <p>
          <CircularProgress size={16} /> Loading...
        </p>
      ) : (
        <MoviesList movies={data.results} />
      )}
      {error ? <p>⚠️ Something went wrong.</p> : null}
    </div>
  );
};
