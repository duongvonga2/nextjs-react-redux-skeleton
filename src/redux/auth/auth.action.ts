import { Dispatch } from "redux";
import { AppApi, removeData, saveData, validateData } from "../../commons";
import { createAction } from "../common";
import { IRootState } from "../store";
import authApi from "./auth.api";
import { IAuthState, ILogin } from "./auth.interface";
import { LoginValidator } from "./auth.validator";
import _ from "lodash";

export const Types = {
  setState: "auth.setState",
  cleanAll: "auth.cleanAll",
  resetState: "auth.resetState",

  adminLoginRequest: "auth.adminLogin.request",
  adminLoginSuccess: "auth.adminLogin.Success",
  adminLoginFailure: "auth.adminLogin.Failure",
};

const setState = (state: Record<string, any>) =>
  createAction(Types.setState, { state });
const resetState = (stateName: keyof IAuthState) =>
  createAction(Types.resetState, { stateName });
const cleanAll = () => createAction(Types.cleanAll);

const adminLogin =
  (data: ILogin) => async (dispatch: Dispatch, getState: () => IRootState) => {
    let errors = { ...getState().auth.loginForm.errors };
    const validatorData = new LoginValidator(data);
    const validatorErrors = await validateData(validatorData);
    errors = { ...errors, ...validatorErrors };
    dispatch(setState({ "loginForm.errors": errors }));
    if (!_.isEmpty(errors)) {
      return Promise.resolve(false);
    }

    dispatch(createAction(Types.adminLoginRequest));
    return authApi.adminLogin(data).then((response) => {
      if (response.success) {
        saveData("appUser", response.data || {});
        if (response.data) {
          AppApi.setToken(response.data?.token);
        }
        dispatch(
          createAction(Types.adminLoginSuccess, { data: response.data })
        );
        return true;
      } else {
        dispatch(createAction(Types.adminLoginFailure, {}, response.message));
        return false;
      }
    });
  };

const logOut = () => (dispatch: Dispatch) => {
  dispatch(setState({ isLogin: false }));
  removeData("appUser");
};

export default {
  setState,
  resetState,
  cleanAll,
  adminLogin,
  logOut,
};
