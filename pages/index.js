import Head from "next/head";
import { fetchAPI } from "../lib/api";
import Navbar01scrollToColor from "../components/Navbar01scrollToColor";
import StickyFooter from "../components/StickyFooter";
import SecondayNav from "../components/SecondayNav";
import Newsletter from "../components/Newsletter";
import Testmonials from "../components/Testmonials";
import ProductsSection from "../components/ProductsSection";
import HeroSection from "../components/HeroSection";
import { useStoreActions } from "easy-peasy";

const Home = ({ user, setUser, products, categories }) => {
  return (
    <div>
      <Head>
        <title>Bask In Nature</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar01scrollToColor
        title="Baskin In Nature"
        user={user}
        setUser={setUser}
      />
      <HeroSection />
      <SecondayNav categories={categories} />
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
