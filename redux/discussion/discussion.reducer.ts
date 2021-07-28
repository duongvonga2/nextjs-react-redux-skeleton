
  import produce from "immer";
import { IAction } from "../common";
import discussionInitialState from "./discussion.initial-state";
import { IDiscussionState } from "./discussion.interface";

export default produce((state: IDiscussionState, action: IAction) => {
  const data = action.data;
  const message = action.message;
  switch (action.type) {
    default: {
      return state;
    }
  }
}, discussionInitialState);
