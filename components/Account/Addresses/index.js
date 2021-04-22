import React, { useEffect, useContext } from "react";
import { UserContext } from "../../../lib/context/UserContext";
import AddressBook from "./AddressBook";
import Blank from "./Blank";

const Addresses = () => {
  const { getAddresses, userDetails } = useContext(UserContext);

  useEffect(() => {
    getAddresses(userDetails.id);
  }, []);
  return (
    <>
      {userDetails.addresses?.length === 0 || userDetails.addresses === null ? (
        <Blank />
      ) : (
        <AddressBook />
      )}
    </>
  );
};

export default Addresses;
