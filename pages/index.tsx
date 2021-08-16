import React from "react";
import { makeStyles } from "@material-ui/styles";
import { themeBreakpointsDown } from "../src/components/theme";
import { Grid, MenuItem, Select, Theme } from "@material-ui/core";
import { ConfessionDetail, ConfessionList } from "../src/components/Confession";
import { connect, ConnectedProps } from "react-redux";
import { IRootState } from "../src/redux";
import confessionAction from "../src/redux/confession/confession.action";

interface IProps {}

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
      minHeight: "calc(100vh - 232px)",
      padding: "0px 10px",
      // background: theme.palette.secondary.main,
    },
    rootContainer: {
      display: "flex",
    },
    container: {
      maxWidth: "1070px",
      margin: "auto",
    },
    select: {
      "&:before": {
        borderBottom: "1px solid rgba(0, 0, 0, 0.42);",
      },
      "&:after": {
        borderBottom: "1px solid rgba(0, 0, 0, 0.42);",
      },
    },
  };
});

const mapStateToProps = (state: IRootState) => ({
  query: state.confession.query,
});
const mapDispatchToProps = {
  setState: confessionAction.setState,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Home(props: IProps & PropsFromRedux) {
  const classes = useStyles();
  const { query, setState } = props;
  const { status } = query;
  const converterStatus = status || "all";
  return (
    <Grid container className={classes.content}>
      <div style={{ width: "100%" }}>
        <Select
          style={{ minWidth: "100px" }}
          value={converterStatus}
          onChange={(event) => {
            setState({
              "query.status":
                event.target.value !== "all" ? event.target.value : "",
            });
          }}
          className={classes.select}
        >
          <MenuItem value="all"> Tất cả</MenuItem>
          <MenuItem value="pending"> Đang chờ</MenuItem>
          <MenuItem value="approved"> Đã duyệt</MenuItem>
          <MenuItem value="cancelled">Đã từ chối</MenuItem>
        </Select>
        <ConfessionList />
        <ConfessionDetail />
      </div>
    </Grid>
  );
}

export default connector(Home);
