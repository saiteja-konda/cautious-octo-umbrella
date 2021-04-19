import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Link from "next/link";
const DropDown = ({ item, categories, products }) => {
  const [toggle, setToggle] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  function togglefun() {
    setToggle(!toggle ? false : true);
  }

  function onMouseEnter() {
    setDropDown(true);
  }

  function onMouseLeave() {
    setDropDown(false);
  }

  return (
    <>
      <Dropdown
        className="d-inline-block"
        onMouseOver={onMouseEnter}
        onMouseLeave={onMouseLeave}
        isOpen={dropDown}
        toggle={togglefun}
      >
        <DropdownToggle nav caret>
          {item.name}
        </DropdownToggle>
        <DropdownMenu>
          {products
            ?.filter((o) => o.categoryId === item.id)
            .map((o) => (
              <DropdownItem>
                <Link href={`/products/${o.id}`}>
                  <a className="nav-link">{o.title}</a>
                </Link>
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default DropDown;
