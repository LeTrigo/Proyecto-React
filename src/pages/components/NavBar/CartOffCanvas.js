import { useState } from 'react';
import { Image } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ShoppingSection from './ShoppingSection';
import CartPrice from './CartPrice';

function CartOffCanvas() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Image className='cart-trigger' src="/img/cart-icon.png" onClick={handleShow}/>

      <Offcanvas className="cart-container" show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Tu carrito de compras</Offcanvas.Title>
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