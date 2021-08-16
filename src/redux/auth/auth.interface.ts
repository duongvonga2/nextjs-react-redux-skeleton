export interface IAuthState {
  isFetching: boolean;
  message: string;
  isLogin: boolean;
  userInfo: any;
  loginForm: ILoginForm;
}

export interface ILoginForm extends ILogin {
  errors: Record<string, any>;
}
export interface ILogin {
  email: string;
  password: string;
}

export interface IAdmin {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ILoginResponse extends IAdmin {
  token: string;
}
