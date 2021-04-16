import Head from "next/head";
import { fetchAPI } from "../lib/api";
import PlainBar from "../components/PlainBar";
import StickyFooter from "../components/StickyFooter";
import SecondayNav from "../components/SecondayNav";
import Newsletter from "../components/Newsletter";
import Testmonials from "../components/Testmonials";
import ProductsSection from "../components/ProductsSection";
import HeroSection from "../components/HeroSection";
import { useStoreActions } from "easy-peasy";
import { Typography } from "@material-ui/core";

const Home = ({ user, setUser, products, categories }) => {
  return (
    <div>
      <Head>
        <title>Bask In Nature</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PlainBar
        title="Baskin In Nature"
        user={user}
        categories={categories}
        setUser={setUser}
      />
      <HeroSection />
      <SecondayNav categories={categories} />
      <div className="container-xl">
        <div
          className="row"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <div
            className="jumbotron  bg-cover text-white store"
            style={{
              height: "300px",
              backgroundSize: "cover",

              backgroundImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.6) 100%), url(https://res.cloudinary.com/saiteja/image/upload/v1618581594/bondi_media/2_tni6n3.jpg)",
            }}
          >
            <div className="container text-center">
              <h3
                className="font-weight-bolder mt-2"
                style={{ textShadow: "2px 2px 20px #000" }}
              >
                Skin Care
              </h3>
              <button
                className="btn btn-light btn-sm"
                style={{ marginTop: "16%" }}
              >
                SHOP NOW
              </button>
            </div>
          </div>
          <div
            className="jumbotron  bg-cover text-white store"
            style={{
              height: "300px",
              backgroundSize: "cover",

              backgroundImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.6) 100%), url(https://res.cloudinary.com/saiteja/image/upload/v1618581592/bondi_media/1_hv77ye.jpg)",
            }}
          >
            <div className="container text-center">
              <h3
                className="font-weight-bolder mt-2"
                style={{ textShadow: "2px 2px 20px #000" }}
              >
                Hair Care
              </h3>
              <button
                className="btn btn-light btn-sm"
                style={{ marginTop: "16%" }}
              >
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
        <div
          className="row"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div
            className="jumbotron  bg-cover text-white store"
            style={{
              height: "300px",
              backgroundSize: "cover",
              backgroundImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.6) 100%), url(https://res.cloudinary.com/saiteja/image/upload/v1618581591/bondi_media/3_jgyzi5.jpg)",
            }}
          >
            <div className="container text-center">
              <h3
                className="font-weight-bolder mt-2"
                style={{ textShadow: "2px 2px 20px #000" }}
              >
                Baby Care
              </h3>
              <button
                className="btn btn-light btn-sm"
                style={{ marginTop: "16%" }}
              >
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProductsSection products={products} />
      <Testmonials />
      <Newsletter />
      <StickyFooter />
    </div>
  );
};

export async function getStaticProps() {
  const products = await fetchAPI("/products");
  const categories = await fetchAPI("/categories");

  return {
    props: {
      products,
      categories,
    },
    revalidate: 1,
  };
}
export default Home;
