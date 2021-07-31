import produce from "immer";
import { IAction } from "../common";
import categoryInitialState from "./category.initial-state";
import { ICategoryState } from "./category.interface";
import { Types } from "./category.action";

export default produce((state: ICategoryState, action: IAction) => {
  const data = action.data;
  const message = action.message;
  switch (action.type) {
    case Types.getListRequest: {
      state.isFetching = true;
      state.message = "";
      return state;
    }
    case Types.getListSuccess: {
      state.isFetching = false;
      state.dataList = data.data;
      return state;
    }
    case Types.getListFailure: {
      state.message = message;
      state.isFetching = false;
      return state;
    }

    default: {
      return state;
    }
  }
}, categoryInitialState);
