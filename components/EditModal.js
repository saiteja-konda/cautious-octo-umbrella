import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import voxStore from "../store/voxStore";

function EditModal({setOpen}) {
  const { product } = useStoreState((state) => state.vox);
  const { updateProduct } = useStoreActions((state) => state.vox);
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(product.price);
  const [unitsInStock, setUnitsInStock] = useState(product.setUnitsInStock);
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
              <input
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label>Category</label>
              <input
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label>Price</label>
              <input
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <label>Units In Stock</label>
              <input
                className="form-control"
                value={unitsInStock}
                onChange={(e) => setUnitsInStock(e.target.value)}
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
                  unitsInStock,
                  id: product.id,
                  image,
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
