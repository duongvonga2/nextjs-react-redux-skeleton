import { IAction } from "./common.interface";

export function createAction<T>(
  type: string,
  data?: any,
  message?: string
): IAction {
  console.log("Redux Action: ", type, data, message);
  return {
    type,
    data,
    message,
  };
}
