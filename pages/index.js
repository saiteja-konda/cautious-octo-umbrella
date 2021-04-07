import Head from "next/head";
import Navbar from "../components/Navbar";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useEffect } from "react";
export default function Home({ user, setUser }) {
  const { products } = useStoreState((state) => state.vox);
  const { getProducts } = useStoreActions((state) => state.vox);
  useEffect(() => {
    getProducts();
  },[]);
  return (
    <div>
      <Head>
        <title>Bask In Nature</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user} setUser={setUser} />
      <div style={{ display: "flex" }}>
        {products?.map((product) => (
          <div className="card m-3">
            <img
              src={product.image}
              className="card-img-top"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
              }}
            />
            <div className="card-body">
              <h5 class="card-title text-center">{product.title}</h5>
              <center>
                <button className="btn btn-success btn-sm">Add to Cart</button>
              </center>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
