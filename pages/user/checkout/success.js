import { useStoreActions } from "easy-peasy";
import React, { useEffect } from "react";
import Success from "../../../components/UserCheckout/Success";

const success = () => {
  const { ResetCart } = useStoreActions((store) => store.vox);
  useEffect(() => ResetCart(), []);
  return <Success />;
};

export default success;
