
  import produce from "immer";
import { IAction } from "../common";
import categoryInitialState from "./category.initial-state";
import { ICategoryState } from "./category.interface";

export default produce((state: ICategoryState, action: IAction) => {
  const data = action.data;
  const message = action.message;
  switch (action.type) {
    default: {
      return state;
    }
  }
}, categoryInitialState);
