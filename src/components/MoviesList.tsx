import React, { ReactChild } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

import type { Movie } from "api/";
import { MovieCard } from "components/";

type MoviesListProps = {
  children?: ReactChild | null;
  /** Array of Movie objects */
  movies: Movie[];
};

/** Renders a list of tiles with Movie posters */
export const MoviesList = ({ movies, children = null }: MoviesListProps) => {
  const classes = useStyles()();
  return (
    <div className={classes.root}>
      {children}
      <div className={classes.list}>
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
        <div style={{ flex: "auto" }}> </div>
      </div>
    </div>
  );
};

function useStyles() {
  return makeStyles((theme: Theme) =>
    createStyles({
      root: {},
      list: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gridGap: theme.spacing(2),
      },
    })
  );
}
