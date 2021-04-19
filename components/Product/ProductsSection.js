import { Typography } from "@material-ui/core";
import React from "react";
import ProductCard from "./ProductCard";
import Carousel from "react-multi-carousel";
import PropTypes from "prop-types";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    // paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};
function ProductsSection({ products, title }) {
  return (
    <>
      <div className="container">
        <Typography
          variant="subtitle1"
          className="text-center mt-2 mb-2"
          component="h1"
        >
          {title}
        </Typography>
        <Carousel
          ssr={true}
          // partialVisbile
          swipeable={true}
          draggable={true}
          itemClass="image-item"
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          transitionDuration={10000}
          arrows={false}
        >
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              description={product.description}
              product={product}
            />
          ))}
        </Carousel>
      </div>
    </>
  );
}
ProductsSection.propType = {
  title: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
};
export default ProductsSection;
