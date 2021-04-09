import React from "react";
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
import { Button } from "@material-ui/core";
import excerpts from "excerpts";
import { useStoreState, useStoreActions } from "easy-peasy";
import Link from "next/link";
const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    margin: "auto 30px",
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
});

export default function ProductCard({
  title,
  image,
  price,
  description,
  product,
}) {
  const classes = useStyles();
  const { addToCart } = useStoreActions((state) => state.vox);

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
            <Typography variant="h6" className={classes.price}>
              ₹{price}
            </Typography>
            <Button
              size="small"
              className={classes.button}
              variant="contained"
              onClick={() => addToCart(product)}
            >
              Add to Card
            </Button>
          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  );
}
