import { makeStyles, createStyles, Theme, Button } from "@material-ui/core";

import type { MovieDetailed } from "api/";

type MovieFormProps = {
  children?: never;
  movie: MovieDetailed | null;
};

export const MovieForm = ({ movie }: MovieFormProps) => {
  const classes = useStyles()();
  const isUpdate = movie && movie.id;
  return (
    <div className={classes.root}>
      <p>{isUpdate ? "Update F O R M" : "Create new Movie F O R M"}</p>

      <p>
        {isUpdate ? (
          <Button variant="outlined" color="secondary">
            Remove
          </Button>
        ) : null}
        {isUpdate ? (
          <Button variant="contained" color="primary">
            Update
          </Button>
        ) : (
          <Button variant="contained" color="primary">
            Create
          </Button>
        )}
      </p>
    </div>
  );
};

function useStyles() {
  return makeStyles((theme: Theme) =>
    createStyles({
      root: {},
    })
  );
}
