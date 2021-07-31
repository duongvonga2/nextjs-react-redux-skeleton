import React from "react";
import { makeStyles } from "@material-ui/styles";
import { themeBreakpointsDown } from "../components/theme";
import { Grid, Theme } from "@material-ui/core";
import Sidebar from "../components/Layout/Sidebar";
import categoryApi from "../redux/category/category.api";
import { ICategory } from "../redux/category/category.interface";

interface IProps {
  categoryList: ICategory[];
}

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
  const { categoryList = [] } = props;
  const classes = useStyles();
  return (
    <>
      <Grid item lg={3} xl={2} md={3} sm={12} className={classes.sidebar}>
        <Sidebar categoryList={categoryList} />
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

export async function getServerSideProps() {
  const response = await categoryApi.getList({
    page: 1,
    pageSize: 30,
    status: "active",
  });
  let categoryList: ICategory[] = [];
  if (response.success && response.data) {
    categoryList = response.data;
  }
  return {
    props: {
      categoryList,
    },
  };
}
