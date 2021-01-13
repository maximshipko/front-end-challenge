import { Chip } from "@material-ui/core";

import type { MovieDetailed } from "api/";

type MovieCardProps = {
  genres: MovieDetailed["genres"];
};
export const Genres = ({ genres }: MovieCardProps) => {
  return (
    <>
      {genres.map((genre) => (
        <Chip size="small" label={genre.name} key={genre.id} />
      ))}
    </>
  );
};
