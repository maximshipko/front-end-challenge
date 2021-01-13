import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import { movieApi } from "api/";
import { useFetcher } from "common/";
import { MovieDetails } from "components/";

type RouteParams = {
  movieId: string;
};
// type MovieDetailsViewProps = RouteComponentProps<RouteParams> & {};

export const MovieDetailsView = () => {
  const { movieId } = useParams<RouteParams>();

  const { data, error } = useFetcher(`movie details ${movieId}`, () =>
    movieApi.details(parseInt(movieId))
  );
  const loading = !data && !error;

  return (
    <div className="movie-details">
      {loading ? (
        <div>
          <CircularProgress size={16} /> Loading...
        </div>
      ) : (
        <MovieDetails movie={data} />
      )}
      {error ? <p>⚠️ Something went wrong.</p> : null}
    </div>
  );
};
