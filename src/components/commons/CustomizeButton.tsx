import {
  alpha,
  Button,
  ButtonProps,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: "#FFDF00",
    opacity: 0.7,
    borderRadius: "20px",
    width: "auto",
    height: "auto",
    "&:hover": {
      background: "#FFA000",
    },
  },
}));

export const CustomizedButton = (props: ButtonProps) => {
  const classes = useStyles();
  const { className, ...other } = props;
  return <Button {...other} className={`${className} ${classes.root}`} />;
};
