import "../styles/globals.css";
import { wrapper } from "../src/redux";
import { AppProps } from "next/dist/next-server/lib/router/router";
import {
  StylesProvider,
  jssPreset,
  createGenerateClassName,
} from "@material-ui/styles";
import { create } from "jss";
import jssExtend from "jss-plugin-extend";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import { AppTheme } from "../src/components/theme";
import { ProtectRoutes } from "../src/components/Layout";
import { ILoginResponse } from "../src/redux/auth";
import authAction from "../src/redux/auth/auth.action";
import { AppApi, getData } from "../src/commons";
import React, { useEffect } from "react";
import { CssBaseline } from "@material-ui/core";

store.subscribe(() => {
  console.log("new state", store.getState());
});

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
});

const generateClassName = createGenerateClassName();

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  useEffect(() => {
    const user = getData<ILoginResponse>("appUser");
    if (user) {
      store.dispatch(
        authAction.setState({ userInfo: { ...user }, isLogin: true })
      );
      AppApi.setToken(user.token);
    } else {
      store.dispatch(authAction.setState({ isLogin: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const jssStyle = document.querySelector("#jss-server-side");
    if (jssStyle) {
      jssStyle.parentElement?.removeChild(jssStyle);
    }
  }, []);
  return (
    <React.Fragment>
      <StylesProvider jss={jss} generateClassName={generateClassName}>
        <Provider store={store}>
          <AppTheme>
            <CssBaseline />
            <ProtectRoutes router={router}>
              <Component {...pageProps} />
            </ProtectRoutes>
          </AppTheme>
        </Provider>
      </StylesProvider>
    </React.Fragment>
  );
};

export default wrapper.withRedux(MyApp);
