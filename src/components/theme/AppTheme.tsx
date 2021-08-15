import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { TGridName } from "./theme.interface";
import {
  themeBreakpointsDown,
  themeBreakpointsUp,
  lightBlue,
  red,
} from "./themeConfig";

const lightText = {
  primary: "rgb(17, 24, 39)",
  secondary: "rgb(107, 114, 128)",
  disabled: "rgb(149, 156, 169)",
};

const state = {
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
  // breakpoints: {
  //   up: (grid: TGridName) => themeBreakpointsUp[grid],
  //   down: (grid: TGridName) => themeBreakpointsDown[grid],
  // },
  status: {
    danger: "orange",
  },
  typography: {
    fontFamily: ["Roboto", '"Helvetica"', "Arial", "sans-serif"].join(","),
    fontSize: 12,
  },
};
export type ITheme = typeof state;

let mainTheme = createTheme(state as any);
// mainTheme = responsiveFontSizes(mainTheme)

export const AppTheme = (props: any) => {
  return <ThemeProvider theme={mainTheme}>{props.children}</ThemeProvider>;
};
