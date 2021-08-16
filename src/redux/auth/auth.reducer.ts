import produce from "immer";
import { IAction } from "../common";
import authInitialState from "./auth.initial-state";
import { IAuthState } from "./auth.interface";
import _ from "lodash";
import { Types } from "./auth.action";

export default produce((state: IAuthState, action: IAction) => {
  const data = action.data;
  const message = action.message || "";
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

    case Types.adminLoginRequest: {
      state.isFetching = true;
      state.message = "";
      return state;
    }
    case Types.adminLoginSuccess: {
      state.isFetching = false;
      const { accessToken, ...userInfo } = data.data;
      state.userInfo = userInfo;
      state.isLogin = true;
      return state;
    }
    case Types.adminLoginFailure: {
      state.message = message;
      state.isFetching = false;
      return state;
    }

    default: {
      return state;
    }
  }
}, authInitialState);
