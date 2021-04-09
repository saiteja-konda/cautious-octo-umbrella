import Head from "next/head";
import { fetchAPI } from "../lib/api";
import Navbar01scrollToColor from "../components/Navbar01scrollToColor";
import StickyFooter from "../components/StickyFooter";
import SecondayNav from "../components/SecondayNav";
import Newsletter from "../components/Newsletter";
import Testmonials from "../components/Testmonials";
import Hero from "../components/Hero";
import ProductsSection from "../components/ProductsSection";


const Home = ({ user, setUser, products }) => {
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
      <Hero />
      <SecondayNav />
      <ProductsSection products={products} />
      <Testmonials />
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
