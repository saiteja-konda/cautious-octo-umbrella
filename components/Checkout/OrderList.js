import axios from "axios";
import { useStoreState } from "easy-peasy";
import React, { useState } from "react";
import OrderItem from "./OrderItem";
import shortid from "shortid";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";

const OrderList = ({ selectedAddress }) => {
  const { cart, userDetails } = useStoreState((store) => store.vox);
  const { lineItems } = cart;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [isLoading, setLoading] = useState(false);
  const [payButton, setPayButton] = useState("none");
  const [confirmButton, setConfirmButton] = useState("block");
  const [paymentLink, setPaymentLink] = useState("");
  const cartTotalCounter = () => {
    let count = 0;
    cart?.lineItems
      ?.filter((p) => p.quantity >= 1)
      .forEach((e) => {
        count = e.price * e.quantity + count;
      });
    return count;
  };
  const sum = cartTotalCounter();
  const shppingFees = 85.0;
  const discount = 0.0;
  const tax = 0.0;
  const total = shppingFees + sum + tax - discount;

  const handleSubmit = () => {
    setLoading(true);
    const description = "Payment for the purchase at Bask In Nature.in";
    let line_items = [];
    lineItems.forEach((product) => {
      let finalProd = {
        name: product.title,
        description: `${product.quantity} item of ${product.title}`,
        quantity: product.quantity,
        amount: product.price + shppingFees * 100,
        currency: "INR",
        type: "invoice",
      };
      line_items.push(finalProd);
    });
    const invoice = {
      receipt: shortid(),
      description,
      type: "link",
      amount: (sum + shppingFees) * 100,
      callback_url: "http://localhost:3000/user/checkout/success",
      callback_method: "get",
      // line_items,
    };
    axios
      .post(`/api/order/payment`, invoice)
      .then((res) => {
        const { data } = res;
        const { receipt } = invoice;
        setPaymentLink(data.short_url);
      })
      .then(() => setConfirmButton("none"))
      .then(() => setPayButton("block"));
    console.log(invoice);
  };
  return (
    <div>
      <div style={{ backgroundColor: "honeydew", padding: "20px" }}>
        {lineItems.map((item) => (
          <OrderItem item={item} />
        ))}
        <hr />
        <div style={{ display: "flex" }}>
          <input
            className="form-control"
            placeholder="Gift card or discout code"
            type="text"
            style={{ width: "100%" }}
          />
          <div className="btn btn-dark">Apply</div>
        </div>
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-10">
              <div>
                <b>Subtotal</b>
              </div>
              <div>
                <b>Tax</b>
              </div>
              <div>
                <b>Shipping Fees</b>
              </div>
              <div>
                <b>Discount</b>
              </div>
            </div>
            <div
              className="col-2"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <div style={{ marginRight: "28px" }}>₹{sum}</div>
              <div>₹{tax}</div>
              <div>₹{shppingFees}</div>
              <div>₹{discount}</div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-10">
              <div>
                <h5>Total amount</h5>
              </div>
            </div>
            <div
              className="col-2"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <div>
                <h5 style={{ marginRight: "28px" }}>₹{total}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button color="success" className="btn btn-block" onClick={toggle}>
        Review Order
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Review and Pay</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-12">
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>price</th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((o, index = 2) => (
                    <tr className="m-0 p-0" key={o.id}>
                      <th row>{index++}</th>
                      <td>
                        {o.options
                          .filter(
                            (i) => i.price.toString() === o.price.toString()
                          )
                          .map((o) => o.label)}{" "}
                        of {o.title}
                      </td>
                      <td>{o.quantity}</td>
                      <td>₹{o.price * o.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div
              className="col-12"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div>
                <div className="card">
                  <div className="card-header">Shipping Address</div>
                  <div className="card-body">
                    <h5 className="card-title">{selectedAddress.fullName}</h5>
                    <p className="card-subtitle mb-2 text-muted">
                      {selectedAddress.type}
                    </p>
                    {`${selectedAddress.phoneNumber}, ${selectedAddress.line1},
                    ${selectedAddress.line2}, ${selectedAddress.city},
                    ${selectedAddress.zipcode}, ${selectedAddress.state}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {isLoading === true ? (
            <Button
              color="danger"
              size="sm"
              disabled={true}
              // onClick={async () => {
              //   setLoading(true);
              //   setConfirmButton("none");
              //   setPayButton("block");
              // }}
              style={{ display: `${confirmButton}` }}
            >
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>{" "}
              Preparing for payment
            </Button>
          ) : (
            <Button
              color="primary"
              size="sm"
              onClick={handleSubmit}
              style={{ display: `${confirmButton}` }}
            >
              Confirm
            </Button>
          )}
          <Button
            color="success"
            size="sm"
            style={{ display: `${payButton}` }}
            onClick={toggle}
          >
            <a
              style={{ color: "#fff", textDecoration: "none" }}
              href={paymentLink}
            >
              Pay
            </a>
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default OrderList;
