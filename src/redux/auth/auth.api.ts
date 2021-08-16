import { AppApi } from "../../commons";
import { IAdmin, ILogin, ILoginForm } from "./auth.interface";

export default {
  adminLogin: (data: ILogin) => {
    const api = "/auth/admin-login";
    return AppApi.fetchData<IAdmin>({ api, body: data, method: "POST" });
  },
};
