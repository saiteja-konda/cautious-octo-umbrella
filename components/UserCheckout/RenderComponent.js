import React, { useContext, useEffect } from "react";
import { CheckoutContext } from "../../lib/context/CheckoutContext";
import StepZero from "./StepZero";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import Success from "./Success";
import { useRouter } from "next/router";
import Complete from "./complete";

const RenderComponent = ({invite}) => {
  const { component, setComponent } = useContext(CheckoutContext);
  const router = useRouter();
  const query = router.query;

  const { clan } = query;
  useEffect(() => {
    if (clan === "SdRoLKRaD") {
      setComponent(3);
    }
  }, []);
  switch (component) {
    case 0:
      return <StepZero />;
    case 1:
      return <StepOne invite={invite}/>;
    case 2:
      return <StepTwo />;
    case 3:
      return <Success />;
    case 4:
      return <Complete />;
    default:
      return <StepZero />;
  }
};

export default RenderComponent;
