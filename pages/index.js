import Head from "next/head";
import { fetchAPI } from "../lib/api";
import Link from "../components/Link";
import Navbar01scrollToColor from "../components/Navbar01scrollToColor";
import StickyFooter from "../components/StickyFooter";
import SecondayNav from "../components/SecondayNav";
import ProductCard from "../components/ProductCard";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

import {
  Typography,
  ThemeProvider,
  createMuiTheme,
  Button,
  makeStyles,
  Fab,
} from "@material-ui/core";
import Newsletter from "../components/Newsletter";
import MyTestmonialCard from "../components/MyTestmonialCard";

const theme = createMuiTheme();

theme.typography.h1 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.4rem",
  },
};

const useStyles = makeStyles({
  // This group of buttons will be aligned to the right

  button: {
    textTransform: "none",
    color: "black",
    backgroundColor: "white",
    margin: "5px",
  },
});

const Home = ({ user, setUser, products }) => {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>Bask In Nature</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Bask in Nature Beauty, Cosmetic,Personal Care 🍃 100% Natural Skin & Hair Recipes🍃 Handcrafted, Fresh"
        />
      </Head>
      <Navbar01scrollToColor
        title="Baskin In Nature"
        user={user}
        setUser={setUser}
      />
      <div
        style={{
          position: "relative",
          textAlign: "center",
          color: "white",
        }}
      >
        <img
          style={{ height: "660px", width: "100%", objectFit: "cover" }}
          src="https://res.cloudinary.com/saiteja/image/upload/v1617876518/bondi_media/chalo-garcia-rrpOLKrkqV8-unsplash_vrait7.jpg"
        />
        <ThemeProvider theme={theme}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <Typography variant="h1">The care you've always needed</Typography>
            <Button variant="outlined" className={classes.button}>
              SHOP NOW
            </Button>
          </div>
        </ThemeProvider>
        {/* The care you've always needed A RANGE OF PRODUCTS FOR YOU Shop now  */}
      </div>
      <SecondayNav />
      <Typography variant="h5" className="text-center" component="h3">
        Featured Products
      </Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
        className="container"
      >
        {products?.map((product) => (
          <ProductCard
            title={product.title}
            image={product.image}
            price={product.price}
            description={product.description}
            product={product}
          />
        ))}
      </div>
      <div style={{ display: "flex", marginBottom: "100px" }}>
        <MyTestmonialCard /> <MyTestmonialCard /> <MyTestmonialCard />
      </div>
      <Newsletter />
      <StickyFooter />
    </div>
  );
};

export async function getStaticProps() {
  const products = await fetchAPI("/products");
  return {
    props: {
      products,
    },
    revalidate: 21600,
  };
}
export default Home;
