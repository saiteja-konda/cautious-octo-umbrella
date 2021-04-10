import React from "react";
import CartItem from "./CartItem";
import { useStoreState, useStoreActions } from "easy-peasy";

function CartMaterial() {
  const { cart, len } = useStoreState((state) => state.vox);

  return (
    <div>
      {cart.lineItems
        ?.filter((product) => product.quantity >= 1)
        .map((product) => (
          <CartItem
            product={product}
          />
        ))}
    </div>
  );
}

export default CartMaterial;
