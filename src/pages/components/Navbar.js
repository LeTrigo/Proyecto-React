import { BsCartFill } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";
import React, { useContext } from "react";

import { CartContext } from "@/context/cartContext";

const Navbar = () => {
  const { cartItemCount } = useContext(CartContext);
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <span> {cartItemCount}</span>
          <BsCartFill />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href=""></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default Navbar;
