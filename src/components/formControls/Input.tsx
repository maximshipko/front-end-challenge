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
  return (
    <TextField
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      size="small"
      {...otherProps}
    />
  );
};
