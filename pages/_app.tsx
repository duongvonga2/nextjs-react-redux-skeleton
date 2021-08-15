import "../styles/globals.css";
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
import Layout from "../components/Layout/Layout";

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

export default wrapper.withRedux(MyApp);
