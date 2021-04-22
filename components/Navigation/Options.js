import React from "react";

import DropDown from "./DropDrown";

function Options({ categories, products }) {
  return (
    <>
      {categories.map((o) => (
        <DropDown key={o.id} item={o} categories={categories} products={products} />
      ))}
    </>
  );
}

export default Options;
