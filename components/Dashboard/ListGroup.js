import React from "react";

function ListGroup({
  Items,
  onItemSelect,
  textProperty,
  valueProperty,
  selectedItem,
}) {
  return (
    <ul class="list-group">
      {Items.map((item) => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          class={
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
  value: "id",
};

export default ListGroup;
