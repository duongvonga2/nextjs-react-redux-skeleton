import { createAction } from "../common";
import { IPageState } from "./page.interface";

export const Types = {
  setState: "page.setState",
};

const setState = (state: Partial<IPageState>) =>
  createAction(Types.setState, { stateName: state });

export default {
  setState,
};
