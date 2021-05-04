import { Button, makeStyles, Select } from "@material-ui/core";
import { grey, yellow } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import { useStoreActions } from "easy-peasy";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { SideBySideMagnifier } from "react-image-magnifiers";
import NavBar from "../../components/Navigation/NavBar";
import PillGroup from "../../components/Product/PillGroup";
import ProductsSection from "../../components/Product/ProductsSection";
import StickyFooter from "../../components/StickyFooter";
import { fetchAPI } from "../../lib/api";

const useStyles = makeStyles({
  button: {
    textTransform: "none",
    fontWeight: "Bolder",
    marginTop: "20px",
    backgroundColor: yellow["A400"],
    color: grey["800"],
    "&:hover": {
      backgroundColor: yellow["A700"],
      color: grey["800"],
    },
  },
});
function Product({ product, user, setUser, categories, products }) {
  const { addToCart, getProducts } = useStoreActions((actions) => actions.vox);
  const classes = useStyles();
  const { variants, types } = product;
  const filterTypes = types.filter((o) => o.label != null);

  const [localPrice, setLocalPrice] = useState(variants[0].price);
  const [localVariant, setLocalVariant] = useState(variants[0]);
  const [selectedType, setSelectedType] = useState(types[0]);
  const filteredProducts = products.filter(
    (o) => o.genre === product.genre && o.id != product.id
  );
  const onTypePillSelect = (type) => {
    setSelectedType(type);
  };

  useEffect(() => {
    getProducts();
    // setOps(variants[0]);
  }, []);
  return (
    <div>
      <NavBar />
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
            <Typography variant="subtitle1">₹{localPrice}</Typography>
            <Typography variant="caption">(Inclusive of all Taxes)</Typography>
            <div>
              {filterTypes.length > 0 ? (
                <div className="mt-3">
                  <Typography variant="subtitle2">Choose option</Typography>
                  <PillGroup
                    items={filterTypes}
                    onPillSelect={onTypePillSelect}
                    selectedPill={selectedType}
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
                  setLocalPrice(e.target.value);
                  const res = variants.filter(
                    (o) => o.price === e.target.value
                  );

                  setLocalVariant(res[0]);
                }}
                displayEmpty
                className={classes.select}
              >
                {variants
                  .filter((o) => o.label != null)
                  ?.map((o) => (
                    <option key={o.label} id={o.label} value={o.price}>
                      {o.label}
                    </option>
                  ))}
              </Select>
              <Button
                onClick={() => {
                  product.type = selectedType;
                  product.choice = localVariant;
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
    paths: products?.map((product) => ({
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
