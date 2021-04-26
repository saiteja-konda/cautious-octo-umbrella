import React, { useState } from "react";
import EditorContextProvider from "../../lib/context/EditorContext";
import CategoryTable from "./CategoryTable";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";

function ProductCrud() {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpen = () => {
    setOpen(!open ? true : false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenEdit = () => {
    setOpenEdit(!open ? true : false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  return (
    <>
      <EditorContextProvider>
        <ProductForm
          open={open}
          openEdit={openEdit}
          handleClose={handleClose}
          handleCloseEdit={handleCloseEdit}
        />
        <ProductTable handleOpen={handleOpen} handleOpenEdit={handleOpenEdit} />
        <CategoryTable />
      </EditorContextProvider>
    </>
  );
}

export default ProductCrud;
