import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IRootState } from "../../redux";
import { connect, ConnectedProps } from "react-redux";
import { CustomizedTable } from "../commons";
import confessionAction from "../../redux/confession/confession.action";
import { useEffect } from "react";
import { IConfession } from "../../redux/confession";
import { Icon, TablePagination } from "@material-ui/core";
import { blue, deepPurple, red } from "@material-ui/core/colors";
import { Button, TablePagination as Pagination } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  visibilityBtn: {
    background: blue[500],
    color: "#fff",
    "&:hover": {
      background: blue[900],
    },
  },
  deleteBtn: {
    background: red[500],
    color: "#fff",
    "&:hover": {
      background: red[900],
    },
  },
}));

const mapStateToProps = (state: IRootState) => ({
  dataList: state.confession.dataList,
  total: state.confession.total,
  query: state.confession.query,
});
const mapDispatchToProps = {
  getConfessionList: confessionAction.getList,
  resetState: confessionAction.resetState,
  setState: confessionAction.setState,
  deleteConfession: confessionAction.deleteConfession,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
interface IProps {}
const statusProperties = {
  approved: { text: "Đã duyệt", color: green[500] },
  cancelled: { text: "Từ chối", color: red[500] },
  pending: { text: "Đang chờ", color: deepPurple[500] },
};

function Spinning(props: PropsFromRedux & IProps) {
  const classes = useStyles();
  const {
    dataList,
    total,
    query,
    getConfessionList,
    resetState,
    setState,
    deleteConfession,
  } = props;
  const { page, pageSize, status } = query;
  useEffect(() => {
    getConfessionList({ page, pageSize, status });
  }, [getConfessionList, page, pageSize, status]);

  useEffect(() => {
    return () => {
      resetState("query");
      resetState("dataList");
      resetState("total");
    };
  }, [resetState]);

  return (
    <div style={{ width: "100%" }}>
      <CustomizedTable<IConfession>
        columns={[
          {
            title: "#",
            keyPath: "#",
            render: (value, record, index) => index + 1,
          },
          { title: "Tiêu đề", keyPath: "title" },
          {
            title: "Nội dung",
            keyPath: "description",
            // eslint-disable-next-line react/display-name
            render: (value) => {
              return (
                <p dangerouslySetInnerHTML={{ __html: value as string }}></p>
              );
            },
          },
          {
            title: "Email",
            keyPath: "email",
          },

          {
            title: "Trạng thái",
            keyPath: "status",
            render: (value: "approved" | "cancelled" | "pending", record) => {
              const statusProperty = statusProperties[value];
              if (!statusProperties) {
                return value;
              }
              return (
                <div
                  style={{
                    background: statusProperty.color,
                    color: "#fff",
                    width: "auto",
                    padding: "5px",
                  }}
                >
                  {statusProperty.text}
                </div>
              );
            },
          },
          {
            title: "Lý do",
            keyPath: "reason",
          },
          {
            title: "Hành động",
            keyPath: "active",
            render: (value, record) => {
              return (
                <div>
                  <Button
                    size="small"
                    variant="contained"
                    className={classes.visibilityBtn}
                    onClick={() => {
                      setState({ detail: record, detailVisible: true });
                    }}
                  >
                    <Icon>visibility</Icon>
                  </Button>
                  <Button
                    size="small"
                    style={{ marginLeft: "5px" }}
                    className={classes.deleteBtn}
                    onClick={() => deleteConfession(record._id)}
                  >
                    <Icon>delete</Icon>
                  </Button>
                </div>
              );
            },
          },
        ]}
        dataSource={dataList}
      />
      <div style={{ display: "flex" }}>
        <Pagination
          count={total}
          onPageChange={(event: any, pageChange) => {
            setState({ "query.page": pageChange + 1 });
          }}
          onRowsPerPageChange={(event) => {
            setState({ "query.pageSize": event.target.value });
          }}
          page={page - 1}
          rowsPerPage={pageSize}
          // rowsPerPageOptions={[1, 2, 3, 4, 5]}
          style={{ margin: "auto", marginRight: "0px" }}
        />
      </div>
    </div>
  );
}

export const ConfessionList = connector(Spinning);
