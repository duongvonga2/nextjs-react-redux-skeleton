import { IAuthState } from "./auth.interface";

const authInitialState: IAuthState = {
  isFetching: false,
  message: "x0sdsdasd",
  isLogin: false,
  userInfo: {},
};
export default authInitialState;
