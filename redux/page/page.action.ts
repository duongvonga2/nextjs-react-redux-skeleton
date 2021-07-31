import { createAction } from "../common";
import { IPageState } from "./page.interface";

export const Types = {
  setState: "page.setState",
};

const setState = (state: Record<string, any>) =>
  createAction(Types.setState, { stateName: state });

export default {
  setState,
};
