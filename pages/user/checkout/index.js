import jwtDecode from "jwt-decode";
import UserContextProvider from "../../../lib/context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import Checkout from "../../../components/Checkout";

const checkout = () => {
  const { userDetails, addresses } = useStoreState((store) => store.vox);
  const { getAddresses, getToken } = useStoreActions((store) => store.vox);

  useEffect(async () => {
    if (localStorage.getItem("token") != null) {
      const token = localStorage.getItem("token");
      getToken(token).then(() => getAddresses(userDetails.id));
    }
  }, []);
  return (
    <UserContextProvider>
      <Checkout />
    </UserContextProvider>
  );
};

export default checkout;
