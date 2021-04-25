import jwtDecode from "jwt-decode";
import UserContextProvider from "../../../lib/context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import Checkout from "../../../components/UserCheckout";

const checkout = () => {
  return <Checkout />
};

export default checkout;
