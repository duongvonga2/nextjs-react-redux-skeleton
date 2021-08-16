import {
  makeStyles,
  TextField,
  TextFieldProps,
  Theme,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    // position: "static",
    "& input": {
      width: "100%",
      background: "#f8f8f8",
      boxShadow:
        "inset -8px -8px 16px rgba(255, 255, 255, 0.25), inset 8px 8px 16px #E8E8E8",
      borderRadius: "20px",
      // flex: "none",
    },
    width: "100%",
    order: 1,
    flexGrow: 0,
    margin: "10px 0px",
    "& fieldset": {
      border: "none",
      display: "none",
    },
  },
}));

export const CustomizedTextField = (props: TextFieldProps) => {
  const classes = useStyles();
  const { className, ...other } = props;
  return (
    <TextField className={` ${className} ${classes.textField}`} {...other} />
  );
};
