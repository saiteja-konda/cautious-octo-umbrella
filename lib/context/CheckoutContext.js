import React, { createContext, useMemo, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
export const CheckoutContext = createContext();

export const CheckoutContextProvider = ({ children }) => {
  const [component, setComponent] = useState("address");

  const { userDetails, cart } = useStoreState((store) => store.vox);
  const { getAddresses, deleteAddress, postAddress } = useStoreActions(
    (store) => store.vox
  );

  const values = {
    userDetails,
    getAddresses,
    deleteAddress,
    postAddress,
    cart,

    //state
    component,
    setComponent,
  };

  return (
    <CheckoutContext.Provider value={values}>
      {children}
    </CheckoutContext.Provider>
  );
};
