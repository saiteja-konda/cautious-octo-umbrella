import { useStoreActions } from "easy-peasy";
import { useEffect } from "react";
import Account from "../../../components/Account";
const account = () => {
  const { getToken } = useStoreActions((store) => store.vox);
  useEffect(() => {
    getToken(localStorage.getItem("token"));
  }, []);
  return <Account />;
};

export default account;
