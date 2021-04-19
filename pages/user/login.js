import React from "react";
import Login from "../../components/Authentication/Login";
import { fetchAPI } from "../../lib/api";

function User({ user, setUser, products, categories }) {
  return (
    <div>
      <Login
        user={user}
        setUser={setUser}
        categories={categories}
        products={products}
      />
    </div>
  );
}


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
export default User;
