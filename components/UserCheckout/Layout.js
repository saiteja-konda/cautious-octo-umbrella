import { Toolbar } from "@material-ui/core";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import NavBar from "../Navigation/NavBar";
import StickyFooter from "../StickyFooter";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import StepConnector from "@material-ui/core/StepConnector";
import { CheckoutContext } from "../../lib/context/CheckoutContext";
import { green } from "@material-ui/core/colors";

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: green[800],
    },
  },
  completed: {
    "& $line": {
      // borderColor: "#784af4",
      borderColor: green[800],
    },
  },
  line: {
    // borderColor: "#eaeaf0",
    borderColor: green[100],
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    // color: "#eaeaf0",
    color: green[100],
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: green[100],
    // color: "#784af4",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: green[800],
    // color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

const Layout = ({ children, toolbar, heading, footer, hideSteps }) => {
  const { component } = useContext(CheckoutContext);
  const [activeStep, setActiveStep] = React.useState(component);

  function getStepContent(component) {
    switch (component) {
      case 0:
        return "Select campaign settings...";
      case 1:
        return "What is an ad group anyways?";
      case 2:
        return "This is the bit I really care about!";
      case 3 :
        return "Final Step"
      default:
        return "Unknown step";
    }
  }
  function getSteps() {
    return [
      "Shipping Address and Details",
      "Review Order",
      "Confirmation and Payment",
      "Order Summary"
    ];
  }

  const steps = getSteps();

  return (
    <div>
      <Head>{heading}</Head>
      <NavBar />
      {toolbar ? <Toolbar /> : ""}
      <div className="mt-2" />
      {hideSteps && (
        <Stepper
          alternativeLabel
          activeStep={component}
          connector={<QontoConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
      {children}
      {footer ? <StickyFooter /> : ""}
    </div>
  );
};

Layout.defaultProps = {
  heading: "Baskinnature",
  footer: true,
  toolbar: true,
  hideSteps: true,
};

export default Layout;
