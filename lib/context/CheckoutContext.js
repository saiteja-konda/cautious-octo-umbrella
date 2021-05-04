import { useStoreState } from "easy-peasy";
import React, { createContext, useState } from "react";
export const CheckoutContext = createContext();

export const CheckoutContextProvider = ({ children }) => {
  const { addresses } = useStoreState((state) => state.vox);
  const [component, setComponent] = useState(0);
  const [open, setOpen] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0.0);
  const [openFailed, setOpenFailed] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const [response, setResponse] = useState({});

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

    coupon,
    setCoupon,
    couponApplied,
    setCouponApplied,
    discount,
    setDiscount,
    openFailed,
    setOpenFailed,
    openSuccess,
    setOpenSuccess,
  };

  return (
    <CheckoutContext.Provider value={values}>
      {children}
    </CheckoutContext.Provider>
  );
};
