import { IConfessionState } from "./confession.interface";

const state: IConfessionState = {
  isFetching: false,
  message: "",
  dataList: [],
  query: {
    page: 1,
    pageSize: 10,
    sort: "",
    status: "",
    email: "",
  },
  total: 0,
  detail: null,
  detailVisible: false,
};
export default state;
