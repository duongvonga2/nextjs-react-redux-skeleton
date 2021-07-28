import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { ITheme } from "../../components/theme";

interface IProps {
  children?: React.ReactElement;
}

const useStyles = makeStyles((theme: ITheme) => ({
  navBar: { height: "50px", background: theme.palette.primary.dark },
  sidebar: { height: "500px", background: theme.palette.secondary.light },
  content: { height: "500px", background: theme.palette.secondary.main },
}));

const Layout = (props: IProps) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item sm={12} className={classes.navBar}></Grid>
      <Grid item lg={2} xl={2} md={3} className={classes.sidebar}></Grid>
      <Grid item lg={10} xl={10} md={9} className={classes.content}>
        {props.children}
      </Grid>
    </Grid>
  );
};
export default Layout;
