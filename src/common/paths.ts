// React router uses path-to-regexp lib (https://github.com/pillarjs/path-to-regexp)
export const paths = {
  home: "/",

  movies: "/movies",
  movie: "/movies/:movieId(\\d+)",
  editMovie: "/movies/:movieId(\\d+)/edit",
  newMovie: "/movies/new",
  search: "/search",
};
