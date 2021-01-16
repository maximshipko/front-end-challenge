import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { generatePath, Link as RouterLink, useHistory } from "react-router-dom";

import type { Movie } from "api/";
import {
  paths,
  IMG_BASE_URL,
  POSTER_IMG_SIZE,
  NO_IMAGE_PLACEHOLDER,
} from "common/";

type MovieCardProps = {
  movie: Movie;
  className?: string;
};
export const MovieCard = ({ movie, className }: MovieCardProps) => {
  const classes = useStyles()();
  const history = useHistory();
  const goToEditPage = (e: React.MouseEvent) => {
    e.preventDefault(); // not to click on the poster
    history.push(generatePath(paths.editMovie, { movieId: movie.id }));
  };

  return (
    <Card className={`${className} ${classes.root}`}>
      <CardActionArea
        component={RouterLink}
        to={generatePath(paths.movie, { movieId: movie.id })}
      >
        <CardMedia
          component="img"
          alt={movie.title}
          width={POSTER_IMG_SIZE}
          image={
            movie.poster_path
              ? `${IMG_BASE_URL}w${POSTER_IMG_SIZE}${movie.poster_path}`
              : NO_IMAGE_PLACEHOLDER
          }
          title={movie.title}
        />
        <CardContent className={classes.cardContent}>
          <Typography>⭐ {movie.vote_average} </Typography>

          <IconButton
            aria-label="edit"
            className={classes.editButton}
            size="small"
            onClick={goToEditPage}
            color="inherit"
            title="Edit Movie"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

function useStyles() {
  return makeStyles((theme: Theme) =>
    createStyles({
      root: {},
      cardContent: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        background: "rgba(0,0,0, .3)",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        // alignItems: "baseline",
      },
      editButton: {
        "&:hover": {
          backgroundColor: "rgba(255,255,255, .15)",
        },
      },
    })
  );
}
