import { Grid, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { IRootState } from "../../redux";
import { ShowMessage } from "../commons";
import { themeBreakpointsDown } from "../theme";
import Header from "./Header";
import { Loading } from "./Loading";

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
      // background: theme.palette.secondary.light,
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
      // background: theme.palette.secondary.main,
    },
    rootContainer: {
      display: "flex",
    },
    container: {
      maxWidth: "1360px",
      margin: "auto",
    },
  };
});
interface IProps {
  children?: React.ReactElement;
}

const mapStateToProps = (state: IRootState) => ({
  isLogin: state.auth.isLogin,
});
const mapDispatchToProps = {};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Layout = (props: IProps & PropsFromRedux) => {
  const classes = useStyles();
  const { isLogin } = props;
  return (
    <Loading>
      <Grid container>
        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xs={12}
          className={classes.navBar}
          style={isLogin ? {} : { display: "none" }}
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
            {props.children}
          </Grid>
          <ShowMessage />
        </Grid>
      </Grid>
    </Loading>
  );
};
export default connector(Layout);
