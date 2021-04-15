import * as React from "react";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import { IconButton } from "@material-ui/core";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import CatCreate from "../../components/catCreate";
import CatEdit from "../../components/catEdit";
import EditModal from "../../components/EditModal";

import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";

function CategoryTable() {
  const { categories } = useStoreState((state) => state.vox);
  const { getCategories, deleteCategory, getCategory } = useStoreActions(
    (state) => state.vox
  );
  const [open, setOpen] = useState(false);
  const [openCatCreate, setOpenCatCreate] = useState(false);
  const [openCatEdit, setOpenCatEdit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    margin-bottom: 10px;
    // left: 100%;
  `;

  useEffect(() => {
    getCategories();
  }, []);

  const onCloseCatCreateModal = () => {
    setOpenCatCreate(false);
  };
  const onCloseCatEditModal = () => {
    setOpenCatEdit(false);
  };

  const onCloseModal = () => setOpen(false);
  return (
    <div className="mr-1 ml-1">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6 col-md-12">
                <nav className="navbar justify-content-between">
                  <a className="navbar-brand">
                    Manage <b>Categories</b>
                  </a>
                  <form className="form-inline">
                    <div className="form-group mr-3">
                      <IconButton
                        onClick={() => {
                          setOpenCatCreate(true);
                        }}
                      >
                        <AddCircleTwoToneIcon color="primary" />
                      </IconButton>
                    </div>
                  </form>
                </nav>
              </div>
              <div className="col-sm-6"></div>
            </div>
          </div>

          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories?.map((category) => (
                <tr key={category.id}>
                  <td>
                    <span className="custom-checkbox"></span>
                  </td>
                  <td>{category.name}</td>

                  <td>
                    <div className="d-flex">
                      <IconButton
                        onClick={() => {
                          setLoading(true);
                          getCategory(category.id);
                          setTimeout(() => {
                            setOpenCatEdit(true);
                            setLoading(false);
                          }, 1200);
                        }}
                      >
                        <EditIcon color="primary" />
                      </IconButton>
                      <IconButton onClick={() => deleteCategory(category.id)}>
                        <DeleteForeverTwoToneIcon color="error" />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <BarLoader
            color="red"
            loading={isLoading}
            height={1}
            width={900}
            css={override}
          />
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
  );
}

export default CategoryTable;
