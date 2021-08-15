import produce from "immer";
import { IAction } from "../common";
import pageInitialState from "./page.initial-state";
import { IPageState, IShowMessage } from "./page.interface";
import { Types } from "./page.action";
import _ from "lodash";

export default produce((state: IPageState, action: IAction) => {
  const data = action.data;
  const message = action.message;
  switch (action.type) {
    case Types.setState: {
      const updatedState = data.state;
      for (const key in updatedState) {
        state = _.set(state, key, updatedState[key]);
      }
      return state;
    }

    case Types.resetState: {
      const stateName = data.stateName as keyof IPageState;
      state = _.set(state, stateName, pageInitialState[stateName]);
      return state;
    }

    case Types.showMessage: {
      const { message, variant, anchorOrigin }: IShowMessage = data.data;
      state.messageShowing.message = message;
      state.messageShowing.variant = variant;
      state.messageShowing.anchorOrigin = anchorOrigin;
      return state;
    }

    case Types.cleanAll: {
      return pageInitialState;
    }

    default: {
      return state;
    }
  }
}, pageInitialState);
