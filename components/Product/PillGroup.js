import React from "react";
import PropTypes from "prop-types";

const PillGroup = ({
  items,
  selectedPill,
  onPillSelect,

  textProperty,
  valueProperty,
}) => {
  return (
    <>
      {items.map((item) => (
        <button
          key={item[valueProperty]}
          onClick={() => {
            onPillSelect(item);
          }}
          className={`badge badge-pill badge-${
            selectedPill[textProperty] === item[textProperty]
              ? "secondary"
              : "light"
          } btn`}
        >
          {item[textProperty]}
        </button>
      ))}
    </>
  );
};

PillGroup.defaultProps = {
  textProperty: "label",
  valueProperty: "value",
};

PillGroup.propType = {
  items: PropTypes.array.isRequired,
  selectedPill: PropTypes.object.isRequired,
  onPillSelect:PropTypes.func.isRequired,

};

export default PillGroup;
