import { Grid, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import Header from "../../components/Layout/Header";
import Sidebar from "./Sidebar";

interface IProps {
  children?: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) => ({
  navBar: { height: "auto" },
  sidebar: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  topSidebar: {
    height: "75px",
    width: "100%",
    background: theme.palette.secondary.light,
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
}));

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
      <Grid item lg={2} xl={2} md={3} sm={12} className={classes.sidebar}>
        <Sidebar />
      </Grid>
      {/* <Grid item lg={2} xl={2} sm={12} className={classes.topSidebar}></Grid> */}
      <Grid
        item
        lg={10}
        xl={10}
        md={9}
        sm={12}
        xs={12}
        className={classes.content}
      >
        {props.children}
      </Grid>
    </Grid>
  );
};
export default Layout;
