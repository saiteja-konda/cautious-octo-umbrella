import React, { useEffect, useState } from "react";

import excerpts from "excerpts";
import { useStoreState, useStoreActions } from "easy-peasy";
import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductCard({ title, image, description, product }) {
  const { addToCart } = useStoreActions((state) => state.vox);
  const [ops, setOps] = useState([]);
  const [selected, setSelected] = useState(null);
  const { cart } = useStoreState((state) => state.vox);
  const note = (string) => {
    toast.dark(string, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  let test = JSON.parse(product.list.options);

  const notificationFunction = (id) => {
    if (cart.lineItems?.some((o) => product.id === id) === true) {
      note("Item is already in your cart");
    } else if (cart.lineItems?.some((o) => product.id === id) === false) {
      note("Item added to cart to successfully ");
    }
  };
  useEffect(() => {
    setOps(test[0]);
  }, []);

  return (
    <div class="card m-2">
      <Link href={`/products/${product.id}`}>
        <img class="" style={{ cursor: "pointer" }} src={image} alt="Vans" />
      </Link>

      <div class="card-body">
        <Link href={`/products/${product.id}`}>
          <h4 style={{ cursor: "pointer" }} class="card-title">
            {title}
          </h4>
        </Link>
        <p class="card-text">{excerpts(description, { characters: 150 })}</p>
        <div class="options d-flex flex-fill">
          <h6 class="mt-2">Quantity</h6>
          <select
            class="custom-select ml-1"
            onChange={(e) => {
              setSelected(e.target.value);
            }}
          >
            {test
              .filter((o) => o.label != null)
              .map((o) => (
                <option key={o.label} id={o.label} value={o.price}>
                  {o.label}
                </option>
              ))}
          </select>
        </div>
        <div class="buy d-flex justify-content-between align-items-center">
          <div class="price text-dark">
            <h5 class="mt-4">₹{selected === null ? ops.price : selected}</h5>
          </div>
          <a
            class="btn btn-dark text-light btn-sm mt-3"
            onClick={() => {
              product["choice"] =
                selected === null
                  ? test.filter((o) => o.price === ops.price)
                  : test.filter((o) => o.price === selected);
              product["options"] = test.filter((o) => o.label !== null);
              product.price = parseInt(
                selected === null ? ops.price : selected
              );
              addToCart(product);
              notificationFunction(product.id);
            }}
          >
            <i class="fas fa-shopping-cart"></i> Add toCart
          </a>
        </div>

        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}
ProductCard.defaultProps = {
  title: "title",
  prite: "price",
  description: "description",
  image: "image",
};

export default ProductCard;
