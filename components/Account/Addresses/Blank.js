import React, { useContext } from "react";
import { UserContext } from "../../../lib/context/UserContext";

const Blank = () => {
  const { setComponent } = useContext(UserContext);
  return (
    <div
      className="container"
      style={{
        padding: "70px 0",
        textAlign: "center",
      }}
    >
      Your address book is empty
      <br />
      <br />
      <br />
      <div
        className="btn btn-dark btn-sm"
        onClick={() => setComponent("create")}
      >
        Click here Add
      </div>
    </div>
  );
};

export default Blank;
