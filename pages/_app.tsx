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

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
});

const generateClassName = createGenerateClassName();

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <StylesProvider jss={jss} generateClassName={generateClassName}>
      <Provider store={store}>
        <AppTheme>
          <ProtectRoutes router={router}>
            <Component {...pageProps} />
          </ProtectRoutes>
        </AppTheme>
      </Provider>
    </StylesProvider>
  );
};

export default wrapper.withRedux(MyApp);
