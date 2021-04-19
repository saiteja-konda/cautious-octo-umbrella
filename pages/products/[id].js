import React, { useEffect, useState } from "react";
import { fetchAPI } from "../../lib/api";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Button, Grid, makeStyles, Select } from "@material-ui/core";
import { SideBySideMagnifier } from "react-image-magnifiers";
import Typography from "@material-ui/core/Typography";

import parse from "html-react-parser";

import StickyFooter from "../../components/StickyFooter";
import NavBar from "../../components/Navigation/NavBar";
import ProductsSection from "../../components/Product/ProductsSection";
import PillGroup from "../../components/Product/PillGroup";
const useStyles = makeStyles({
  button: {
    textTransform: "none",
    backgroundColor: "#000",
    color: "white",
    marginTop: "20px",
  },
});
function Product({ product, user, setUser, categories, products }) {
  const [ops, setOps] = useState([]);
  const [selected, setSelected] = useState(null);
  const { addToCart, getProducts } = useStoreActions((actions) => actions.vox);
  const classes = useStyles();
  const test = JSON.parse(product.list.options);

  const typesRaw = JSON.parse(product.types.options);
  const types = typesRaw.filter((o) => o.label != null);
  const [selectedType, setSelectedType] = useState(types[0]);

  const filteredProducts = products.filter(
    (o) => o.genre === product.genre && o.id != product.id
  );
  const onTypePillSelect = (type) => {
    setSelectedType(type);
  };

  useEffect(() => {
    getProducts();
    setOps(test[0]);
  }, []);
  return (
    <div>
      <NavBar
        user={user}
        setUser={setUser}
        categories={categories}
        products={products}
      />
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
              ₹{selected === null ? ops.price : selected}
            </Typography>
            <Typography variant="caption">(Inclusive of all Taxes)</Typography>
            <div>
              {types.length > 0 ? (
                // null
                <div className="mt-3">
                  <Typography variant="subtitle2">
                    Choose option
                  </Typography>
                  <PillGroup
                    items={types}
                    onPillSelect={onTypePillSelect}
                    selectedPill={selectedType}
                    // setSelected={setSelected}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
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
                  product["type"] = selectedType;

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
                  {parse(product.description)}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        {
          <ProductsSection
            products={filteredProducts}
            title={"You may also like"}
          />
        }
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
  const categories = await fetchAPI("/categories");
  const allProducts = await fetchAPI("/products");

  const products = [res];

  return {
    props: {
      product: products[0],
      categories,
      products: allProducts,
    },
    revalidate: 1,
  };
}

export default Product;
