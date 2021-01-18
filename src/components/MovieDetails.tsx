import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Link,
  Button,
  Paper,
} from "@material-ui/core";
import { generatePath } from "react-router-dom";

import type { MovieDetailed } from "api/";
import {
  IMG_BASE_URL,
  BACKDROP_IMG_SIZE,
  POSTER_IMG_SIZE,
  NO_IMAGE_PLACEHOLDER,
  paths,
} from "common/";
import { Genres } from "components/";

type MovieDetailsProps = {
  children?: never;
  /** Movie details object from api */
  movie: MovieDetailed;
};

/** Renders Movie page with all details, and edit button */
export const MovieDetails = ({ movie }: MovieDetailsProps) => {
  const classes = useStyles()();

  return (
    <div className={classes.root}>
      <Card className={classes.backdrop}>
        <CardMedia
          component="img"
          alt={movie.title}
          height={600}
          image={
            movie.backdrop_path
              ? `${IMG_BASE_URL}w${BACKDROP_IMG_SIZE}${movie.backdrop_path}`
              : NO_IMAGE_PLACEHOLDER
          }
        />
        <CardContent className={classes.backdropContent}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography variant="h3" component="h1" noWrap>
                {movie.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="h6">
                ⭐ {movie.vote_average}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item xs>
          <Genres genres={movie.genres} />
          <Typography variant="h6">Synopsis</Typography>
          <Typography paragraph>{movie.overview || "No Synopsis"}</Typography>
          <Typography variant="h6">Production</Typography>
          <ul>
            {movie?.production_companies.map((pc) => (
              <li key={pc.id}>{pc.name}</li>
            ))}
          </ul>
        </Grid>
        <Grid item>
          <Paper>
            <img
              className={classes.poster}
              src={
                movie.poster_path
                  ? `${IMG_BASE_URL}w${POSTER_IMG_SIZE}${movie.poster_path}`
                  : NO_IMAGE_PLACEHOLDER
              }
              width={POSTER_IMG_SIZE}
              alt={movie.title}
            />
          </Paper>
          <Typography align="center">
            <Button
              variant="outlined"
              color="inherit"
              component={RouterLink}
              to={generatePath(paths.editMovie, { movieId: movie.id })}
              data-test-id="movie-edit-button"
            >
              Edit Movie
            </Button>
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="body2" color="textSecondary">
            Release Date
          </Typography>
          <Typography variant="body2" gutterBottom>
            {movie.release_date || "—"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Original Title
          </Typography>
          <Typography variant="body2" gutterBottom noWrap>
            {movie.original_title || "—"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Spoken Languages
          </Typography>
          <Typography variant="body2" gutterBottom noWrap>
            {movie?.spoken_languages
              .map((lang) => lang.english_name)
              .join(", ")}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Homepage
          </Typography>
          <Typography variant="body2" gutterBottom noWrap>
            <Link href={movie.homepage}>{movie.homepage}</Link>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Budget
          </Typography>
          <Typography variant="body2" gutterBottom>
            {movie.revenue
              ? new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumSignificantDigits: 7,
                }).format(movie.budget)
              : "—"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Revenue
          </Typography>
          <Typography variant="body2" gutterBottom>
            {movie.revenue
              ? new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumSignificantDigits: 7,
                }).format(movie.revenue)
              : "—"}
          </Typography>

          <Typography variant="body2" color="textSecondary"></Typography>
          <Typography variant="body2" gutterBottom></Typography>
        </Grid>
      </Grid>
    </div>
  );
};

function useStyles() {
  return makeStyles((theme: Theme) =>
    createStyles({
      root: {},
      backdrop: {
        position: "relative",
        marginBottom: "1em",
      },
      backdropContent: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "rgba(0,0,0,.4)",
        color: "white",
      },
      poster: {
        borderRadius: theme.shape.borderRadius,
        display: "block",
        marginBottom: "1em",
      },
    })
  );
}
