import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useStoreState } from "easy-peasy";
import excerpts from "excerpts";
import Link from "next/link";
function Cart({ user, setUser }) {
  const { cart } = useStoreState((state) => state.vox);
  const [qty, setQty] = useState(1);
  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <body>
        <main>
          <div className="basket">
            <div className="basket-module">
              <label for="promo-code">Enter a promotional code</label>
              <input
                id="promo-code"
                type="text"
                name="promo-code"
                maxlength="5"
                className="promo-code-field input"
              />
              <button className="promo-code-cta button ">Apply</button>
            </div>
            <div className="basket-labels">
              <ul>
                <li className="item item-heading">Item</li>
                <li className="price">Price</li>
                <li className="quantity">Quantity</li>
                <li className="subtotal">Subtotal</li>
              </ul>
            </div>
            {cart.map((product) => (
              <div key={product.id} className="basket-product mb-5">
                <div className="item">
                  <div className="product-image">
                    <img
                      src={product.image}
                      alt="Placholder Image 2"
                      className="product-frame"
                    />
                  </div>
                  <div className="product-details">
                    <h1>
                      <strong>
                        <span className="item-quantity">4 </span> x{" "}
                      </strong>
                      {product.title}
                    </h1>
                    {/* <p>
                      <strong>Navy, Size 18</strong>
                    </p>
                    <p>Product Code - 232321939</p> */}
                  </div>
                </div>
                <div className="price"> {product.price}</div>
                <div className="quantity">
                  <input
                    type="number"
                    value="4"
                    min="1"
                    className="quantity-field input"
                  />
                </div>
                <div className="subtotal">104.00</div>
                <div className="remove">
                  <button className="">
                    <i className="far fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            ))}
            <Link href="/" className="btn" style={{ paddingTop: "20px" }}>
              <button>
                {" "}
                <i className="fas fa-long-arrow-alt-left"></i>{" "}
                <b>Back to shop</b>
              </button>
            </Link>
          </div>
          <aside>
            <div className="summary">
              <div className="summary-total-items">
                <span className="total-items"></span> Items in your Bag
              </div>
              <div className="summary-subtotal">
                <div className="subtotal-title">Subtotal</div>
                <div
                  className="subtotal-value final-value"
                  id="basket-subtotal"
                >
                  130.00
                </div>
                <div className="summary-promo hide">
                  <div className="promo-title">Promotion</div>
                  <div
                    className="promo-value final-value"
                    id="basket-promo"
                  ></div>
                </div>
              </div>
              <div className="summary-delivery">
                <select
                  name="delivery-collection"
                  className="summary-delivery-selection"
                >
                  <option value="0" selected="selected">
                    Select Collection or Delivery
                  </option>
                  <option value="collection">Collection</option>
                  <option value="first-class">Royal Mail 1st Class</option>
                  <option value="second-class">Royal Mail 2nd Class</option>
                  <option value="signed-for">
                    Royal Mail Special Delivery
                  </option>
                </select>
              </div>
              <div className="summary-total">
                <div className="total-title">Total</div>
                <div className="total-value final-value" id="basket-total">
                  130.00
                </div>
              </div>
              <div className="summary-checkout">
                <button className="button checkout-cta">
                  Go to Secure Checkout
                </button>
              </div>
            </div>
          </aside>
        </main>
      </body>
    </div>
  );
}

export default Cart;
