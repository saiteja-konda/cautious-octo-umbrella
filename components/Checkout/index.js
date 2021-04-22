import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../lib/context/UserContext";
import { NavContext } from "../../pages/_app";
import AddressCards from "./AddressCards";
import CreateAddress from "../Account/Addresses/CreateAddress";
import NavBar from "../Navigation/NavBar";
import OrderList from "./OrderList";
import { useStoreActions, useStoreState } from "easy-peasy";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import StickyFooter from "../../components/StickyFooter";
const Checkout = ({ userId, user }) => {
  const { setComponent } = useContext(UserContext);
  const { userDetails, cart, addresses } = useStoreState((store) => store.vox);
  const { lineItems } = cart;
  const {
    getAddresses,
    deleteAddress,
    postAddress,
    getToken,
  } = useStoreActions((store) => store.vox);
  useEffect(async () => {
    if (localStorage.getItem("token") != null) {
      const token = localStorage.getItem("token");
      getToken(token).then(() => getAddresses(userDetails.id));
    }
  }, []);

  const [selectedAddress, setSelectedAddress] = useState("");
  const setAddress = (address) => {
    setSelectedAddress(address);
  };

  return (
    <>
      <div>
        <NavBar />
        <div className="container-lg">
          <div className="row pt-5">
            <div className="col-md-6 col-sm-12">
              <b>Shipping Address and Details</b>
              <hr />
              <div>
                {addresses.length > 0 ? <b>Choose Address</b> : " "}
                <div>
                  <AddressCards
                    items={addresses}
                    selectedAddress={selectedAddress}
                    onSelect={setAddress}
                  />
                </div>
              </div>
              <CreateAddress
                setComponent={setComponent}
                postAddress={postAddress}
                userDetails={userDetails}
                title={"Add New Address"}
                cancelButton={false}
                hr={false}
                className="mt-5"
              />
            </div>
            <div className="col-md-6 col-sm-12">
              <b>Your Order</b>
              <hr />
              <OrderList
                selectedAddress={selectedAddress}
                lineItems={lineItems}
              />
            </div>
          </div>
        </div>
        <StickyFooter />
      </div>
    </>
  );
};

export default Checkout;
