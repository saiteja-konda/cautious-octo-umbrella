import { useStoreState } from "easy-peasy";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { CheckoutContext } from "../../lib/context/CheckoutContext";
import Invoice from "./Invoice";

const Complete = () => {
  const { response } = useStoreState((state) => state.vox);
  const { setComponent } = useContext(CheckoutContext);
  const router = useRouter();
  useEffect(() => {
    router.replace(`/user/checkout`);
    setComponent(4);
  },[]);
  return (
    <Invoice
      userDetails={response.userDetails}
      paymentmethod={response.data}
      method={response.method}
      line_items={response.line_items}
      shippingFees={response.shippingFees}
      invoice={response.invoice}
      address={response.shippingAddress}
    />
  );
};

export default Complete;
