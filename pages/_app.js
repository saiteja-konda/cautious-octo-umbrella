import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { StoreProvider } from "easy-peasy";
import App from "next/app";
import Head from "next/head";
import PropTypes from "prop-types";
import React, { createContext, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import "react-whatsapp-widget/dist/index.css";
import { store } from "../data/store";
import { fetchAPI } from "../lib/api";
import theme from "../lib/theme";
import "../styles/globals.scss";
import "../styles/style.scss";

export const NavContext = createContext();

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const { products, categories } = pageProps;

  const [user, setUser] = useState(false);
  const [invite, setInvite] = useState(false);
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavContext.Provider
            value={{ products, categories, user, setUser, invite, setInvite }}
          >
            <Component store={store} {...pageProps} />
          </NavContext.Provider>
        </ThemeProvider>
      </StoreProvider>
    </React.Fragment>
  );
}
MyApp.getInitialProps = async (ctx) => {
  const products = await fetchAPI("/products");
  const categories = await fetchAPI("/categories");
  const promos = await fetchAPI("/promo");
  const { variants } = promos;
  const appProps = await App.getInitialProps(ctx);

  return { ...appProps, pageProps: { products, categories, variants } };
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
