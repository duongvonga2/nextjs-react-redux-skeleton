export interface IAuthState {
  isFetching: boolean;
  message: string;
  isLogin: boolean;
  userInfo: any;
  loginForm: ILoginForm;
}

export interface ILoginForm {
  email: string;
  password: string;
  errors: Record<string, string>;
}
