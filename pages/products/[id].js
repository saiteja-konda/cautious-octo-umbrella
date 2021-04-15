import React, { useEffect, useState } from "react";
import { fetchAPI } from "../../lib/api";
import { useStoreActions, useStoreState } from "easy-peasy";
import PlainBar from "../../components/PlainBar";
import { Button, Grid, makeStyles, Select } from "@material-ui/core";
import { SideBySideMagnifier } from "react-image-magnifiers";
import Typography from "@material-ui/core/Typography";

import parse from "html-react-parser";


import StickyFooter from "../../components/StickyFooter";

const useStyles = makeStyles({
  button: {
    textTransform: "none",
    backgroundColor: "#000",
    color: "white",
    marginTop: "20px",
  },
});
function Product({ product, user, setUser }) {
  const [ops, setOps] = useState([]);
  const [selected, setSelected] = useState(null);
  const { addToCart, getProducts } = useStoreActions((actions) => actions.vox);
  const { products } = useStoreState((actions) => actions.vox);
  useEffect(() => {
    getProducts();
    setOps(test[0]);
  }, []);
  const classes = useStyles();
  const test = JSON.parse(product.list.options);
  return (
    <div>
      <PlainBar title="Baskin In Nature" user={user} setUser={setUser} />
      <div className="m-5">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <Typography variant="subtitle1" className="mb-3">
              {product.title}
            </Typography>
            <Typography className="d-none d-md-block" variant="caption">
              {parse(product.description)}
            </Typography>
          </div>
          <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
            <SideBySideMagnifier
              imageAlt={product.title}
              imageSrc={product.image}
              alwaysInPlace={true}
              fillAvailableSpace={true}
              style={{
                objectFit: "contain",
                padding: "0px",
                marginBottom: "50px",
              }}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <Typography variant="subtitle1">
              M R P ₹{selected === null ? ops.price : selected}
            </Typography>
            <Typography variant="caption">(Inclusive of all Taxes)</Typography>
            <Typography className="mt-5" variant="subtitle2">
              Quantity
            </Typography>
            <div>
              <Select
                native
                fullWidth
                onChange={(e) => {
                  setSelected(e.target.value);
                }}
                displayEmpty
                className={classes.select}
              >
                {test
                  .filter((o) => o.label != null)
                  .map((o) => (
                    <option key={o.label} id={o.label} value={o.price}>
                      {o.label}
                    </option>
                  ))}
              </Select>
              <Button
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
                }}
                className={classes.button}
                size="medium"
                fullWidth
                variant="contained"
              >
                Add to Cart
              </Button>
              <div className="mt-3">
                <Typography
                  className="d-sm-block d-xs-block d-md-none"
                  variant="caption"
                >
                  {product.description}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <Typography variant="h6" className="text-center" component="h1">
          You may also like
        </Typography>
        <div>
          {/* {products.map((o) => (
            <h1>{o.title}</h1>
          ))} */}
          {products
            .filter((o) => o.categoryId === product.id)
            .map((product) => (
              <div>{product.title}</div>
            ))}
        </div>
      </div>
      <StickyFooter />
    </div>
  );
}
export async function getStaticPaths() {
  const products = await fetchAPI("/products");

  return {
    paths: products.map((product) => ({
      params: {
        id: product.id.toString(),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetchAPI(`/products/${params.id}`);
  const products = [res];
  return {
    props: {
      product: products[0],
    },
    revalidate: 1,
  };
}

export default Product;
