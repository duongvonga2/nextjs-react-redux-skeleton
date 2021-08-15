import { IAuthState } from "./auth.interface";

const state: IAuthState = {
  isFetching: false,
  message: "",
  isLogin: false,
  userInfo: null,
  loginForm: {
    email: "",
    password: "",
    errors: {},
  },
};
export default state;
