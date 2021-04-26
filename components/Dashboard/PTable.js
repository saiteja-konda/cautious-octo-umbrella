import React, { useContext } from "react";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import { EditorContext } from "../../lib/context/EditorContext";

function PTable({
  Products,
  setLoading,
  getProduct,
  deleteProduct,
  onSort,
}) {
  const { setOpenthis, setComponent } = useContext(EditorContext);
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th></th>
          <th onClick={() => onSort("title")}>Name</th>
          <th onClick={() => onSort("genre")}>Category</th>
          <th onClick={() => onSort("stockInUnits")}>StockInUnits</th>
          <th onClick={() => onSort("publish")}>Published</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {Products?.map((product) => (
          <tr key={product.id}>
            <td className="p-0 m-0">
              <span className="custom-checkbox"></span>
            </td>
            <td>{product.title}</td>
            <td>{product.genre}</td>
            <td>{product.stockInUnits}</td>
            <td>{JSON.stringify(product.published)}</td>
            <td>
              <div className="d-flex">
                <IconButton
                  onClick={() => {
                    getProduct(product.id);
                    setLoading(true);
                    setTimeout(() => {
                      setComponent("Edit");
                      setOpenthis(true), setLoading(false);
                    }, 3000);
                  }}
                >
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton
                  value={product.id}
                  onClick={() => deleteProduct(product.id)}
                >
                  <DeleteForeverTwoToneIcon color="error" />
                </IconButton>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PTable;
