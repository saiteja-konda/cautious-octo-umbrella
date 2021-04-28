import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {
  AppBar,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
  Snackbar,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { deepPurple,blue } from "@material-ui/core/colors";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const note = () => {
  toast.info("Copied to clipboard", {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: blue[800],
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: blue[50],
    },
  },
}))(TableRow);

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 300,
  },
  base: {
    padding: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  toolbar: {
    backgroundColor: blue[800],
    color: theme.palette.common.white,
    borderRadius: "8px",
  },
}));

export default function OrderItem({ open, handleClose, Item }) {
  const classes = useStyles();

  // getModalStyle is not a pure function, we roll the style only on the first render
  const body = (
    <div style={{ overflowY: "scroll" }}>
      <Paper style={{ left: "350px", top: "20px" }} className={classes.paper}>
        {Item && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Toolbar className={classes.toolbar}>
                <Typography variant="subtitle1" component="h6">
                  ORDER : {Item.id}
                </Typography>
              </Toolbar>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.base} elevation={0}>
                <Typography variant="body" component="h6">
                  Customer Details
                </Typography>
                <Divider className={classes.divider} />
                <Typography component="p" variant="caption">
                  {Item.userDetails.fullName} <br />
                  {Item.userDetails.username} <br />
                  {Item.userDetails.phoneNumber} <br />
                </Typography>
              </Paper>
              <Paper className={classes.base} elevation={0}>
                <Typography variant="body" component="h6">
                  Shipping Details
                </Typography>
                <Divider className={classes.divider} />
                <Typography gutterBottom variant="body2" component="h4">
                  {Item.shippingAddress.type}
                </Typography>
                <Typography variant="caption" component="p">
                  {`${Item.shippingAddress.fullName}`}
                </Typography>
                <Typography variant="caption" component="p">
                  {`${Item.shippingAddress.phoneNumber}`}
                </Typography>
                <Typography variant="caption" component="p">
                  {`${Item.shippingAddress.line1}, ${Item.shippingAddress.line2}`}{" "}
                </Typography>
                <Typography variant="caption" component="p">
                  {`${Item.shippingAddress.state},${" "}${
                    Item.shippingAddress.city
                  },${" "}${Item.shippingAddress.zipcode}`}
                </Typography>
              </Paper>
              <Paper elevation={0} className={classes.Lastpaper}>
                <Divider />
                <List>
                  <ListItem>
                    <ListItemText secondary="subtotal" />
                    <ListItemSecondaryAction>
                      <Typography color="textSecondary">
                        ₹{Item.invoice.amount / 100 - Item.shippingFees}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary="shipping charges" />
                    <ListItemSecondaryAction>
                      <Typography color="textSecondary">
                        ₹{Item.shippingFees}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Total" />
                    <ListItemSecondaryAction>
                      ₹{Item.invoice.amount / 100}
                    </ListItemSecondaryAction>
                  </ListItem>
                  {/* <ListItem>
                  <ListItemSecondaryAction>
                    <Button
                      className={classes.button}
                      variant="contained"
                      size="small"
                    >
                      Download Invoice
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem> */}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.base} elevation={0}>
                <Typography variant="body" component="h6">
                  Order Details
                </Typography>
                <Divider className={classes.divider} />
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Item</StyledTableCell>
                        <StyledTableCell align="right">Price</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Item.line_items.map((row) => (
                        <StyledTableRow key={row.amount}>
                          <StyledTableCell component="th" scope="row">
                            {row.description}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.amount}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <CopyToClipboard
                onCopy={() => note()}
                text={Item.razorpay_payment_id}
              >
                <Paper elevation={0} className={classes.base}>
                  <Typography variant="caption" component="p">
                    RazorPay Id :{Item.razorpay_payment_id}
                    <Tooltip title={"Copy to Clip board"}>
                      <IconButton>
                        <FileCopyIcon color="secondary" fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                </Paper>
              </CopyToClipboard>
            </Grid>
          </Grid>
        )}
      </Paper>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      ;
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
