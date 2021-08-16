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
import { CircularProgress, CssBaseline } from "@material-ui/core";
import Image from "next/image";
import path from "path";
import { useState } from "react";
import Head from "next/head";

store.subscribe(() => {
  console.log("new state", store.getState());
});

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
});

const generateClassName = createGenerateClassName();

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const [loading, setLoading] = useState(false);
  // let loading = false;

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

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [setLoading, loading]);

  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          background: "#fff",
        }}
      >
        <div style={{ margin: "auto", textAlign: "center" }}>
          <div
            style={{
              width: "85px",
              height: "85px",
              margin: "auto",
              padding: "5px",
              background: "#fff",
              marginBottom: "10px",
            }}
          >
            <Image
              src={path.resolve(__dirname, "../images/logos/main.png")}
              alt="logo"
              width={75}
              height={75}
            />
          </div>
          <CircularProgress style={{ margin: "auto", color: "#009444" }} />
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <StylesProvider jss={jss} generateClassName={generateClassName}>
        <Provider store={store}>
          <Head>
            <title>TaGiVi Confession</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
          </Head>
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
