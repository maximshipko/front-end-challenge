import { useParams } from "react-router-dom";
import {
  CircularProgress,
  createStyles,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";

import { movieApi } from "api/";
import { useFetcher } from "common/";
import { MovieForm } from "components/";
import React from "react";

type RouteParams = {
  movieId: string;
};
export const EditMovieView = () => {
  const classes = useStyles()();
  const { movieId } = useParams<RouteParams>();
  const { data, error } = useFetcher(`movie details ${movieId}`, () =>
    movieApi.details(parseInt(movieId))
  );
  const loading = !data && !error;
  return (
    <div className="edit-movie">
      <h1>{data?.title}</h1>
      {loading ? (
        <div>
          <CircularProgress size={16} /> Loading...
        </div>
      ) : (
        <Paper className={classes.formPaper}>
          <MovieForm movie={data} />
        </Paper>
      )}
    </div>
  );
};

function useStyles() {
  return makeStyles((theme: Theme) =>
    createStyles({
      formPaper: {
        padding: theme.spacing(3),
      },
    })
  );
}
