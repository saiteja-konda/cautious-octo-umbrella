import React from "react";
import axios from "axios";

const handleClick = () => {
  axios
    .post("/api/product/post", {
      title: "sample",
      price: 22,
      inStock: 22,
      description: "sample",
      content: "content",
      images: "image",
      category: "sample",
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
};
const Mongo = () => {
  return <button onClick={handleClick}>post</button>;
};

export default Mongo;
