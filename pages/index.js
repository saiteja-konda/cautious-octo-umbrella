import Head from "next/head";
import Navbar from "../components/Navbar";
import { useStoreState } from "easy-peasy";

export default function Home({ user, setUser }) {
  const { products } = useStoreState((state) => state.vox);
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
                width: "286px",
                height: "180px",
                objectFit: "cover",
                margin: "10px",
              }}
            />
            <div className="card-body">
              <h5 class="card-title text-center">{product.title}</h5>
              {/* <p class="card-text text-small">{product.description}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
