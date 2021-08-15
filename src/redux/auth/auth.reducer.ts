
  import produce from "immer";
import { IAction } from "../common";
import authInitialState from "./auth.initial-state";
import { IAuthState } from "./auth.interface";
import _ from "lodash";
import { Types } from "./auth.action";

export default produce((state: IAuthState, action: IAction) => {
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
      const stateName: keyof IAuthState = data.stateName;
      _.set(state, stateName, authInitialState[stateName]);
      return state;
    }
    case Types.cleanAll: {
      return authInitialState;
    }

    default: {
      return state;
    }
  }
}, authInitialState);
