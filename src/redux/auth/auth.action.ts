
import { Dispatch } from "redux";
import { createAction } from "../common";
import authApi from "./auth.api";
import { IAuthState } from "./auth.interface";

export const Types = {
  setState: "auth.setState",
  cleanAll: "auth.cleanAll",
  resetState: "auth.resetState",
};

const setState = (state: Record<string, any>) =>
  createAction(Types.setState, { state });
const resetState = (stateName: keyof IAuthState) =>
  createAction(Types.resetState, { stateName });
const cleanAll = () => createAction(Types.cleanAll);

export default {
  setState,
  resetState,
  cleanAll
};

