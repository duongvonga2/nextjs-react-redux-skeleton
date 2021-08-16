import React from "react";
import { alpha, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import pageAction from "../../redux/page/page.action";
import { connect, ConnectedProps } from "react-redux";
import { IRootState } from "../../redux";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { themeBreakpointsDown } from "../theme";
import Image from "next/image";
import path from "path";
import { CustomizedButton } from "../commons";
import authAction from "../../redux/auth/auth.action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      // flexGrow: 1,
      padding: "15px 10px",
    },
    container: {
      maxWidth: "1360px",
      margin: "auto",
      width: "100%",
      display: "flex",
      background: "#fff",
      borderRadius: "5px",
      // padding: "16px",
    },
    toolBar: {
      width: "100%",
      padding: "0 16px",
      // padding: "0px",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      display: "none",
      [themeBreakpointsDown["sm"]]: {
        display: "block",
      },
    },
    title: {
      display: "block",
      [themeBreakpointsDown["sm"]]: {
        display: "none",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(3),
      width: "auto",
      // [theme.breakpoints.up("sm")]: {
      //   marginLeft: theme.spacing(3),
      //   width: "auto",
      // },
      [themeBreakpointsDown["sm"]]: {
        marginLeft: 0,
        width: "100%",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      // width: "100%",
      // [theme.breakpoints.up("md")]: {
      //   width: "20ch",
      // },
      width: "20ch",
      [themeBreakpointsDown["md"]]: {
        width: "100%",
      },
    },
  })
);

const mapStateToProps = (state: IRootState) => ({});
const mapDispatchToProps = {
  setPageState: pageAction.setState,
  logOut: authAction.logOut,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function PrimarySearchAppBar(props: PropsFromRedux) {
  const classes = useStyles();
  const { logOut } = props;
  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        className={classes.container}
        style={{ position: "relative" }}
      >
        <div
          style={{ margin: "auto", marginTop: "32px", marginBottom: "66px" }}
        >
          <Image
            width={100}
            height={100}
            src={path.resolve(__dirname, "../../../images/logos/main.png")}
            alt="logo"
          />
        </div>
        <CustomizedButton
          style={{
            width: "auto",
            position: "absolute",
            right: "5px",
            top: "5px",
          }}
          onClick={() => logOut()}
        >
          Logout
        </CustomizedButton>
      </AppBar>
    </div>
  );
}

export default connector(PrimarySearchAppBar);
