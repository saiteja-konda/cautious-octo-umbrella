import React from "react";
import Complete from "../../../components/UserCheckout/complete";
import { CheckoutContextProvider } from "../../../lib/context/CheckoutContext";
const invoice = () => {
  return (
    <CheckoutContextProvider>
      <Complete />
    </CheckoutContextProvider>
  );
};

export default invoice;
