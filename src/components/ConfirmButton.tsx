import React from "react";
import {
  Popover,
  Typography,
  Button,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";

interface PopconfirmProps {
  /** The title of the confirmation box */
  title: string;
  /** Confirmation callback */
  onConfirm: () => void;
  /** Cancelation callback */
  onCancel?: () => void;
  /** Props of the Button component */
  buttonProps: React.ComponentProps<typeof Button>;
  /** Test ID of the button */
  buttonTestId?: string;
  children: React.ReactNode;
}

export const ConfirmButton = ({
  title,
  onConfirm,
  onCancel,
  buttonProps = {},
  buttonTestId,
  children,
}: PopconfirmProps) => {
  const classes = useStyles()();
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    setOpen(false);
    onCancel?.();
  };
  const handleConfirm = () => {
    setOpen(false);
    onConfirm();
  };

  return (
    <>
      <Button
        {...buttonProps}
        onClick={handleClick}
        ref={buttonRef}
        data-test-id={buttonTestId}
      >
        {children}
      </Button>
      <Popover
        open={open}
        anchorEl={buttonRef.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className={classes.root}
      >
        <Typography gutterBottom>{title}</Typography>
        <Typography align="center">
          <Button onClick={handleCancel} size="small">
            Cancel
          </Button>{" "}
          <Button onClick={handleConfirm} size="small" color="primary">
            Confirm
          </Button>
        </Typography>
      </Popover>
    </>
  );
};

function useStyles() {
  return makeStyles((theme: Theme) =>
    createStyles({
      root: {
        "& .MuiPopover-paper": { padding: theme.spacing(2) },
      },
    })
  );
}
