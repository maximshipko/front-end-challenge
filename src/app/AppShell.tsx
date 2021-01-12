import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container } from "@material-ui/core";

import { Header, Footer } from "components/";
import {
  MoviesListView,
  MovieDetailsView,
  NewMovieView,
  EditMovieView,
  SearchView,
  NotFoundView,
} from "views/";
import { paths } from "common/";

export function AppShell() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth={false}>
        <BrowserRouter basename="/">
          <Header />
          <Switch>
            <Route
              exact
              path={[paths.home, paths.movies]}
              component={MoviesListView}
            />
            <Route path={paths.editMovie} component={EditMovieView} />
            <Route path={paths.newMovie} component={NewMovieView} />
            <Route path={paths.movie} component={MovieDetailsView} />
            <Route path={paths.search} component={SearchView} />

            <Route component={NotFoundView} />
          </Switch>

          <Footer />
        </BrowserRouter>
      </Container>
    </>
  );
}
