import * as React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import {
  IconButton,
  makeStyles,
  Typography,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Box,
  Button,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";
import Pagination from "./Pagination";
import { Paginate } from "../../utils/Paginate";
import ListGroup from "./ListGroup";
import PTable from "./PTable";
import _ from "lodash";
import { EditorContext } from "../../lib/context/EditorContext";
import ProductTableHeader from "./ProductTableHeader";

function ProductTable() {
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
  const [filteredData, setFilteredData] = useState([]);

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
  const { setOpenthis, setComponent, string, setString } = React.useContext(
    EditorContext
  );

  function handleSearch() {
    if (string != null) {
      var results = _.filter(Products, function (item) {
        return item.title.toLowerCase().indexOf(string.toLowerCase()) > -1;
      });
    }
    setFilteredData(results);
  }
  const data = string === null || string.length < 2 ? Products : filteredData;

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <CardHeader title="Products" />
      <ProductTableHeader
        setOpenthis={setOpenthis}
        setComponent={setComponent}
        string={string}
        setString={setString}
        isLoading={isLoading}
        setLoading={setLoading}
        getProducts={getProducts}
        handleSearch={handleSearch}
      />
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
            Products={data}
            setLoading={setLoading}
            getProduct={getProduct}
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
      <div className="clearfix">
        <Pagination
          ItemsCount={filtered.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          Products={Products}
        />
      </div>
    </>
  );
}

export default ProductTable;
