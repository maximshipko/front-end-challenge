import {
  Button,
  Grid,
  Divider,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";

import { MovieDetailed, NewMovie, genreApi, configApi, movieApi } from "api/";
import { useFetcher, useForm, FormErrors } from "common/";
import { Form, Input, Select, ConfirmButton } from "components/";

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
  genre_ids: [],
  original_language: "en",
  spoken_languages_ids: [],
  production_countries_ids: [],
};
const validator = (values: NewMovie) => {
  const err: FormErrors<NewMovie> = {};
  if ("title" in values && !values.title) {
    err.title = "Title is required";
  }
  if ("release_date" in values && !values.release_date) {
    err.release_date = "Release date is required";
  }

  if (
    "imdb_id" in values &&
    values.imdb_id &&
    !/^tt[0-9]{7,8}/.test(values.imdb_id)
  ) {
    err.imdb_id = "IMDB ID should starts with 'tt' and includes 7—8 digits";
  }
  if ("genre_ids" in values && !values.genre_ids.length) {
    err.genre_ids = "Select at lease one genre";
  }

  return err;
};
export const MovieForm = ({ movie }: MovieFormProps) => {
  const { data: genresData } = useFetcher("Genres list", genreApi.list);
  const { data: languages } = useFetcher(
    "Language List",
    configApi.languageList
  );
  const { data: countries } = useFetcher("Country List", configApi.countryList);
  const isUpdate = movie && movie.id;
  const {
    touched,
    errors,
    submitting,
    getControlProps,
    handleSubmit,
  } = useForm<NewMovie>({
    initialValues: movie || initialValues,
    onSubmit: (values) => {
      console.log("Submiting form", values);
      if (isUpdate) {
        return movieApi.update(values).catch((error) => {
          alert(error); // TODO: make toast
        });
      } else {
        return movieApi.create(values).catch((error) => {
          alert(error); // TODO: make toast
        });
      }
    },
    validator: validator,
  });
  const handleDelete = () => {
    if (!movie) return;
    movieApi.remove(movie.id).catch((error) => {
      alert(error); // TODO: make toast
    });
  };

  return (
    <Form onSubmit={handleSubmit} id="movieForm" noValidate>
      <Grid container>
        <Grid item xs={6}>
          <Input
            {...getControlProps("title")}
            label="Title"
            placeholder="Title (EN)"
            required
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />
          <Input
            {...getControlProps("original_title")}
            label="Original Title"
          />
          <Input
            type="date"
            {...getControlProps("release_date")}
            label="Release Date"
            required
            InputLabelProps={{
              shrink: true,
            }}
            error={touched.release_date && Boolean(errors.release_date)}
            helperText={touched.release_date && errors.release_date}
          />
          <Input {...getControlProps("poster_path")} label="Poster path" />
          <Input {...getControlProps("backdrop_path")} label="Backdrop path" />
          <Input {...getControlProps("homepage")} label="Homepage URL" />
          <Input
            label="IMDB ID"
            {...getControlProps("imdb_id")}
            InputProps={{
              inputProps: { maxLength: 10 },
            }}
            error={touched.imdb_id && Boolean(errors.imdb_id)}
            helperText={touched.imdb_id && errors.imdb_id}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            {...getControlProps("budget")}
            label="Budget"
            type="number"
            InputProps={{
              inputProps: {
                min: 0,
              },
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <Input
            type="number"
            label="Revenue"
            {...getControlProps("revenue")}
            InputProps={{
              inputProps: {
                min: 0,
              },
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          {languages ? (
            <Select
              {...getControlProps("original_language")}
              label="Original Language"
              options={languages}
            />
          ) : null}
          {genresData ? (
            <Select
              {...getControlProps("genre_ids")}
              label="Genres"
              options={genresData.genres}
              multiple
              required
              error={touched.genre_ids && Boolean(errors.genre_ids)}
              helperText={touched.genre_ids ? errors.genre_ids : ""}
            />
          ) : null}
          {languages ? (
            <Select
              {...getControlProps("spoken_languages_ids")}
              label="Spoken Languages"
              options={languages}
              multiple
            />
          ) : null}
          {countries ? (
            <Select
              {...getControlProps("production_countries_ids")}
              label="Production Countries"
              options={countries}
              multiple
            />
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <Divider />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            {isUpdate ? (
              <ConfirmButton
                title="Are you sure to remove the movie?"
                onConfirm={handleDelete}
                buttonProps={{ variant: "outlined", color: "secondary" }}
              >
                Remove
              </ConfirmButton>
            ) : (
              <div></div>
            )}
            {submitting ? (
              <div>
                <CircularProgress size={16} />
                &nbsp;Submiting ...&nbsp;
              </div>
            ) : null}
            {isUpdate ? (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={submitting}
              >
                Update
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={submitting}
              >
                Create
              </Button>
            )}{" "}
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};
