import React from "react";
const OrderItem = ({ item }) => {
  const test = item.options
    .filter((o) => o.price.toString() === item.price.toString())
    .map((o) => o.label);
  return (
    <div className="container mb-3 mt-3">
      <div className="row">
        <div className="col-8 p-0 m-0">
          <div className="d-flex m-0 p-0">
            <div>
              <img
                src={item.image}
                style={{ width: "78px", height: "78px", objectFit: "contain" }}
              />
            </div>
            <div style={{ marginLeft: "8px" }}>
              <b>{item.title}</b>
              <br />
              <p className="text-secondary m-0 fw-light">
                Quantity :{item.quantity}
              </p>
              <p className="text-secondary">
                Size :{/* {item.choice[0].label} */}
                {test}
              </p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ marginRight: "28px" }}>
              {item.price * item.quantity}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
