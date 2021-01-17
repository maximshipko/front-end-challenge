import { TextField, TextFieldProps } from "@material-ui/core";
import React from "react";

type InputProps = TextFieldProps & {};

export const Input = ({
  name,
  label,
  value,
  onChange,
  ...otherProps
}: InputProps) => {
  const inputId = `${name}__input`;
  return (
    <TextField
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      size="small"
      id={inputId}
      InputLabelProps={{ htmlFor: inputId }}
      {...otherProps}
    />
  );
};
