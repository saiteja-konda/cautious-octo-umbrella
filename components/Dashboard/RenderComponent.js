import React, { useContext } from "react";
import Articles from "../Blog/Articles/Articles";
import Newsletter from "../Blog/NewLetter/Newsletter";
import About from "../Settings/About";
import Terms from "../Settings/Terms";
import ReturnsPolicy from "../Settings/ReturnsPolicy";
import Credentials from "../Settings/Credentials";
import Order from "../Order/Order";
import { DashboardContext } from "../../lib/context/DashboardContext";
import ProductCrud from "./ProductCrud";
import { StoreProvider } from "easy-peasy";
import { store0 } from "../../data/store";
import Carousel from "../Carousel/Carousel";
import Referees from "../Referees/Referees";
import Tesmonials from "../Tesmonials/Testmonials";
function RenderComponent({ site }) {
  const { component } = useContext(DashboardContext);
  const ComponentGenerator = () => {
    switch (component) {
      case "Products":
        return <ProductCrud />;
      case "Orders":
        return (
          <StoreProvider store={store0}>
            <Order />
          </StoreProvider>
        );
      case "Articles":
        return <Articles />;
      case "Newsletter":
        return <Newsletter />;
      case "About":
        return <About site={site} />;
      case "Terms and conditions":
        return <Terms />;
      case "Return Policy":
        return <ReturnsPolicy />;
      case "Change Credntials":
        return <Credentials />;
      case "Banners":
        return (
          <StoreProvider store={store0}>
            <Carousel />
          </StoreProvider>
        );
      case "Referees":
        return <Referees />;
      case "Testmonials":
        return <Tesmonials />;
      default:
        return <ProductCrud />;
    }
  };
  const UseComponentRender = ComponentGenerator();
  return <div>{UseComponentRender}</div>;
}

export default RenderComponent;
