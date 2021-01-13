import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactChild;
}

export const Form = ({ children, ...otherFormProps }: FormProps) => {
  const classes = useStyles()();
  return (
    <form className={classes.root} autoComplete="off" {...otherFormProps}>
      {children}
    </form>
  );
};

function useStyles() {
  return makeStyles((theme: Theme) =>
    createStyles({
      root: {
        "& .MuiFormControl-root": {
          width: "80%",
          marginBottom: theme.spacing(2),
        },
      },
    })
  );
}
