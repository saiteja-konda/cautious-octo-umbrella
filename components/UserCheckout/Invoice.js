import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { useStoreState } from "easy-peasy";
import _ from "lodash";
import { deepPurple, green } from "@material-ui/core/colors";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: deepPurple[800],
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: deepPurple[50],
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  Mainpaper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.dark,
  },
  Lastpaper: {
    padding: theme.spacing(2),
    textAlign: "right",
    color: theme.palette.text.dark,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.dark,
  },
  table: {
    minWidth: 300,
  },
  button: {
    backgroundColor: green["A400"],
    color: "#fff",
    textTransform: "none",
  },
}));

export default function Invoice({
  userDetails,
  paymentmethod,
  line_items,
  shippingFees,
  invoice,
  address,
  method
}) {
  const classes = useStyles();

  const usePayment = () => {
    switch (method) {
      case "card":
        return (
          <Typography component="p" variant="caption">
            Payment method : {paymentmethod.entity} <br />
            {paymentmethod.name} <br />
            <b>{paymentmethod.network}</b> {paymentmethod.type} ending with XXXX
            XXXX XXXX {paymentmethod.last4}
          </Typography>
        );
        break;
      case "vpa":
        return (
          <Typography component="p" variant="caption">
            Payment method : UPI <br />
            {paymentmethod.vpa} <br />
            <b>Reference Number : </b> {paymentmethod.rrn} <br />
            <b>Transaction ID : </b>
            {paymentmethod.upi_transaction_id}
          </Typography>
        );
      case "wallet":
        return (
          <Typography component="p" variant="caption">
            Payment method : Wallet <br />
            {paymentmethod.wallet} <br />
            <b>Transaction ID : </b> {paymentmethod.transaction_id}
          </Typography>
        );
      default:
        break;
    }
  };
  const RenderPayment = usePayment();
  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12}>
            <Paper elevation={0} className={classes.Mainpaper}>
              <Typography variant="h6" component="h6">
                Thank you for shopping with us!
              </Typography>
              <Typography variant="body2" component="h6">
                Your Order <b>{invoice.receipt}</b> is received successfully
              </Typography>
              <Typography variant="caption" component="p">
                You will informed shortly once the order confirms
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" component="h6">
              Invoice
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0} className={classes.paper}>
              <Typography variant="subtitle1" component="h6">
                Your Information
              </Typography>
              <Divider />
              <br />
              <Typography component="p" variant="caption">
                {userDetails.fullName} <br />
                {userDetails.username} <br />
                {userDetails.phoneNumber} <br />
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0} className={classes.paper}>
              <Typography variant="subtitle1" component="h6">
                Payment Information
              </Typography>
              <Divider />
              <br />
              {RenderPayment}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0} className={classes.paper}>
              <Typography variant="subtitle1" component="h6">
                Shipping Address
              </Typography>
              <Divider />
              <br />
              <Typography gutterBottom variant="body2" component="h4">
                {address.type}
              </Typography>
              <Typography variant="caption" component="p">
                {`${address.fullName}`}
              </Typography>
              <Typography variant="caption" component="p">
                {`${address.phoneNumber}`}
              </Typography>
              <Typography variant="caption" component="p">
                {`${address.line1}, ${address.line2}`}{" "}
              </Typography>
              <Typography variant="caption" component="p">
                {`${address.state},${" "}${address.city},${" "}${
                  address.zipcode
                }`}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0} className={classes.paper}>
              <Typography variant="subtitle1" component="h6">
                Ordered Items
              </Typography>
              <Divider />
              <br />
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Item</StyledTableCell>
                      <StyledTableCell align="right">Price</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {line_items.map((row) => (
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
          <Grid item xs={12}>
            <Paper elevation={0} className={classes.Lastpaper}>
              <Divider />
              <List>
                <ListItem>
                  <ListItemText secondary="subtotal" />
                  <ListItemSecondaryAction>
                    <Typography color="textSecondary">
                      ₹{invoice.amount / 100 - shippingFees}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText secondary="shipping charges" />
                  <ListItemSecondaryAction>
                    <Typography color="textSecondary">
                      ₹{shippingFees}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Total" />
                  <ListItemSecondaryAction>
                    ₹{invoice.amount / 100}
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
        </Grid>
      </Container>
    </div>
  );
}
