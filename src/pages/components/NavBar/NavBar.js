import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import CartOffCanvas from "./CartOffCanvas";
import { Image, NavDropdown, NavLink } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "@/context/cartContext";

function NavBar() {
  const {cartItemCount} = useContext(CartContext)
  
  return (
    <Navbar expand="lg" fixed="top" className="main-navbar">
      <Container fluid>
        <img
          className="navbar-logo"
          src="./img/Logo.jpeg"
          alt="logo book oasis"
        />
        <Navbar.Text className="navbar-title">Book Oasis</Navbar.Text>
        <div className="navbar-menu" id>
        <NavDropdown className="navbar-dropdown" title="Categorias" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Autoayuda</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Comics</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Computación y sistemas</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.4">Ficción y literatura</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.5">Infantil y juvenil</NavDropdown.Item>
        </NavDropdown>
        </div>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <div className="search-trigger">
            <Image className="search-icon" src="./img/search-icon.png" />
          </div>
          <div className="user-trigger">
            <Image className="user-icon" src="./img/user-icon.png" />
          </div>
          <CartOffCanvas />
          <span>{cartItemCount}</span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
