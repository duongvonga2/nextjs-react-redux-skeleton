import { Dispatch } from "redux";
import { createAction } from "../common";
import categoryApi from "./category.api";
import { ICategoryQuery } from "./category.interface";

export const Types = {
  setState: "category.setState",

  getListRequest: "category.getList.request",
  getListSuccess: "category.getList.Success",
  getListFailure: "category.getList.Failure",
};

const getList = (query: ICategoryQuery) => (dispatch: Dispatch) => {
  dispatch(createAction(Types.getListRequest));
  return categoryApi.getList(query).then((response) => {
    if (response.success) {
      dispatch(createAction(Types.getListSuccess, { data: response.data }));
      return true;
    } else {
      dispatch(createAction(Types.getListFailure, {}, response.message));
      return false;
    }
  });
};

export default {
  getList,
};
