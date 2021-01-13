import { Button, Grid } from "@material-ui/core";

import type { MovieDetailed, NewMovie } from "api/";
import { useForm } from "common/";
import { Form, Input } from "components/";

type MovieFormProps = {
  children?: never;
  movie: MovieDetailed | null;
};
const initialValues: NewMovie = {
  title: "",
  original_title: "",
  release_date: "",
  poster_path: "",
  backdrop_path: "",
  homepage: "",
  imdb_id: "",
  budget: 0,
  revenue: 0,
};
export const MovieForm = ({ movie }: MovieFormProps) => {
  const { values, handleChange, handleSubmit } = useForm<NewMovie>({
    initialValues: movie || initialValues,
    onSubmit: (values) => console.log({ values }),
  });

  const isUpdate = movie && movie.id;
  return (
    <Form onSubmit={handleSubmit} id="movieForm" noValidate>
      <Grid container>
        <Grid item xs={6}>
          <Input
            name="title"
            label="Title"
            value={values.title}
            onChange={handleChange}
            placeholder="Title (EN)"
          />
          <Input
            name="original_title"
            label="Original Title"
            value={values.original_title}
            onChange={handleChange}
          />
          <Input
            name="release_date"
            label="Release Date"
            value={values.release_date}
            onChange={handleChange}
          />
          <Input
            name="poster_path"
            label="Poster path"
            value={values.poster_path}
            onChange={handleChange}
          />
          <Input
            name="backdrop_path"
            label="Backdrop path"
            value={values.backdrop_path}
            onChange={handleChange}
          />
          <Input
            name="homepage"
            label="Homepage URL"
            value={values.homepage}
            onChange={handleChange}
          />
          <Input
            name="imdb_id"
            label="IMDB ID"
            value={values.imdb_id}
            onChange={handleChange}
          />
          <Input
            name="budget"
            type="number"
            label="Budget"
            value={values.budget}
            onChange={handleChange}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
          <Input
            name="revenue"
            type="number"
            label="Revenue"
            value={values.revenue}
            onChange={handleChange}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />

          <div>
            Multi selector: genres, production_companies, production_countries,
            spoken_languages
          </div>
        </Grid>
        <Grid item xs={6}>
          {" "}
        </Grid>
        <Grid item xs={12}>
          <div>
            {isUpdate ? (
              <Button variant="outlined" color="secondary">
                Remove
              </Button>
            ) : null}
            {isUpdate ? (
              <Button variant="contained" color="primary" type="submit">
                Update
              </Button>
            ) : (
              <Button variant="contained" color="primary" type="submit">
                Create
              </Button>
            )}
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};
