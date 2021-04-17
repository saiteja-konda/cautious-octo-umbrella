import { Typography } from "@material-ui/core";
import React from "react";
import ProductCard from "./ProductCard";

function ProductsSection({ products,title }) {
  return (
    <>
      <Typography variant="h5" className ="text-center" component="h1">
       {title}
      </Typography>
      <div
        style={{
          display: "flex",
          // flexWrap: "wrap",
        }}
        className="container"
      >
        {products?.slice(0, 3).map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            description={product.description}
            product={product}
          />
        ))}
      </div>
    </>
  );
}

export default ProductsSection;
