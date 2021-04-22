import { useStoreState } from "easy-peasy";
import React, { useContext } from "react";
import { UserContext } from "../../../lib/context/UserContext";
import AddressCard from "./AddressCard";

const AddressBook = () => {
  const { deleteAddress, setComponent } = useContext(UserContext);
  const { addresses } = useStoreState((store) => store.vox);
  return (
    <div className="container mt-3">
      <div
        className="btn btn-sm btn-dark"
        onClick={() => setComponent("create")}
      >
        Add New Address
      </div>
      {addresses?.map((o) => (
        <AddressCard
          deleteAddress={deleteAddress}
          setComponent={setComponent}
          address={o}
          key={o.id}
        />
      ))}
    </div>
  );
};

export default AddressBook;
