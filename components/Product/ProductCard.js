import React, { useEffect, useState } from "react";

import excerpts from "excerpts";
import { useStoreState, useStoreActions } from "easy-peasy";
import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PillGroup from "./PillGroup";
import { Button, makeStyles } from "@material-ui/core";
import { lightGreen, lime, yellow, grey } from "@material-ui/core/colors";

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
  let variants = product.variants;
  const { types } = product;
  const filtedTypes = types.filter((o) => o.label && o.value != null);

  const [selected, setSelected] = useState(variants[0].price);
  const [selectedPill, setSelectedPill] = useState(variants[0]);
  const [selectedType, setSelectedType] = useState(types[0]);

  const useStyles = makeStyles({
    button: {
      textTransform: "none",
      fontWeight: "Bolder",
      marginTop: "20px",
      backgroundColor: yellow["A400"],
      boxShadow: "2px 2px 15px #fff59d",
      color: grey["800"],
      "&:hover": {
        backgroundColor: yellow["A700"],
        color: grey["800"],
      },
    },
  });
  const classes = useStyles();

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
    setOps(variants[0]);
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="card m-2" style={{ width: "100%", height: "340px"}}>
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
              items={variants}
              onPillSelect={onPillSelect}
              selectedPill={selectedPill}
              setSelected={setSelected}
              valueProperty="price"
            />
          </div>
          <div>
            <div>
              {filtedTypes.length > 0 ? (
                <div className="">
                  <div>
                    <b className="p-0 m-0 mr-2" style={{ fontSize: "10px" }}>
                      choose option
                    </b>
                    <PillGroup
                      items={types}
                      onPillSelect={onTypePillSelect}
                      selectedPill={selectedType}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <b className=" text-center mr-0 ml-0 mb-0">
            ₹{selected === null ? ops.price : selected}
          </b>
          <div>
            <Button
              className={classes.button}
              size="medium"
              fullWidth
              variant="contained"
              onClick={() => {
                product.type = selectedType;
                product.choice = selectedPill;
                addToCart(product);
              }}
            >
              <span>Add toCart</span>
            </Button>
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
