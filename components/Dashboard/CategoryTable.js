import * as React from "react";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import { ButtonGroup, IconButton } from "@material-ui/core";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import CatCreate from "../../components/catCreate";
import CatEdit from "../../components/catEdit";
import EditModal from "../../components/EditModal";

import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";
import CategoryTableHeader from "./CategoryTableHeader";

import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  createMuiTheme,
  Divider,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  ThemeProvider,
  Tooltip,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";

function CategoryTable() {
  const { categories, products } = useStoreState((state) => state.vox);
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
    <>
      <CardHeader title="Categories" />
      {/* <CategoryTableHeader setOpenCatCreate={setOpenCatCreate} /> */}
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  Name
                </TableCell>
                <TableCell>Total Products</TableCell>
                <TableCell>
                  <TableSortLabel>Sales</TableSortLabel>
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories?.map((category) => (
                <TableRow hover key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    {category.id === ""
                      ? products.length
                      : products.filter(
                          (product) => product.genre === category.name
                        ).length}
                  </TableCell>
                  <TableCell>00</TableCell>
                  <TableCell>
                    <ButtonGroup
                      color="primary"
                      size="small"
                      aria-label="outlined primary button group"
                    >
                      <Button
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
                      </Button>
                      <Button onClick={() => deleteCategory(category.id)}>
                        <DeleteForeverTwoToneIcon color="error" />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 8,
        }}
      >
        <Button
          color="primary"
          // endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          variant="contained"
          fullWidth
          onClick={() => {
            setOpenCatCreate(true);
          }}
        >
          Add New Category
        </Button>
      </Box>
      {/* </Card> */}
      <BarLoader
        color="red"
        loading={isLoading}
        height={1}
        width={900}
        css={override}
      />
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
    </>
  );
}

export default CategoryTable;
