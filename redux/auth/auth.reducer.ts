import produce from "immer";
import { IAction } from "../common";
import authInitialState from "./auth.initial-state";
import { IAuthState } from "./auth.interface";

export default produce((state: IAuthState, action: IAction) => {
  const data = action.data;
  const message = action.message;
  switch (action.type) {
    default: {
      return state;
    }
  }
}, authInitialState);
