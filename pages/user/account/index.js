import Account from "../../../components/Account";
import { useStoreActions } from "easy-peasy";
import { useEffect } from "react";
const account = () => {
  const { getToken } = useStoreActions((store) => store.vox);
  useEffect(() => {
    getToken(localStorage.getItem("token"));
  }, []);
  return <Account />;
};

export default account;
