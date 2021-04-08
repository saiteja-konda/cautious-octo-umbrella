import Head from "next/head";
import Navbar from "../components/Navbar";
import { fetchAPI } from "../lib/api";
import Link from "../components/Link";
import Navbar01scrollToColor from "../components/Navbar01scrollToColor";
import StickyFooter from "../components/StickyFooter";
import SecondayNav from "../components/SecondayNav";
import ProductCard from "../components/ProductCard";
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
      <img
        style={{ height: "660px", width: "100%", objectFit: "cover" }}
        src="https://res.cloudinary.com/saiteja/image/upload/v1617876518/bondi_media/chalo-garcia-rrpOLKrkqV8-unsplash_vrait7.jpg"
      />

      <SecondayNav />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
        className="container"
      >
        {products?.map((product) => (
          <Link
            href={`/products/${product.id}`}
            style={{ textDecoration: "none" }}
          >
            <ProductCard
              title={product.title}
              image={product.image}
              price={product.price}
              description={product.description}
              product={product}
            />
          </Link>
        ))}
      </div>
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
