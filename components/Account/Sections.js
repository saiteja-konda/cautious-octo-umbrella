import React, { useState, useEffect, useContext } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";

import NotListedLocationOutlinedIcon from "@material-ui/icons/NotListedLocationOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";

import { UserContext } from "../../lib/context/UserContext";
import RenderComponent from "./RenderComponent";

const Sections = () => {
  const [activeTab, setActiveTab] = useState("1");
  const { setComponent } = useContext(UserContext);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <button
        className="btn btn-sm"
        onClick={() => setComponent("order")}
      >
        Orders
      </button>
      <button
        className="btn btn-dark btn-sm"
        onClick={() => setComponent("addresses")}
      >
        Addresses
      </button>
      <hr />
      <RenderComponent />
    </div>
  );
};

export default Sections;
