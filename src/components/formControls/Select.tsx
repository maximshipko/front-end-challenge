import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  Input as MuiInput,
  SelectProps as MuiSelectProps,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import React from "react";

type SelectProps = MuiSelectProps & {
  options: Array<{ id: string | number; name: string }>;
  value: unknown | unknown[];
  helperText?: string;
};

export const Select = ({
  name,
  label,
  value,
  error = null!,
  helperText,
  onChange,
  options,
  required = false,
  ...otherProps
}: SelectProps) => {
  if (otherProps.multiline) {
    otherProps.input = <MuiInput />;
  }
  const selectLabel =
    otherProps.multiple && value instanceof Array && value.length
      ? label + ` (${value.length})`
      : label;
  const labelId = `${name}__label`;
  return (
    <FormControl
      variant="outlined"
      size="small"
      {...(error && { error: true })}
      required={required}
    >
      <InputLabel id={labelId}>{selectLabel}</InputLabel>
      <MuiSelect
        label={selectLabel}
        labelId={labelId}
        name={name}
        value={value}
        onChange={onChange}
        {...otherProps}
      >
        <MenuItem value="">—</MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
