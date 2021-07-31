import React from "react";
import { makeStyles } from "@material-ui/styles";
import { themeBreakpointsDown } from "../components/theme";
import { Grid, Theme } from "@material-ui/core";
import Sidebar from "../components/Layout/Sidebar";

// const history = propsHistory.createBrowserHistory();

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
function Home() {
  const classes = useStyles();
  return (
    <>
      <Grid item lg={3} xl={2} md={3} sm={12} className={classes.sidebar}>
        <Sidebar />
      </Grid>
      <Grid
        item
        lg={9}
        xl={10}
        md={9}
        sm={12}
        xs={12}
        className={classes.content}
      ></Grid>
    </>
  );
}

export default Home;
