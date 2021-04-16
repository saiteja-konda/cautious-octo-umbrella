import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
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
import "react-quill/dist/quill.snow.css";


export default function MyApp(props) {
  const { Component, pageProps } = props;
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
          <Component
            store={store}
            setUser={setUser}
            user={user}
            {...pageProps}
          />
        </ThemeProvider>
      </StoreProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
