import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
function CatEdit({ setOpenCatEdit }) {
  const { category } = useStoreState((state) => state.vox);
  const { updateCategory } = useStoreActions((state) => state.vox);

  const [name, setName] = useState(category.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      id:category.id,
      name,
    };
    updateCategory(obj);
    setOpenCatEdit(false);
  };
  return (
    <>
      <form className="form-group" onSubmit={handleSubmit}>
        <label>Edit Category</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
        <button
          className="btn btn-block mt-2"
          type="submit"
          style={{
            backgroundColor: "#ff4154",
            color: "#fff",
          }}
        >
          Edit
        </button>
      </form>
    </>
  );
}

export default CatEdit;
