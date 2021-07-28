
  import produce from "immer";
import { IAction } from "../common";
import userInitialState from "./user.initial-state";
import { IUserState } from "./user.interface";

export default produce((state: IUserState, action: IAction) => {
  const data = action.data;
  const message = action.message;
  switch (action.type) {
    default: {
      return state;
    }
  }
}, userInitialState);
