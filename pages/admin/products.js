import Link from "next/link";
import React, { useState, useEffect } from "react";
import AdminNavBar from "../../components/AdminNavBar";
import { useStoreState, useStoreActions } from "easy-peasy";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import EditModal from "../../components/EditModal";
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";
function products() {
  const { products } = useStoreState((state) => state.vox);
  const { getProducts, deleteProduct, getProduct } = useStoreActions(
    (state) => state.vox
  );
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    margin-top: 20%;
  `;

  const onOpenModal = (e) => {
    setTimeout(setOpen(true), 9000);
  };
  const onCloseModal = () => setOpen(false);
  useEffect(() => {
    getProducts();
  }, []);

  const handleDeleteProduct = (e) => {
    deleteProduct(e.target.value);
  };

  return (
    <div
      style={{
        backgroundColor: "#161e2e",
        height: "100vh",
        color: "#fff",
      }}
    >
      <AdminNavBar />
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <h4>Products List comes here</h4>
            <table>
              <tr>
                <th>Product Name</th>
              </tr>
              {products?.map((product) => (
                <tr key={product.id}>
                  <td className="p-2">{product.title}</td>
                  <tr>
                    <td>
                      <button
                        onClick={() => {
                          setLoading(true);
                          getProduct(product.id);
                          setTimeout(() => {
                            setOpen(true);
                            setLoading(false);
                          }, 1200);
                        }}
                        className="btn btn-sm btn-info"
                        value={product.id}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        value={product.id}
                        onClick={handleDeleteProduct}
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tr>
              ))}
            </table>
            <Link href="/admin/addproduct">
              <a className="mt-4">
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div>
                    <button
                      className="btn btn-sm m-0 "
                      style={{
                        backgroundColor: "#ff4154",
                        color: "#fff",
                        // width: "100%",
                        // padding:"0px"
                      }}
                    >
                      <i class="fas fa-plus"></i> New Product
                    </button>
                  </div>
                </div>
              </a>
            </Link>
          </div>
          <div className="col">
            <h4>Product Category</h4>
            <button
              className="btn btn-sm  btn-block btn-lg"
              style={{
                backgroundColor: "#ff4154",
                color: "#fff",
              }}
            >
              Add New Category
            </button>
          </div>
        </div>
        <Modal
          open={open}
          onClose={onCloseModal}
          styles={{
            width: "780px",
            height: "600px",
            backgroundColor: "rgba(1, 51, 100, 0.3)",
          }}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
          }}
          center
        >
          <div className="container">
            <EditModal setOpen={setOpen} />
          </div>
        </Modal>
      </div>
      <BarLoader color="#dedede" loading={loading} css={override} size={150} />
    </div>
  );
}

export default products;
