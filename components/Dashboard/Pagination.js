import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

function Pagination({
  pageSize,
  onPageChange,
  ItemsCount,
  currentPage,
  Products,
}) {
  const pagesCount = Math.ceil(ItemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <>
      <div className="hint-text">
        Showing <b>{Products.length}</b> out of <b>{ItemsCount}</b> entries
      </div>
      <ul className="pagination">
        <li className="page-item ">
          <a>Previous</a>
        </li>
        {pages?.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link">Next</a>
        </li>
      </ul>
    </>
  );
}

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  ItemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  Products: PropTypes.array.isRequired,
};
export default Pagination;
