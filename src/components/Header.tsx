import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";

import { Logo, SearchBar } from "components/";
import { paths } from "common/";

export const Header = () => {
  const classes = useStyles()();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <RouterLink to={paths.home}>
            <Logo />
          </RouterLink>
          <div className={classes.actionBtn}>
            <Button
              variant="outlined"
              color="inherit"
              component={RouterLink}
              to={paths.newMovie}
              data-test-id="add-movie-button"
            >
              Add Movie
            </Button>
          </div>
          <SearchBar />
        </Toolbar>
      </AppBar>
    </div>
  );
};

function useStyles() {
  return makeStyles((theme: Theme) =>
    createStyles({
      root: {
        marginLeft: -theme.spacing(3),
        marginRight: -theme.spacing(3),
        marginBottom: theme.spacing(1),
      },
      appBar: {
        backgroundColor: "#002b40",
      },
      actionBtn: {
        flexGrow: 1,
        minWidth: theme.spacing(),
        textAlign: "center",
      },
    })
  );
}
