import * as React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import { useEffect, useState } from "react";
import AddProducts from "./AddProduct";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";
import Pagination from "./Pagination";
import { Paginate } from "../../utils/Paginate";
import ListGroup from "./ListGroup";
import PTable from "./PTable";
import _ from "lodash";

function ProductTable({ handleOpen, handleOpenEdit }) {
  const { products, categories } = useStoreState((state) => state.vox);
  const { getProduct, getProducts, deleteProduct } = useStoreActions(
    (state) => state.vox
  );

  const [isLoading, setLoading] = useState(false);
  const [path, setPath] = useState("title");
  const [order, setOrder] = useState("asc");

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    margin-bottom: 10px;
  `;
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGenre, setCurrentGenre] = useState([]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleGenreSelect = (genre) => {
    setCurrentGenre(genre);
  };
  const handleOnSort = (path) => {
    // setPath(path);
  };
  const filtered =
    currentGenre && currentGenre.id
      ? products.filter((p) => p.categoryId === currentGenre.id)
      : products;

  // const sorted = _.orderBy(filtered, [path], [order]);
  const Products = Paginate(filtered, currentPage, pageSize);

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div class="mr-1 ml-1" >
      <div class="table-responsive">
        <div class="table-wrapper">
          <div class="table-title">
            <div class="row">
              <div class="col-sm-6 col-md-12">
                <nav class="navbar justify-content-between">
                  <a class="navbar-brand">
                    Manage <b>Products</b>
                  </a>
                  <form class="form-inline">
                    <div className="form-group mr-3">
                      <IconButton onClick={handleOpen}>
                        <AddCircleTwoToneIcon color="primary" />
                      </IconButton>
                    </div>
                    <SearchBar
                      // value={this.state.value}
                      // onChange={(newValue) => this.setState({ value: newValue })}
                      // onRequestSearch={() => doSomethingWith(this.state.value)}
                      style={{
                        margin: "0",
                        maxWidth: 500,
                      }}
                    />
                  </form>
                </nav>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-2  p-0 m-0">
              <ListGroup
                Items={categories}
                onItemSelect={handleGenreSelect}
                selectedItem={currentGenre}
              />
            </div>
            <div className="col-10 p-0 m-0">
              <PTable
                Products={Products}
                setLoading={setLoading}
                getProduct={getProduct}
                handleOpenEdit={handleOpenEdit}
                deleteProduct={deleteProduct}
                onSort={handleOnSort}
              />
            </div>
          </div>
          <div style={{ position: "absloute" }}>
            <BarLoader
              color="red"
              loading={isLoading}
              height={1}
              width={900}
              css={override}
            />
          </div>
          <div class="clearfix">
            <Pagination
              ItemsCount={filtered.length}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              currentPage={currentPage}
              Products={Products}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTable;
