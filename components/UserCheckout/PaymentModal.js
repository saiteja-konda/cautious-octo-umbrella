import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { CheckoutContext } from "../../lib/context/CheckoutContext";
import { Button } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #ede7fd",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    backgroundColor: deepPurple[800],
    color: "#fff",
  },
  link: {
    textDecoration: "none",
  },
}));

export default function PaymentModal() {
  const { handleOpen, handleClose, open, paymentLink } = useContext(
    CheckoutContext
  );
  const classes = useStyles();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h5 id="transition-modal-title">Payment</h5>
            <p id="transition-modal-description">
              complete payment securly with Razorpay{" "}
            </p>
            <a href={paymentLink} className={classes.link}>
              <Button fullWidth className={classes.button}>
                Pay
              </Button>
            </a>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
