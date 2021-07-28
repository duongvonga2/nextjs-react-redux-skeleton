import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import lightBlue from "@material-ui/core/colors/lightBlue";
import red from "@material-ui/core/colors/red";
import { createTheme } from "@material-ui/core";

const lightText = {
  primary: "rgb(17, 24, 39)",
  secondary: "rgb(107, 114, 128)",
  disabled: "rgb(149, 156, 169)",
};

const state: any = {
  palette: {
    type: "light",
    text: lightText,
    primary: {
      light: "#BBE2DA",
      main: "#1B9E85",
      dark: "#087055",
    },
    secondary: {
      light: "#FFD0C1",
      // main: "#FF6231",
      main: lightBlue[500],
      dark: "#FF3413",
      contrastText: "#FFF",
    },
    background: {
      paper: "#FFFFFF",
      default: "#F2F8F1",
    },
    error: red,
  },
  status: {
    danger: "orange",
  },
  typography: {
    fontFamily: ["Roboto", '"Helvetica"', "Arial", "sans-serif"].join(","),
  },
};

const mainTheme = createTheme(state);

export const AppTheme = (props: any) => {
  return <ThemeProvider theme={mainTheme}>{props.children}</ThemeProvider>;
};
