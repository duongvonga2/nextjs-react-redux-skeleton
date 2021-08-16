import produce from "immer";
import { IAction } from "../common";
import confessionInitialState from "./confession.initial-state";
import { IConfessionState } from "./confession.interface";
import _ from "lodash";
import { Types } from "./confession.action";

export default produce((state: IConfessionState, action: IAction) => {
  const data = action.data;
  const message = action.message;
  switch (action.type) {
    case Types.setState: {
      const updatedState = data.state;
      for (const key in updatedState) {
        _.set(state, key, updatedState[key]);
      }
      return state;
    }
    case Types.resetState: {
      const stateName: keyof IConfessionState = data.stateName;
      _.set(state, stateName, confessionInitialState[stateName]);
      return state;
    }
    case Types.cleanAll: {
      return confessionInitialState;
    }

    case Types.getListRequest: {
      state.isFetching = true;
      state.message = "";
      return state;
    }
    case Types.getListSuccess: {
      const { data: dataList, loadMore, total } = data;
      if (!loadMore) {
        state.dataList = data.data;
      } else {
        state.dataList = [...state.dataList, ...dataList];
      }
      state.isFetching = false;
      state.total = total;
      return state;
    }
    case Types.getListFailure: {
      state.message = message;
      state.isFetching = false;
      return state;
    }

    case Types.confirmRequest: {
      state.isFetching = true;
      state.message = "";
      return state;
    }
    case Types.confirmSuccess: {
      const dataList = [...state.dataList];
      const index = dataList.findIndex((item) => item._id === data.data._id);
      if (index >= 0) {
        dataList[index] = { ...dataList[index], ...data.data };
      }
      state.isFetching = false;
      state.dataList = [...dataList];

      state.detail = { ...state.detail, ...data.data };
      return state;
    }
    case Types.confirmFailure: {
      state.message = message;
      state.isFetching = false;
      return state;
    }

    case Types.deleteRequest: {
      state.isFetching = true;
      state.message = "";
      return state;
    }
    case Types.deleteSuccess: {
      const dataList = [...state.dataList];
      const index = dataList.findIndex((item) => item._id === data.data._id);
      if (index >= 0) {
        dataList.splice(index, 1);
      }
      state.isFetching = false;
      state.dataList = [...dataList];
      state.detail = null;
      state.detailVisible = false;
      state.total = state.total - 1;
      return state;
    }
    case Types.deleteFailure: {
      state.message = message;
      state.isFetching = false;
      return state;
    }

    default: {
      return state;
    }
  }
}, confessionInitialState);
