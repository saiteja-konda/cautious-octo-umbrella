import React, { useContext } from "react";
import Articles from "../Blog/Articles/Articles";
import Newsletter from "../Blog/NewLetter/Newsletter";
import About from "../Settings/About";
import Terms from "../Settings/Terms";
import ReturnsPolicy from "../Settings/ReturnsPolicy";
import Credentials from "../Settings/Credentials";
import Order from "../Order/Order";
import { DashboardContext } from "./DashboardContext";
import ProductCrud from "./ProductCrud";

function RenderComponent() {
  const { component } = useContext(DashboardContext);
  const ComponentGenerator = () => {
    switch (component) {
      case "Products":
        return <ProductCrud />;
      case "Orders":
        return <Order />;
      case "Articles":
        return <Articles />;
      case "Newsletter":
        return <Newsletter />;
      case "About":
        return <About />;
      case "Terms and conditions":
        return <Terms />;
      case "Return Policy":
        return <ReturnsPolicy />;
      case "Change Credntials":
        return <Credentials />;
      default:
        return <ProductCrud />;
    }
  };
  const UseComponentRender = ComponentGenerator();
  return <div>{UseComponentRender}</div>;
}

export default RenderComponent;
