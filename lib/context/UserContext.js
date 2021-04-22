import React, { createContext, useMemo, useState } from "react";
export const UserContext = createContext();
import { useStoreState, useStoreActions } from "easy-peasy";

const UserContextProvider = ({ children }) => {
  const { userDetails, cart, addresses } = useStoreState((store) => store.vox);
  const { getAddresses, deleteAddress, postAddress } = useStoreActions(
    (store) => store.vox
  );
  const [component, setComponent] = useState("order");

  const values = useMemo(
    () => ({
      //store
      userDetails,
      getAddresses,
      deleteAddress,
      postAddress,
      cart,
      addresses,
      
      //state
      component,
      setComponent,
    }),
    [userDetails, component]
  );
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
