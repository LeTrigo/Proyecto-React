import { useState } from 'react';
import { Image } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';

function CartDropdown() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Image className='cart-trigger' src="/img/carrito.png" onClick={handleShow}/>

      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Tu carrito de compras</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <img src="/img/eloquent-js.jpeg"/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}



export default CartDropdown;