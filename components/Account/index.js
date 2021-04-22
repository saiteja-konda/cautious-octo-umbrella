import NavBar from "../Navigation/NavBar";
import React from "react";

import UserContextProvider from "../../lib/context/UserContext";
import UserDetials from "./UserDetails";
import Sections from "./Sections";

const Account = () => {
  return (
    <UserContextProvider>
      <NavBar />
      <div>
        <div className="row">
          <div className="pt-4 mt-4  mr-2 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <UserDetials />
          </div>
          <div className="pt-4 mt-4 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <div className="col-12">
              <Sections />
            </div>
          </div>
        </div>
      </div>
    </UserContextProvider>
  );
};

export default Account;
