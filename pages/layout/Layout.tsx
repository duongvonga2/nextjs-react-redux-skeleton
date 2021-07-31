import { Grid, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Header from "../../components/Layout/Header";
import {
  themeBreakpointsDown,
  themeBreakpointsUp,
} from "../../components/theme";
import Sidebar from "./Sidebar";

const useStyles = makeStyles((theme: Theme) => {
  return {
    navBar: { height: "auto" },
    sidebar: {
      // [themeBreakpointsDown["xs"]]: {
      //   display: "none",
      // },
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    topSidebar: {
      height: "75px",
      width: "100%",
      background: theme.palette.secondary.light,
      // [themeBreakpointsUp["md"]]: {
      //   display: "none",
      // },
      // [themeBreakpointsDown["xs"]]: {
      //   display: "none",
      // },
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    content: {
      minHeight: "calc(100vh - 140px)",
      background: theme.palette.secondary.main,
    },
    rootContainer: {
      // maxWidth: "1070px",
      // margin: "auto",
      display: "flex",
    },
    container: {
      maxWidth: "1070px",
      margin: "auto",
    },
  };
});
interface IProps {
  children?: React.ReactElement;
}

const Layout = (props: IProps) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid
        item
        sm={12}
        md={12}
        lg={12}
        xl={12}
        xs={12}
        className={classes.navBar}
      >
        <Header />
      </Grid>
      <Grid
        item
        sm={12}
        md={12}
        lg={12}
        xl={12}
        xs={12}
        className={classes.rootContainer}
      >
        <Grid container className={classes.container}>
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
          >
            {props.children}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Layout;
