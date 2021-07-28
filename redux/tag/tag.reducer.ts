
  import produce from "immer";
import { IAction } from "../common";
import tagInitialState from "./tag.initial-state";
import { ITagState } from "./tag.interface";

export default produce((state: ITagState, action: IAction) => {
  const data = action.data;
  const message = action.message;
  switch (action.type) {
    default: {
      return state;
    }
  }
}, tagInitialState);
