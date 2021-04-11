import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import voxStore from "../data/voxStore";

function EditModal({ setOpen }) {
  const { product, categories } = useStoreState((state) => state.vox);
  const { updateProduct } = useStoreActions((state) => state.vox);
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.categoryId);
  const [price, setPrice] = useState(product.price);
  const [stockInUnits, setstockInUnits] = useState(product.stockInUnits);
  const [image, setImage] = useState(product.image);

  return (
    <>
      <div className="row">
        <div className="col">
          <form>
            <div className="form-group">
              <label>Title</label>
              <input
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Description</label>
              <textarea
                style={{ height: "300px" }}
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label>Category</label>
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <label>Price</label>
              <input
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <label>Units In Stock</label>
              <input
                className="form-control"
                value={stockInUnits}
                onChange={(e) => setstockInUnits(e.target.value)}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#ADEFD1FF",
                color: "#00203FFF",
              }}
              className="btn   btn-block"
              onClick={(e) => {
                e.preventDefault();
                updateProduct({
                  title,
                  description,
                  category,
                  price,
                  stockInUnits,
                  id: product.id,
                  image:product.image,
                });

                setOpen(false);
              }}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="col">
          <img
            src={product.image}
            width="400px"
            height="300px"
            style={{ objectFit: "cover", marginTop: "10%" }}
          />
        </div>
      </div>
    </>
  );
}

export default EditModal;
