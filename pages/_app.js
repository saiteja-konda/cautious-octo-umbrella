import React, { createContext } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import App from "next/app";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../lib/theme";
import { StoreProvider } from "easy-peasy";
import { store } from "../data/store";
import { useState } from "react";
import WhatsAppWidget from "react-whatsapp-widget";
import "react-whatsapp-widget/dist/index.css";
import "../styles/globals.scss";
import "../styles/style.scss";
import "react-multi-carousel/lib/styles.css";
import { fetchAPI } from "../lib/api";

export const NavContext = createContext();

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const { products, categories } = pageProps;

  const [user, setUser] = useState(false);

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
          <NavContext.Provider value={{ products, categories, user, setUser }}>
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
  const appProps = await App.getInitialProps(ctx);

  return { ...appProps, pageProps: { products, categories } };
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
