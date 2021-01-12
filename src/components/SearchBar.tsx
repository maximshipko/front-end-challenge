import React from "react";
import { useLocation } from "react-router-dom";
import { InputBase, makeStyles, createStyles, Theme } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { paths } from "common/";

export const SearchBar = () => {
  const { search } = useLocation();
  const [query, setQuery] = React.useState(() => {
    const urlParams = new URLSearchParams(search);
    return urlParams.get("q") || "";
  });
  const classes = useStyles()();

  return (
    <form method="get" action={paths.search} className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search Movie…"
        type="search"
        name="q"
        autoFocus={true}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        inputProps={{ "aria-label": "search" }}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
    </form>
  );
};

function useStyles() {
  return makeStyles((theme: Theme) =>
    createStyles({
      search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "rgba(255,255,255, 0.15)",
        "&:hover": {
          backgroundColor: "rgba(255,255,255, 0.25)",
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          marginLeft: theme.spacing(1),
          width: "auto",
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      inputRoot: {
        color: "inherit",
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`, // vertical padding + font size from searchIcon
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          width: "14ch",
          "&:focus": {
            width: "24ch",
          },
        },
      },
    })
  );
}
