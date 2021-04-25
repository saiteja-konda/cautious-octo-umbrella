import React, { createContext, useState } from "react";
export const CheckoutContext = createContext();
import { useStoreState } from "easy-peasy";

export const CheckoutContextProvider = ({ children }) => {
  const { addresses } = useStoreState((state) => state.vox);
  const [component, setComponent] = useState(0);
  const [open, setOpen] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedAddress, setSelectedAddress] = useState(
    addresses.length > 0 ? addresses[0] : "null"
  );

  const values = {
    component,
    setComponent,
    
    selectedAddress,
    setSelectedAddress,

    open,
    setOpen,
    handleOpen,
    handleClose,

    paymentLink,
    setPaymentLink,
  };

  return (
    <CheckoutContext.Provider value={values}>
      {children}
    </CheckoutContext.Provider>
  );
};
