import React, { useContext } from "react";
import { Button, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import { EditorContext } from "../../lib/context/EditorContext";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
const columns = [
  { id: "title", label: "Title", minWidth: 80 },
  { id: "genre", label: "Category", minWidth: 10 },
  {
    id: "stockInUnits",
    label: "StockInUnits",
    minWidth: 10,
    align: "center",
  },
  {
    id: "published",
    label: "Published",
    minWidth: 10,
    align: "center",
  },
  {
    id: undefined,
    label: "Actions",
    minWidth: 10,
    align: "center",
    type: "action",
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    minHeight: "400px",
  },
  container: {
    maxHeight: 440,
  },
});

function PTable({ Products, setLoading, getProduct, deleteProduct, onSort }) {
  const { setOpenthis, setComponent } = useContext(EditorContext);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="mt-2">
      <Paper className={classes.root} elevation={0}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Products.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      column.x = undefined;
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {typeof value === "boolean" ? (
                            JSON.stringify(value)
                          ) : typeof value === "undefined" ? (
                            <>
                              <Button
                                color="primary"
                                onClick={() => {
                                  getProduct(row.id);
                                  setLoading(true);
                                  setTimeout(() => {
                                    setComponent("Edit");
                                    setOpenthis(true), setLoading(false);
                                  }, 3000);
                                }}
                              >
                                Edit
                              </Button>
                              <IconButton
                                value={row.id}
                                onClick={() => deleteProduct(row.id)}
                              >
                                <DeleteForeverTwoToneIcon color="error" />
                              </IconButton>
                            </>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={Products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </div>
  );
}

export default PTable;
