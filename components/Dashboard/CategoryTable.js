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
    <div class="mr-1 ml-1">
      <div class="table-responsive">
        <div class="table-wrapper">
          <div class="table-title">
            <div class="row">
              <div class="col-sm-6 col-md-12">
                <nav class="navbar justify-content-between">
                  <a class="navbar-brand">
                    Manage <b>Categories</b>
                  </a>
                  <form class="form-inline">
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
              <div class="col-sm-6"></div>
            </div>
          </div>

          <table class="table table-striped table-hover">
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
                    <span class="custom-checkbox"></span>
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
          <div class="clearfix">
            <div class="hint-text">
              Showing <b>5</b> out of <b>25</b> entries
            </div>
            <ul class="pagination">
              <li class="page-item disabled">
                <a href="#">Previous</a>
              </li>
              <li class="page-item">
                <a href="#" class="page-link">
                  1
                </a>
              </li>
              <li class="page-item">
                <a href="#" class="page-link">
                  2
                </a>
              </li>
              <li class="page-item active">
                <a href="#" class="page-link">
                  3
                </a>
              </li>
              <li class="page-item">
                <a href="#" class="page-link">
                  4
                </a>
              </li>
              <li class="page-item">
                <a href="#" class="page-link">
                  5
                </a>
              </li>
              <li class="page-item">
                <a href="#" class="page-link">
                  Next
                </a>
              </li>
            </ul>
          </div>
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
