import { AppApi } from "../../commons";
import {
  IConfession,
  IConfessionConfirm,
  IConfessionQuery,
} from "./confession.interface";

export default {
  getList: (query: IConfessionQuery) => {
    const api = "/confession/get-list";
    return AppApi.fetchData<IConfession[]>({ api, query, method: "GET" });
  },
  confirm: (id: string, body: IConfessionConfirm) => {
    const api = "/confession/admin/confirm/" + id;
    return AppApi.fetchData<IConfession>({ api, body, method: "PUT" });
  },
  delete: (id: string) => {
    const api = "/confession/admin/" + id;
    return AppApi.fetchData<IConfession>({ api, method: "DELETE" });
  },
};
