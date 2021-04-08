import "../styles/globals.scss";
import {  StoreProvider, } from "easy-peasy";
import { store } from "../store/store";
import {useState} from "react"

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(false);

  return (
    <StoreProvider store={store}>
      <Component store={store} setUser={setUser} user={user} {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
