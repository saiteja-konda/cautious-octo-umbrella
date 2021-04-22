import React, { useContext } from "react";
import Orders from "./Orders";
import Addresses from "./Addresses";
import { UserContext } from "../../lib/context/UserContext";
import EditAddress from "./Addresses/EditAddress";
import CreateAddress from "./Addresses/CreateAddress";
const RenderComponent = () => {
  const { component, setComponent, postAddress, userDetails } = useContext(
    UserContext
  );

  const useComponentGenerator = () => {
    switch (component) {
      case "order":
        return <Orders />;
      case "addresses":
        return <Addresses />;
      case "create":
        return (
          <CreateAddress
            setComponent={setComponent}
            postAddress={postAddress}
            userDetails={userDetails}
            title={"Add New Address"}
            cancelButton={true}
          />
        );
      case "edit":
        return <EditAddress />;
      default:
        return <Orders />;
    }
  };
  const generateComponent = useComponentGenerator();
  return <>{generateComponent}</>;
};

export default RenderComponent;
