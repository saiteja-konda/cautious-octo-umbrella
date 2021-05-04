import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import NavBar from "../components/Navigation/NavBar";
import Newsletter from "../components/Newsletter";
import ProductsSection from "../components/Product/ProductsSection";
import StickyFooter from "../components/StickyFooter";
import Testmonials from "../components/Testmonials";
import { NavContext } from "./_app";

const Home = ({ user, setUser, products, variants }) => {
  const tiles = [
    {
      id: "1",
      title: "Skin",
      excerpt: "Best Selling Skin products",
      url:
        "https://res.cloudinary.com/saiteja/image/upload/v1618581594/bondi_media/2_tni6n3.jpg",
    },
    {
      id: "2",
      title: "Hair",
      excerpt: "Best Selling Hair products",
      url:
        "https://res.cloudinary.com/saiteja/image/upload/v1618581592/bondi_media/1_hv77ye.jpg",
    },
    {
      id: "3",
      title: "Baby care",
      excerpt: "Best Selling Baby products",
      url:
        "https://res.cloudinary.com/saiteja/image/upload/v1618581591/bondi_media/3_jgyzi5.jpg",
    },
  ];
  const router = useRouter();
  const { setInvite } = useContext(NavContext);
  useEffect(() => {
    const { invite } = router.query;
    setInvite(invite);
  }, []);
  return (
    <div
      style={{
        backgroundColor: "#f4f4f8",
      }}
    >
      <Head>
        <title>Bask In Nature</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <HeroSection variants={variants} />
      {tiles.map((tile) => (
        <>
          <ProductsSection
            key={tile.id}
            products={products?.filter((o) => o.genre === tile.title)}
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

export default Home;
