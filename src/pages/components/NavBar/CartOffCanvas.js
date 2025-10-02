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
      <div className="cart-button-trigger" onClick={handleShow}>
        <Image
          className="cart-trigger"
          src="/img/cart-icon.png"
          alt="cart icon"
          width={24}
          height={24}
        />
        <dfn className="cart-text">Tu carrito</dfn>
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
