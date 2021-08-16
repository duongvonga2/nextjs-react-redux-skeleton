import { AppApi } from "../../commons";
import { ILogin, ILoginResponse } from "./auth.interface";

export default {
  adminLogin: (data: ILogin) => {
    const api = "/auth/admin/login";
    return AppApi.fetchData<ILoginResponse>({
      api,
      body: data,
      method: "POST",
    });
  },
};
