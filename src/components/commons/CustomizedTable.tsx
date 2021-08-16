import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import _ from "lodash";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    background: "#f8f8f8",
    boxShadow: "-8px -8px 16px #FFFFFF, 8px 8px 16px rgba(185, 183, 183, 0.25)",
    borderRadius: "20px",
    paddingBottom: "15px",
    position: "static",
    // display: "flex",
  },
});

interface IProps<T extends Record<string, any>> {
  columns: ITableDataSource<T>[];
  dataSource: T[];
}

export interface ITableDataSource<T extends Record<string, any>> {
  title: React.ReactElement | string;
  keyPath: string;
  render?: (
    value: any,
    record: T,
    index: number
  ) => React.ReactElement | string | number;
}

function BasicTable<T extends Record<string, any>>(props: IProps<T>) {
  const classes = useStyles();
  const { dataSource, columns } = props;
  const headerList = columns.map((item) => item.title);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.header}>
          <TableRow style={{ width: "100%" }}>
            {headerList.map((item, index) => {
              return (
                <TableCell align="center" key={index}>
                  {item}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map((data, dataIndex) => {
            return (
              <TableRow key={dataIndex}>
                {columns.map((column, colIndex) => {
                  const { render, keyPath } = column;
                  const value = _.get(data, keyPath);
                  return (
                    <TableCell align="center" key={colIndex}>
                      {render ? render(value, data, dataIndex) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export const CustomizedTable = BasicTable;
