import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function ListGroup({
  Items,
  onItemSelect,
  textProperty,
  valueProperty,
  selectedItem,
}) {
  return (
    <List component="nav">
      {Items?.map((item) => (
        <ListItem
          key={item.id}
          onClick={() => onItemSelect(item)}
          selected={item.id === selectedItem.id ? true : false}
          alignItems="center"
        >
          <ListItemText primary={item[textProperty]} />
        </ListItem>
      ))}
    </List>
  );
}

ListGroup.defaultProps = {
  textProperty: "name",
  value: "name",
};

export default ListGroup;
