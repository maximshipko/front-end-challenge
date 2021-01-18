import { Chip } from "@material-ui/core";

import type { MovieDetailed } from "api/";

type MovieCardProps = {
  /** Array of Genre items {id,name} */
  genres: MovieDetailed["genres"];
};

/** Renders Chips with movie genres */
export const Genres = ({ genres }: MovieCardProps) => {
  return (
    <>
      {genres.map((genre) => (
        <Chip
          size="small"
          label={genre.name}
          key={genre.id}
          style={{ marginRight: "0.5em" }}
        />
      ))}
    </>
  );
};
