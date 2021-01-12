import {
  Typography,
  Link,
  Divider,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";

export const Footer = () => {
  const classes = useStyles()();
  return (
    <div className={classes.root}>
      <Divider />
      <br />
      <Typography variant="body2" color="textSecondary" align="center">
        By Maksym Shypko for{" "}
        <Link href="https://www.collibra.com/">Collibra</Link>, 2021{" "}
        <big>|</big> Powered by{" "}
        <Link href="https://www.themoviedb.org/documentation/api">TMDB</Link>{" "}
        API
      </Typography>
    </div>
  );
};

function useStyles() {
  return makeStyles((theme: Theme) =>
    createStyles({
      root: {
        marginTop: theme.spacing(6),
      },
    })
  );
}
