import moment from "moment";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  createMuiTheme,
  Divider,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  ThemeProvider,
  Tooltip,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import React, { useEffect, useState } from "react";
import { green, red } from "@material-ui/core/colors";
import OrderItem from "./OrderItem";

const theme = createMuiTheme({
  props: {
    MuiButton: {
      disableElevation: true,
    },
  },
  palette: {
    primary: {
      main: green["A100"],
      light: green["A100"],
      dark: ["A700"],
    },
    secondary: {
      //   main: "#19857b",
      main: red.A200,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

const useStyles = makeStyles((theme) => {
  chip: {
    color: theme.palette.error.main;
  }
});

const LatestOrders = (props) => {
  const { orders } = props;
  const [open, setOpen] = useState(false);
  const [Item, setItem] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Card {...props} elevation={0}>
        <CardHeader title="Orders" />
        <Divider />
        <PerfectScrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order Invoice</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>
                    {/* <TableCell sortDirection="desc"> */}
                    {/* <Tooltip enterDelay={300} title="Sort"> */}
                    {/* <TableSortLabel active direction="desc"> */}
                    <TableSortLabel>Amount</TableSortLabel>
                    {/* </Tooltip> */}
                  </TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders?.map((order) => (
                  <TableRow
                    hover
                    key={order.id}
                    onClick={() => {
                      handleOpen();
                      setItem(order);
                    }}
                  >
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.userDetails.fullName}</TableCell>
                    <TableCell>
                      {/* {moment(order.createdAt).format("DD/MM/YYYY")} */}₹
                      {order.invoice.amount / 100}
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={
                          order.status === "CONFIRMED" ? "primary" : "secondary"
                        }
                        classes={classes.chip}
                        label={order.status}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card>
      <OrderItem
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        Item={Item}
      />
    </ThemeProvider>
  );
};

export default LatestOrders;
