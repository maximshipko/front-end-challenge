import { MovieForm } from "components/";

export const NewMovieView = () => {
  return (
    <div className="new-movie">
      <h1>New Movie</h1>
      <MovieForm movie={null} />
    </div>
  );
};
