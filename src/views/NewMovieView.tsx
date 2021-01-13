import { createStyles, makeStyles, Paper, Theme } from "@material-ui/core";
import { MovieForm } from "components/";

export const NewMovieView = () => {
  const classes = useStyles()();
  return (
    <div className="new-movie">
      <h1>New Movie</h1>
      <Paper className={classes.formPaper}>
        <MovieForm movie={null} />
      </Paper>
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
