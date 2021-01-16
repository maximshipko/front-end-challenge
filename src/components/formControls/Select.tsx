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
  // error: any;
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
  return (
    <FormControl
      variant="outlined"
      size="small"
      {...(error && { error: true })}
      required={required}
    >
      <InputLabel>{selectLabel}</InputLabel>
      <MuiSelect
        label={selectLabel}
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
