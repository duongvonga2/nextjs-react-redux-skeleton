
  import produce from "immer";
import { IAction } from "../common";
import commentInitialState from "./comment.initial-state";
import { ICommentState } from "./comment.interface";

export default produce((state: ICommentState, action: IAction) => {
  const data = action.data;
  const message = action.message;
  switch (action.type) {
    default: {
      return state;
    }
  }
}, commentInitialState);
