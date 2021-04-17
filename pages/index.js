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
import ProductHero from "../components/ProductHero";

const Home = ({ user, setUser, products, categories }) => {
  const paragraph =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem molestias soluta vero voluptates sapiente magnam dolorem cum.";

  const tiles = [
    {
      id: "1",
      title: "Skin Care",
      excerpt: "Best selling Skin products",
      url:
        "https://res.cloudinary.com/saiteja/image/upload/v1618581594/bondi_media/2_tni6n3.jpg",
    },
    {
      id: "2",
      title: "Hair Care",
      excerpt: "Best selling Hair products",
      url:
        "https://res.cloudinary.com/saiteja/image/upload/v1618581592/bondi_media/1_hv77ye.jpg",
    },
    {
      id: "3",
      title: "Baby Care",
      excerpt: "Best selling Baby products",
      url:
        "https://res.cloudinary.com/saiteja/image/upload/v1618581591/bondi_media/3_jgyzi5.jpg",
    },
  ];
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
      {tiles.map((tile) => (
        <>
          <ProductHero
            image={tile.url}
            paragraph={paragraph}
            title={tile.title}
          />
          <ProductsSection
            products={products.filter((o) => o.genre === tile.title)}
            title={tile.excerpt}
          />
        </>
      ))}
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
