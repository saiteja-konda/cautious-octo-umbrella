import React from "react";
import { CheckoutContextProvider } from "../../lib/context/CheckoutContext";
import RenderComponent from "./RenderComponent";
import Layout from "./Layout";

const Checkout = ({invite}) => {
  return (
    <CheckoutContextProvider>
      <Layout toolbar={false}>
        <RenderComponent invite={invite}/>
      </Layout>
    </CheckoutContextProvider>
  );
};

export default Checkout;
