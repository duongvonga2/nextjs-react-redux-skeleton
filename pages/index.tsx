import React from "react";
import { makeStyles } from "@material-ui/styles";
import { themeBreakpointsDown } from "../src/components/theme";
import { Grid, Theme } from "@material-ui/core";

interface IProps {}

const useStyles = makeStyles((theme: Theme) => {
  return {
    navBar: { height: "auto" },
    sidebar: {
      [themeBreakpointsDown["xs"]]: {
        display: "none",
      },
    },
    topSidebar: {
      height: "75px",
      width: "100%",
      background: theme.palette.secondary.light,
      display: "none",
      [themeBreakpointsDown["md"]]: {
        display: "block",
      },
      [themeBreakpointsDown["xs"]]: {
        display: "none",
      },
    },
    content: {
      minHeight: "calc(100vh - 140px)",
      background: theme.palette.secondary.main,
    },
    rootContainer: {
      display: "flex",
    },
    container: {
      maxWidth: "1070px",
      margin: "auto",
    },
  };
});
function Home(props: IProps) {
  const classes = useStyles();
  return <Grid container className={classes.content}></Grid>;
}

export default Home;
