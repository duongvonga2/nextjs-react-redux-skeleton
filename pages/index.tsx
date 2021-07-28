import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
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
import { useEffect } from "react";

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
        <div>{state.message}</div>
      </Provider>
    </StylesProvider>
  );
}
