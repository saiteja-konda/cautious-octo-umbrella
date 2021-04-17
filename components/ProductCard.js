import React, { useEffect, useState } from "react";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Button, Select } from "@material-ui/core";

import excerpts from "excerpts";
import { useStoreState, useStoreActions } from "easy-peasy";
import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    margin: "auto 5px",
    marginTop: "20px",
    marginBottom: "50px",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    paddingTop: "56.25%",
  },
  content: {
    textAlign: "left",
  },
  divider: {
    marginTop: "20px",
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  button: {
    textTransform: "capitalize",
    marginBottom: "15px",
    backgroundColor: "black",
    color: "white",
    float: "right",
  },
  price: {
    marginTop: "15px",
    marginBottom: "0px",
  },
  link: {
    color: "black",
  },
  chip: {
    marginTop: "20px",
    marginRight: "20px",
  },
  select: {
    fontSize: "12px",
  },
});

function ProductCard({ title, image, description, product }) {
  const classes = useStyles();
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
  const theme = createMuiTheme({
    props: {
      MuiButton: {
        disableElevation: true,
      },
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Card className={classes.card}>
          <Link href={`/products/${product.id}`} className={classes.link}>
            <a
              style={{
                textDecoration: "none",
                color: "black",
                cursor: "pointer",
              }}
            >
              <CardMedia className={classes.media} image={image} />
            </a>
          </Link>
          <CardContent className={classes.content}>
            <Link href={`/products/${product.id}`}>
              <a
                style={{
                  textDecoration: "none",
                  color: "black",
                  cursor: "pointer",
                }}
              >
                <Typography
                  className={"MuiTypography--heading"}
                  variant={"h6"}
                  gutterBottom
                >
                  {title}
                </Typography>
              </a>
            </Link>
            <Typography
              className={"MuiTypography--subheading"}
              variant={"caption"}
            >
              {excerpts(description, { characters: 150 })}
            </Typography>
            <Divider className={classes.divider} light />
            <div className="d-flex mt-2">
              <div>
                <Typography className="mr-2" variant="subtitle2">
                  Quantity
                </Typography>
              </div>
              <div>
                <Select
                  native
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
              </div>
            </div>
            <Typography variant="h6" className={classes.price}>
              ₹{selected === null ? ops.price : selected}
            </Typography>
            <Button
              size="small"
              className={classes.button}
              variant="contained"
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
              Add to Card
            </Button>
          </CardContent>

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
        </Card>
      </ThemeProvider>
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
