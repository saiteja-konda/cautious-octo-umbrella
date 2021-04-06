import { useEffect } from "react";
import "../styles/globals.css";
import { useStore, StoreProvider, useStoreActions } from "easy-peasy";
import { store } from "../store/store";
import {useState} from "react"
// import jwt_decode from "jwt-decode";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(false);
  // useEffect(() => {
  //   if (localStorage.getItem("token") != null) {
  //     setUser(true);
  //     jwt_decode(localStorage.getItem("token"));
  //   }
  // }, []);
  return (
    <StoreProvider store={store}>
      <Component store={store} setUser={setUser} user={user} {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
