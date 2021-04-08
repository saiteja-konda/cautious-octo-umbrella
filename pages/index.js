import Head from "next/head";
import Navbar from "../components/Navbar";
import { useStoreState, useStoreActions } from "easy-peasy";
// import { useEffect } from "react";
import Footer from "../components/Footer";
import { fetchAPI } from "../lib/api";
import Link from "next/link";
const Home = ({ user, setUser, products }) => {
  // const { products } = useStoreState((state) => state.vox);
  const { addToCart } = useStoreActions((state) => state.vox);
  // useEffect(() => {
  // getProducts();
  // console.log(products)
  // }, []);
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
      <Navbar user={user} setUser={setUser} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
        className="container"
      >
        {products?.map((product) => (
          <div className="card m-3">
            <Link href={`/products/${product.id}`}>
              <img
                src={product.image}
                className="card-img-top"
                style={{
                  width: "300px",
                  height: "300px",
                  objectFit: "cover",
                }}
              />
            </Link>

            <div className="card-body">
              <Link href={`/products/${product.id}`}>
                <h5 class="card-title text-center">{product.title}</h5>
              </Link>

              <center>
                <button
                  onClick={() => {
                    addToCart(product);
                  }}
                  className="btn btn-success btn-sm"
                >
                  Add to Cart
                </button>
              </center>
            </div>
          </div>
        ))}
      </div>
      <Footer />
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
