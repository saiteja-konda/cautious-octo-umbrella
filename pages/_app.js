// import { useEffect } from "react";
import "../styles/globals.css";
import { useStore, StoreProvider, useStoreActions } from "easy-peasy";
import { store } from "../store/store";
function MyApp({ Component, pageProps }) {


  return (
    <StoreProvider store={store}>
      <Component store={store} {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
