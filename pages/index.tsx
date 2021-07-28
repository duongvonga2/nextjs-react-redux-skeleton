import React from "react";
import {
  StylesProvider,
  jssPreset,
  createGenerateClassName,
} from "@material-ui/styles";
import { create } from "jss";
import jssExtend from "jss-plugin-extend";
import { Provider } from "react-redux";
import {} from "next/router";
import store from "../redux/store";
import { AppTheme } from "../components/theme";

// const history = propsHistory.createBrowserHistory();

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
  // insertionPoint: document.getElementById("jss-insertion-point") || undefined,
});

const generateClassName = createGenerateClassName();
export default function Home() {
  const state = store.getState().auth;

  return (
    <StylesProvider jss={jss} generateClassName={generateClassName}>
      <Provider store={store}>
        <AppTheme>
          <div>{state.message}</div>
        </AppTheme>
      </Provider>
    </StylesProvider>
  );
}
