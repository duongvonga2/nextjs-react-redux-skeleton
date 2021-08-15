import { createAction } from "../common";
import { IPageState, IShowMessage } from "./page.interface";

export const Types = {
  setState: "page.setState",
  resetState: "page.resetState",
  cleanAll: "page.cleanAll",
  showMessage: "page.showMessage",
};

const setState = (state: Record<string, any>) =>
  createAction(Types.setState, { state });

const resetState = (stateName: keyof IPageState) =>
  createAction(Types.resetState, { stateName });

const cleanAll = () => createAction(Types.cleanAll);

const showMessage = (data: IShowMessage) =>
  createAction(Types.showMessage, { data });

export default {
  setState,
  showMessage,
  resetState,
  cleanAll,
};
