import { Dispatch } from "redux";
import { createAction } from "../common";
import confessionApi from "./confession.api";
import {
  IConfessionConfirm,
  IConfessionQuery,
  IConfessionState,
} from "./confession.interface";

export const Types = {
  setState: "confession.setState",
  cleanAll: "confession.cleanAll",
  resetState: "confession.resetState",

  getListRequest: "confession.getList.request",
  getListSuccess: "confession.getList.Success",
  getListFailure: "confession.getList.Failure",

  confirmRequest: "confession.confirm.request",
  confirmSuccess: "confession.confirm.Success",
  confirmFailure: "confession.confirm.Failure",

  deleteRequest: "confession.delete.request",
  deleteSuccess: "confession.delete.Success",
  deleteFailure: "confession.delete.Failure",
};

const setState = (state: Record<string, any>) =>
  createAction(Types.setState, { state });
const resetState = (stateName: keyof IConfessionState) =>
  createAction(Types.resetState, { stateName });
const cleanAll = () => createAction(Types.cleanAll);

const getList =
  (query: IConfessionQuery, options?: { loadMore: boolean }) =>
  (dispatch: Dispatch) => {
    if (!options) {
      options = { loadMore: false };
    }
    const { loadMore } = options;
    dispatch(createAction(Types.getListRequest));
    return confessionApi.getList(query).then((response) => {
      if (response.success) {
        dispatch(
          createAction(Types.getListSuccess, {
            data: response.data,
            loadMore,
            total: response.total,
          })
        );
        return true;
      } else {
        dispatch(createAction(Types.getListFailure, {}, response.message));
        return false;
      }
    });
  };

const confirm =
  (id: string, body: IConfessionConfirm) => (dispatch: Dispatch) => {
    dispatch(createAction(Types.confirmRequest));
    return confessionApi.confirm(id, body).then((response) => {
      if (response.success) {
        dispatch(
          createAction(Types.confirmSuccess, {
            data: response.data,
          })
        );
        return true;
      } else {
        dispatch(createAction(Types.confirmFailure, {}, response.message));
        return false;
      }
    });
  };

const deleteConfession = (id: string) => (dispatch: Dispatch) => {
  dispatch(createAction(Types.deleteRequest));
  return confessionApi.delete(id).then((response) => {
    if (response.success) {
      dispatch(
        createAction(Types.deleteSuccess, {
          data: response.data,
        })
      );
      return true;
    } else {
      dispatch(createAction(Types.deleteFailure, {}, response.message));
      return false;
    }
  });
};

export default {
  setState,
  resetState,
  cleanAll,
  getList,
  confirm,
  deleteConfession,
};
