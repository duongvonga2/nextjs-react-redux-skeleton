import { AppApi } from "../../commons";
import { ICategory, ICategoryQuery } from "./category.interface";

export default {
  getList: (query: ICategoryQuery) => {
    const api = "/category";
    return AppApi.fetchData<ICategory[]>({ api, query, method: "GET" });
  },
};
