import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { ChevronLeft } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { IRootState } from "../../redux";
import categoryAction from "../../redux/category/category.action";
import categoryApi from "../../redux/category/category.api";
import { ICategory } from "../../redux/category/category.interface";
import pageAction from "../../redux/page/page.action";
import { themeBreakpointsDown } from "../../components/theme";
import Image from "next/image";
import { getFileUrl } from "../../commons";

const mapStateToProps = (state: IRootState) => ({
  isShowDrawer: state.page.sidebar.isShowDrawer,
  sidebarActiveKey: state.page.sidebar.activeKey,
  defaultCategoryList: state.category.defaultList,
});
const mapDispatchToProps = {
  setPageState: pageAction.setState,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type IPropsFromRedux = ConnectedProps<typeof connector>;

interface IProps {
  categoryList?: ICategory[];
}
const useStyles = makeStyles((theme: Theme) => {
  return {
    sidebar: {
      [themeBreakpointsDown["sm"]]: {
        display: "none",
      },
    },
    topBar: {
      display: "none",
      [themeBreakpointsDown["sm"]]: {
        display: "block",
      },
      [themeBreakpointsDown["xs"]]: {
        display: "none",
      },
    },
    horizon: {
      width: "100%",
      display: "block",
      whiteSpace: "nowrap",
      overflow: "auto",
    },
    horizonListItem: {
      width: "auto",
      top: "5px",
      "&:hover, &:hover span": {
        color: `${theme.palette.secondary.dark} !important`,
        background: "rgba(0,0,0,0)",
      },
    },
    vertical: {
      height: "500px",
      minWidth: "240px",
    },
    activeItem: {
      color: theme.palette.secondary.dark,
    },
    drawer: {
      display: "none",
      [themeBreakpointsDown["sm"]]: {
        display: "block",
      },
    },
    drawerContainer: {
      height: "100%",
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    button: {
      width: "100%",
    },
  };
});

const Sidebar = (props: IProps & IPropsFromRedux) => {
  const classes = useStyles();
  const {
    isShowDrawer,
    categoryList: propsCategoryList,
    sidebarActiveKey,
    defaultCategoryList,
    setPageState,
  } = props;

  console.log("categoryList", propsCategoryList);
  let categoryList: ICategory[] = propsCategoryList || [];
  const sideList = defaultCategoryList.concat(categoryList);

  const onCloseDrawer = () => {
    setPageState({ "sidebar.isShowDrawer": false });
  };

  const ItemList = ({ horizon = true }: { horizon: boolean }) => {
    return (
      <List className={horizon ? classes.horizon : ""}>
        <>
          <ListItem
            style={{
              width: "auto",
              display: "inline-block",
            }}
          >
            <Button
              color="primary"
              variant="contained"
              style={{ width: "100%" }}
            >
              Viết bài viết mới
            </Button>
          </ListItem>
          {sideList.map((item, index) => {
            return (
              <div
                style={
                  horizon
                    ? {
                        display: "inline-block",
                      }
                    : {}
                }
                key={item._id}
              >
                <ListItem
                  button
                  key={item._id}
                  className={` ${horizon ? classes.horizonListItem : ""} ${
                    sidebarActiveKey === item._id ? classes.activeItem : ""
                  }`}
                  // selected={sidebarActiveKey === item._id}
                  onClick={() =>
                    setPageState({ "sidebar.activeKey": item._id })
                  }
                >
                  <ListItemIcon
                    style={{
                      width: "auto",
                      minWidth: "20px",
                      marginRight: "15px",
                    }}
                    className={
                      sidebarActiveKey === item._id ? classes.activeItem : ""
                    }
                  >
                    <Icon>{item.image || item.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              </div>
            );
          })}
        </>
      </List>
    );
  };

  const Horizon = () => {
    return (
      <div className={classes.horizon}>
        <ItemList horizon={true} />
      </div>
    );
  };

  const Vertical = () => {
    return (
      <div className={classes.vertical}>
        <ItemList horizon={false} />
      </div>
    );
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
