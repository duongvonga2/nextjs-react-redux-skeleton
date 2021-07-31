import "../styles/globals.css";
// import type { AppProps } from "next/app";
import App from "next/app";
import { wrapper } from "../redux";
import { AppProps } from "next/dist/next-server/lib/router/router";
import {
  StylesProvider,
  jssPreset,
  createGenerateClassName,
} from "@material-ui/styles";
import { create } from "jss";
import jssExtend from "jss-plugin-extend";
import { Provider } from "react-redux";
import store from "../redux/store";
import { AppTheme } from "../components/theme";
import Layout from "./layout/Layout";

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
  // insertionPoint: document.getElementById("jss-insertion-point") || undefined,
});

const generateClassName = createGenerateClassName();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <StylesProvider jss={jss} generateClassName={generateClassName}>
      <Provider store={store}>
        <AppTheme>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppTheme>
      </Provider>
    </StylesProvider>
  );
};

MyApp.getInitialProps = async (appContext: any): Promise<any> => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default wrapper.withRedux(MyApp);
