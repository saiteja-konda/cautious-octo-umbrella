import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import AdminNavBar from "../../components/AdminNavBar";
import { useStoreState, useStoreActions } from "easy-peasy";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import EditModal from "../../components/EditModal";
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";
import CatCreate from "../../components/catCreate";
import CatEdit from "../../components/catEdit";

function products() {
  const { products, categories } = useStoreState((state) => state.vox);
  const {
    getProduct,
    getProducts,
    deleteProduct,
    getCategory,
    getCategories,
    deleteCategory,
  } = useStoreActions((state) => state.vox);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openCatCreate, setOpenCatCreate] = useState(false);
  const [openCatEdit, setOpenCatEdit] = useState(false);

  const [loading, setLoading] = useState(false);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    margin-top: 20%;
    left: 100%;
  `;

  const onCloseCatCreateModal = () => {
    setOpenCatCreate(false);
  };
  const onCloseCatEditModal = () => {
    setOpenCatEdit(false);
  };

  const onCloseModal = () => setOpen(false);
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

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
        <div className="mb-5">
          <button
            className="btn"
            style={{
              backgroundColor: "#1DB954",
              color: "#fff",
              marginRight: "10px",
            }}
            onClick={() => router.push("/admin/addproduct")}
          >
            <i className="fas fa-plus"></i> New Product
          </button>
          <button
            className="btn"
            style={{
              backgroundColor: "#1DB954",
              color: "#fff",
              marginRight: "10px",
            }}
            onClick={() => {
              setOpenCatCreate(true);
            }}
          >
            <i className="fas fa-plus"></i> New Category
          </button>
        </div>

        <div className="row">
          <div className="col" style={{ height: "400px", overflowY: "scroll" }}>
            <h4>Products List</h4>
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
                        onClick={() => deleteProduct(product.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tr>
              ))}
            </table>
          </div>

          <div className="col" style={{ height: "400px", overflowY: "scroll" }}>
            <h4>Product Category</h4>
            <table>
              <tr>
                <th>Category Name</th>
              </tr>
              {categories?.map((category) => (
                <tr key={category.id}>
                  <td className="p-2">{category.name}</td>
                  <tr>
                    <td>
                      <button
                        onClick={() => {
                          setLoading(true);
                          getCategory(category.id);
                          setTimeout(() => {
                            setOpenCatEdit(true);
                            setLoading(false);
                          }, 1200);
                        }}
                        className="btn btn-sm btn-info"
                        value={category.id}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        value={category.id}
                        onClick={() => deleteCategory(category.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tr>
              ))}
            </table>
          </div>
        </div>

        <Modal
          open={open}
          onClose={onCloseModal}
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

        <Modal open={openCatCreate} onClose={onCloseCatCreateModal} center>
          <div
            className="container mt-5"
            style={{ height: "200px", width: "300px" }}
          >
            <CatCreate setOpenCatCreate={setOpenCatCreate} />
          </div>
        </Modal>

        <Modal open={openCatEdit} onClose={onCloseCatEditModal} center>
          <div
            className="container mt-5"
            style={{ height: "200px", width: "300px" }}
          >
            <CatEdit setOpenCatEdit={setOpenCatEdit} />
          </div>
        </Modal>
      </div>
      <div style={{ position: "", display: "flex", alignItems: "center" }}>
        <center>
          <BarLoader
            color="#dedede"
            loading={loading}
            css={override}
            size={350}
          />
        </center>
      </div>
    </div>
  );
}

export default products;
