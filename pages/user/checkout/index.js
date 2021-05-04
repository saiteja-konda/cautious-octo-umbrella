import React, { useContext } from "react";
import Checkout from "../../../components/UserCheckout";
import { NavContext } from "../../_app";

const checkout = () => {
  const { invite }= useContext(NavContext);
  return <Checkout invite={invite} />;
};


export default checkout;
