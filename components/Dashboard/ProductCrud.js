import { Paper, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";
import EditorContextProvider from "../../lib/context/EditorContext";
import CategoryTable from "./CategoryTable";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
const styles = (theme) => ({
  paper: {
    maxWidth: 950,
    margin: "2px",
    overflow: "hidden",
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: "block",
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: "40px 16px",
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: "#eaeff1",
  },
});
function ProductCrud(props) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { classes } = props;

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
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <div className={classes.contentWrapper}>
          <EditorContextProvider>
            <ProductForm
              open={open}
              openEdit={openEdit}
              handleClose={handleClose}
              handleCloseEdit={handleCloseEdit}
            />
            <ProductTable
              handleOpen={handleOpen}
              handleOpenEdit={handleOpenEdit}
            />
          </EditorContextProvider>
        </div>
      </Paper>
      <br />
      <Paper elevation={0}>
        <CategoryTable />
      </Paper>
    </main>
  );
}
ProductCrud.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ProductCrud);
