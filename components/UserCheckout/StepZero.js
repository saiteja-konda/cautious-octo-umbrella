import React, { useContext, useEffect, useState } from "react";

import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Snackbar,
} from "@material-ui/core";
import green from "@material-ui/core/colors/green";

import { useStoreActions, useStoreState } from "easy-peasy";

import Layout from "./Layout";
import AddressCards from "./AddressCards";
import { CheckoutContext } from "../../lib/context/CheckoutContext";
import CreateAddress from "../Account/Addresses/CreateAddress";
import { deepPurple } from "@material-ui/core/colors";

import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: "flex",
  },
  paper: {
    padding: "0px",
    color: theme.palette.text.dark,
  },
  paper2: {
    padding: "0px",
    color: theme.palette.text.dark,
    backgroundColor: "#b79ff9",
  },
  button: {
    textTransform: "none",
    margin: "5px",
    backgroundColor: deepPurple[800],
    color: "#fff",
  },
  review: {
    textTransform: "none",
    backgroundColor: green[500],
    color: "#fff",
  },
}));

const StepZero = () => {
  useEffect(() => {
    const resetScrollFun = () => {
      window.scrollTo(0, 0);
    };
    resetScrollFun();
  }, []);
  const [open, setOpen] = useState(false);
  const { userDetails, cart, addresses } = useStoreState((store) => store.vox);
  const { setComponent, selectedAddress, setSelectedAddress } = useContext(
    CheckoutContext
  );
  const setAddress = (address) => {
    setSelectedAddress(address);
  };
  const classes = useStyles();
  const {
    getAddresses,
    deleteAddress,
    postAddress,
    getToken,
  } = useStoreActions((store) => store.vox);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(async () => {
    if (localStorage.getItem("token") != null) {
      const token = localStorage.getItem("token");
      getToken(token);
      getAddresses(userDetails.id);
    }
  }, []);

  const useAddress = () => {
    if (addresses.length > 0) {
      <Paper elevation={0} className={classes.paper}>
        <AddressCards
          items={addresses}
          selectedAddress={selectedAddress}
          onSelect={setAddress}
        />
      </Paper>;
    } else if (addresses.length < 0) {
      <Paper elevation={0} className={classes.paper}>
        <CreateAddress
          username={userDetails.id}
          postAddress={postAddress}
          title={"Add New Address"}
          setSelectedAddress={setSelectedAddress}
        />
      </Paper>;
    }
  };
  const Renderaddress = useAddress();

  return (
    <>
      <Container maxWidth="sm">
        <Grid container>
          <Grid item xs={12}>
            <Paper elevation={0} className={classes.paper}>
              <Paper elevation={0} className={classes.paper}>
                <AddressCards
                  items={addresses}
                  selectedAddress={selectedAddress}
                  onSelect={setAddress}
                />
              </Paper>
              <CreateAddress
                username={userDetails.id}
                postAddress={postAddress}
                title={"Add New Address"}
              />
            </Paper>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert severity="error" onClose={handleClose}>
                Add address to continue
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Container>
      <div className="container d-flex justify-content-center mt-3">
        <div>
          <Button
            variant="contained"
            size="small"
            onClick={() =>
              selectedAddress === "null" ? setOpen(true) : setComponent(1)
            }
            className={classes.button}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default StepZero;

// <Grid container>
//   <Grid item xs={12} sm={6}>
//     <Paper elevation={0} className={classes.paper}>
//       <CreateAddress
//         username={userDetails.id}
//         postAddress={postAddress}
//         title={"Add New Address"}
//       />
//     </Paper>
//   </Grid>
//   <Grid item xs={12} sm={6}>
// <Paper elevation={0} className={classes.paper}>
//   <AddressCards
//     items={addresses}
//     selectedAddress={selectedAddress}
//     onSelect={setAddress}
//   />
// </Paper>
//   </Grid>
//   <Grid item xs={12}>
//     <Paper elevation={0} className={classes.paper}>
//       <Button variant="contained" onClick={() => setComponent(1)}>
//         Next
//       </Button>
//     </Paper>
//   </Grid>
// </Grid>;
