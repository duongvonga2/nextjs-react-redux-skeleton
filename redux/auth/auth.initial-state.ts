import { IAuthState } from "./auth.interface";

const authInitialState: IAuthState = {
  isFetching: false,
  message: "",
  isLogin: false,
  userInfo: {},
};
export default authInitialState;
