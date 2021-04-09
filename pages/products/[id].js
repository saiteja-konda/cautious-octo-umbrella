import React from "react";
import { fetchAPI } from "../../lib/api";
import { useStoreActions, useStoreState } from "easy-peasy";
import PlainBar from "../../components/PlainBar";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { SideBySideMagnifier } from "react-image-magnifiers";
import StickyFooter from "../../components/StickyFooter";
const useStyles = makeStyles({
  button: {
    textTransform: "none",
    backgroundColor: "#1DB954",
    color: "white",
  },
});
function product({ product, user, setUser }) {
  const { addToCart, setToCart } = useStoreActions((actions) => actions.vox);
  const classes = useStyles();
  return (
    <div>
      <PlainBar
        title="Baskin In Nature"
        user={user}
        setUser={setUser}
      />

      <div className="container" style={{ height: "100vh" }}>
        <div className="row mt-5">
          <div className="col-md-4 col-sm-12 col-xs-12 ">
            <SideBySideMagnifier
              imageAlt={product.title}
              imageSrc={product.image}
              alwaysInPlace="true"
              fillAvailableSpace="true"
              style={{
                objectFit: "contain",
                padding: "0px",
                marginBottom: "50px",
              }}
            />
          </div>
          <div className="col-md-8 col-sm-12 col-xs-12">
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <div className="d-flex">
              <p>
                <b>Price : </b>
                {product.price} ₹
              </p>
              <p></p>
            </div>
            <Button
              onClick={() => {
                addToCart(product);
              }}
              // className="btn btn-sm btm-block btn-warning"
              className={classes.button}
              size="medium"
              variant="contained"
            >
              Add to Cart
            </Button>
          </div>
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
    revalidate: 21600,
  };
}

export default product;
