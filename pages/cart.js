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
          <div class="basket">
            <div class="basket-module">
              <label for="promo-code">Enter a promotional code</label>
              <input
                id="promo-code"
                type="text"
                name="promo-code"
                maxlength="5"
                class="promo-code-field input"
              />
              <button class="promo-code-cta button ">Apply</button>
            </div>
            <div class="basket-labels">
              <ul>
                <li class="item item-heading">Item</li>
                <li class="price">Price</li>
                <li class="quantity">Quantity</li>
                <li class="subtotal">Subtotal</li>
              </ul>
            </div>
            {cart.map((product) => (
              <div class="basket-product mb-5">
                <div class="item">
                  <div class="product-image">
                    <img
                      src={product.image}
                      alt="Placholder Image 2"
                      class="product-frame"
                    />
                  </div>
                  <div class="product-details">
                    <h1>
                      <strong>
                        <span class="item-quantity">4 </span> x{" "}
                      </strong>
                      {product.title}
                    </h1>
                    {/* <p>
                      <strong>Navy, Size 18</strong>
                    </p>
                    <p>Product Code - 232321939</p> */}
                  </div>
                </div>
                <div class="price"> {product.price}</div>
                <div class="quantity">
                  <input
                    type="number"
                    value="4"
                    min="1"
                    class="quantity-field input"
                  />
                </div>
                <div class="subtotal">104.00</div>
                <div class="remove">
                  <button class="">
                    <i class="far fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            ))}
            <Link href="/" class="btn" style={{ paddingTop: "20px" }}>
              <button>
                {" "}
                <i class="fas fa-long-arrow-alt-left"></i> <b>Back to shop</b>
              </button>
            </Link>
          </div>
          <aside>
            <div class="summary">
              <div class="summary-total-items">
                <span class="total-items"></span> Items in your Bag
              </div>
              <div class="summary-subtotal">
                <div class="subtotal-title">Subtotal</div>
                <div class="subtotal-value final-value" id="basket-subtotal">
                  130.00
                </div>
                <div class="summary-promo hide">
                  <div class="promo-title">Promotion</div>
                  <div class="promo-value final-value" id="basket-promo"></div>
                </div>
              </div>
              <div class="summary-delivery">
                <select
                  name="delivery-collection"
                  class="summary-delivery-selection"
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
              <div class="summary-total">
                <div class="total-title">Total</div>
                <div class="total-value final-value" id="basket-total">
                  130.00
                </div>
              </div>
              <div class="summary-checkout">
                <button class="button checkout-cta">
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
