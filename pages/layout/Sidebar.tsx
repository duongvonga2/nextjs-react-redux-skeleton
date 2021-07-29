import { Drawer, IconButton, makeStyles, Theme } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { IRootState } from "../../redux";
import pageAction from "../../redux/page/page.action";

const useStyles = makeStyles((theme: Theme) => ({
  sidebar: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  topBar: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  horizon: {
    height: "75px",
    width: "100%",
    background: theme.palette.secondary.light,
  },
  vertical: {
    height: "500px",
    minWidth: "240px",
    background: theme.palette.secondary.light,
  },
  drawer: {
    // width: "200px",
    // background: theme.palette.primary.main,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  drawerContainer: {
    height: "100%",
    // background: theme.palette.primary.main,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

const mapStateToProps = (state: IRootState) => ({
  isShowDrawer: state.page.sidebar.isShowDrawer,
});
const mapDispatchToProps = {
  setPageState: pageAction.setState,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type IPropsFromRedux = ConnectedProps<typeof connector>;

interface IProps {}
() => {};

const Sidebar = (props: IProps & IPropsFromRedux) => {
  const classes = useStyles();
  const { isShowDrawer, setPageState } = props;

  const onCloseDrawer = () => {
    setPageState({ sidebar: { isShowDrawer: false } });
  };

  const Horizon = () => {
    return <div className={classes.horizon}></div>;
  };
  const Vertical = () => {
    return <div className={classes.vertical}></div>;
  };

  return (
    <>
      <div className={classes.sidebar}>
        <Vertical />
      </div>
      <div className={classes.topBar}>
        <Horizon />
      </div>
      <Drawer
        open={isShowDrawer}
        onClose={onCloseDrawer}
        className={classes.drawer}
      >
        <div className={classes.drawerContainer}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={onCloseDrawer}>
              <ChevronLeft />
            </IconButton>
          </div>

          <Vertical />
        </div>
      </Drawer>
    </>
  );
};
export default connector(Sidebar);
