import React, { useEffect, useState } from "react";

import excerpts from "excerpts";
import { useStoreState, useStoreActions } from "easy-peasy";
import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PillGroup from "./PillGroup";

function ProductCard({ title, image, description, product }) {
  const { addToCart } = useStoreActions((state) => state.vox);
  const [ops, setOps] = useState([]);
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
  let test2 = JSON.parse(product.list.options).filter((o) => o.label != null);

  const [selected, setSelected] = useState(test[0].price);
  const typesRaw = JSON.parse(product.types.options);
  const types = typesRaw.filter((o) => o.label != null);

  const [selectedPill, setSelectedPill] = useState(test[0]);
  const [selectedType, setSelectedType] = useState(types[0]);

  const onPillSelect = (pill) => {
    setSelected(pill.price);
    setSelectedPill(pill);
  };

  const onTypePillSelect = (type) => {
    setSelectedType(type);
  };
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
    <div className="d-flex justify-content-center">
      <div className="card m-2" style={{ width: "100%" }}>
        <Link href={`/products/${product.id}`}>
          <img
            className=""
            style={{ cursor: "pointer" }}
            src={image}
            alt="Vans"
            style={{ height: "150px", width: "100%", objectFit: "cover" }}
          />
        </Link>

        <div className="card-body">
          <Link href={`/products/${product.id}`}>
            <b style={{ cursor: "pointer" }} className="text-center m-0">
              {title}
            </b>
          </Link>
          <div className="d-flex mt-2">
            <b className="p-0 m-0 mr-2">size</b>
            <PillGroup
              items={test2}
              onPillSelect={onPillSelect}
              selectedPill={selectedPill}
              setSelected={setSelected}
              valueProperty="price"
            />
          </div>
          <div>
            {types.length > 0 ? (
              <>
                <b className="p-0 m-0 mr-2" style={{ fontSize: "10px" }}>
                  choose option
                </b>
                <PillGroup
                  items={types}
                  onPillSelect={onTypePillSelect}
                  selectedPill={selectedType}
                  setSelected={setSelected}
                />
              </>
            ) : (
              ""
            )}
          </div>
          <p className=" text-center mt-4 mr-0 ml-0 mb-0">
            ₹{selected === null ? ops.price : selected}
          </p>
          <div>
            <a
              className="btn btn-dark text-light btn-sm  m-0 btn-block mt-3"
              onClick={() => {
                product["choice"] =
                  selected === null
                    ? test.filter((o) => o.price === ops.price)
                    : test.filter((o) => o.price === selected);
                product["options"] = test.filter((o) => o.label !== null);
                product.price = parseInt(
                  selected === null ? ops.price : selected
                );
                product["type"] = selectedType;
                addToCart(product);
              }}
            >
              <i className="fas fa-shopping-cart"></i> Add toCart
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
    </div>
  );
}
ProductCard.defaultProps = {
  title: "title",
  price: "price",
  description: "description",
  image: "image",
};

export default ProductCard;
