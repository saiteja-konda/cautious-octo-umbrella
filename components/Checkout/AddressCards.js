import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const AddressCards = ({ items, onSelect, selectedAddress }) => {
  const { deleteAddress } = useStoreActions((store) => store.vox);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        margin: "0px",
        marginBottom: "20px",
      }}
    >
      {items?.map((address) => (
        <div className="p-1 m-0" style={{ width: "250px" }}>
          <div>
            <b>{address.fullName}</b>
          </div>
          <div>{address.phoneNumber}</div>
          <div>{`${address.line1}, ${address.line2}`}</div>
          <div>{address.state}</div>
          <div>{address.city}</div>
          <div>{address.zipcode}</div>
          <br />
          <div
            className="btn-group btn-block mb-0"
            role="group"
            aria-label="Basic example"
          >
            <button type="button" className="btn btn-light btn-sm">
              Edit
            </button>
            <button
              type="button"
              onClick={() => deleteAddress(address)}
              className="btn btn-light btn-sm"
            >
              Delete
            </button>
          </div>
          <button
            className={`btn btn-sm mt-0 btn-${
              address.id === selectedAddress.id ? "warning" : "dark"
            } btn-block`}
            onClick={() => onSelect(address)}
          >
            Deliver to this address
          </button>
        </div>
      ))}
    </div>
  );
};

export default AddressCards;

//  <div style={{ display: "flex", flexDirection: "row", overflowX: "scroll" }}>
//    {items.map((address) => (
//      <div style={{ margin: "1px", width: "600px" }}>
//  <div>
//    <b>{address.fullName}</b>
//  </div>
//  <div>{address.phoneNumber}</div>
//  <div>{`${address.line1}, ${address.line2}`}</div>
//  <div>{address.state}</div>
//  <div>{address.city}</div>
//  <div>{address.zipcode}</div>
//  <br />
//  <div
//    className="btn-group btn-block mb-0"
//    role="group"
//    aria-label="Basic example"
//  >
//    <button type="button" className="btn btn-light btn-sm">
//      Edit
//    </button>
//    <button type="button" className="btn btn-light btn-sm">
//      Delete
//    </button>
//  </div>
//  <button
//    className={`btn btn-sm mt-0 btn-${
//      address.id === selectedAddress.id ? "warning" : "dark"
//    } btn-block`}
//    onClick={() => onSelect(address)}
//  >
//    Deliver to this address
//  </button>
//      </div>
//    ))}
//  </div>;
