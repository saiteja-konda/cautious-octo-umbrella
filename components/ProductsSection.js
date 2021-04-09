import { Typography } from '@material-ui/core';
import React from 'react'
import ProductCard from "./ProductCard";

function ProductsSection({products}) {
    return (
      <>
        <Typography variant="h5" className="text-center" component="h1">
          Featured Products
        </Typography>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
          className="container"
        >
          {products?.map((product) => (
            <ProductCard
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

export default ProductsSection
