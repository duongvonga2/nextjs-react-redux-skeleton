import produce from "immer";
import { IAction } from "../common";
import pageInitialState from "./page.initial-state";
import { IPageState } from "./page.interface";
import { Types } from "./page.action";
import _ from "lodash";

export default produce((state: IPageState, action: IAction) => {
  const data = action.data;
  const message = action.message;
  switch (action.type) {
    case Types.setState: {
      const stateName = data.stateName;
      for (const key in stateName) {
        state = _.set(state, key, stateName[key]);
      }
      return state;
    }
    default: {
      return state;
    }
  }
}, pageInitialState);
