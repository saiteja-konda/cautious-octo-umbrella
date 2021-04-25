import React from "react";
import { CheckoutContextProvider } from "../../lib/context/CheckoutContext";
import RenderComponent from "./RenderComponent";
import Layout from "./Layout";

const Checkout = () => {
  return (
    <CheckoutContextProvider>
      <Layout toolbar={false}>
        <RenderComponent />
      </Layout>
    </CheckoutContextProvider>
  );
};

export default Checkout;
