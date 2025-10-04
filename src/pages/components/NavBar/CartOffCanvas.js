import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import ShoppingSection from "./ShoppingSection";
import CartPrice from "./CartPrice";
import Image from "next/image";

function CartOffCanvas() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="modern-cart-button" onClick={handleShow}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="cart-icon-svg"
        >
          <path
            d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 17.6 16.6 18 16 18H8C7.4 18 7 17.6 7 17V13M17 13H7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="20" r="1" stroke="currentColor" strokeWidth="2" />
          <circle cx="20" cy="20" r="1" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span className="cart-text-modern">Carrito</span>
      </div>

      <Offcanvas
        className="cart-container"
        show={show}
        onHide={handleClose}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="cart-canvas-title">
            Tu carrito de compras
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CartPrice />
          <ShoppingSection />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CartOffCanvas;
