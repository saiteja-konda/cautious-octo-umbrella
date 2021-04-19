import React from "react";
import SignUp from "../../components/Authentication/SignUp";
import { fetchAPI } from "../../lib/api";

function NewUser({ user, setUser, products, categories }) {
  return (
    <div>
      <SignUp
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
export default NewUser;
