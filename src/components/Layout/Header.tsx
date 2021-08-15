import React from "react";
import { alpha, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
// import AuthHeader from "./AuthHeader";
import UnAuthHeader from "./UnAuthHeader";
import pageAction from "../../redux/page/page.action";
import { connect, ConnectedProps } from "react-redux";
import { IRootState } from "../../redux";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { themeBreakpointsDown } from "../theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
      // display: "flex",
      // background: theme.palette.primary.main,
    },
    container: {
      maxWidth: "1070px",
      margin: "auto",
      width: "100%",
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
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function PrimarySearchAppBar(props: PropsFromRedux) {
  const classes = useStyles();
  const { setPageState } = props;
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <div className={classes.container}>
          <Toolbar className={classes.toolBar}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                setPageState({ "sidebar.isShowDrawer": true });
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              TaGiVi
            </Typography>

            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <UnAuthHeader />
          </Toolbar>
        </div>
      </AppBar>
    </div>
  );
}

export default connector(PrimarySearchAppBar);
