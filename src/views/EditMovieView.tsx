import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import { movieApi } from "api/";
import { useFetcher } from "common/";
import { MovieForm } from "components/";

type RouteParams = {
  movieId: string;
};
export const EditMovieView = () => {
  const { movieId } = useParams<RouteParams>();
  const { data, error } = useFetcher(`movie details ${movieId}`, () =>
    movieApi.details(parseInt(movieId))
  );
  const loading = !data && !error;
  return (
    <div className="edit-movie">
      <h1>Edit: {data?.title}</h1>
      {loading ? (
        <p>
          <CircularProgress size={16} /> Loading...
        </p>
      ) : (
        <MovieForm movie={data} />
      )}
    </div>
  );
};
