import React from "react";

function ListGroup({
  Items,
  onItemSelect,
  textProperty,
  valueProperty,
  selectedItem,
}) {
  return (
    <ul className="list-group">
      {Items.map((item) => (
        <li
          key={item.id}
          onClick={() => onItemSelect(item)}
          className={
            item == selectedItem
              ? "list-group-item active pb-3  btn btn-sm btn-block"
              : "list-group-item pb-3 btn "
          }
        >
          <a>{item[textProperty]}</a>
        </li>
      ))}
    </ul>
  );
}

ListGroup.defaultProps = {
  textProperty: "name",
  value: "name",
};

export default ListGroup;
