import React, { useState } from "react";
import CartItem from "./CartItem";
import { useStoreState, useStoreActions } from "easy-peasy";
import Total from "./Total";

function CartMaterial() {
  const { cart, len,  } = useStoreState((state) => state.vox);

  return (
    <div>
      {cart.lineItems
        ?.filter((product) => product.quantity >= 1)
        .map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      {/* <Total /> */}
    </div>
  );
}

export default CartMaterial;
