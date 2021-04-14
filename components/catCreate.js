import React, { useState } from "react";
import { useStoreActions } from "easy-peasy";
function CatCreate({setOpenCatCreate}) {
  const { createCategory,getCategories } = useStoreActions((state) => state.vox);
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const cat = {
      name,
    };
    createCategory(cat);
    setOpenCatCreate(false)
    getCategories();
  };
  return (
    <>
      <form className="form-group" onSubmit={handleSubmit}>
        <label>Category Name</label>
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
          Create
        </button>
      </form>
    </>
  );
}

export default CatCreate;
