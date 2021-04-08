import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { fetchAPI } from "../../lib/api";
import { useStoreActions, useStoreState } from "easy-peasy";

function product({ product, user, setUser }) {
  const { addToCart, setToCart } = useStoreActions((actions) => actions.vox);
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div className="container">
              <div className="product mt-5">
                <img
                  src={product.image}
                  width="300px"
                  height="300px"
                  style={{ objectFit: "contain", padding: "0px" }}
                  alt={product.title}
                />
              </div>
            </div>
          </div>
          <div className="col mt-5" style={{ padding: "0px" }}>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <div className="d-flex">
              <p>
                <b>Price : </b>
                {product.price} ₹
              </p>
              <p></p>
            </div>
            <button
              onClick={() => {
                addToCart(product);
              }}
              className="btn btn-sm btm-block btn-warning"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
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
