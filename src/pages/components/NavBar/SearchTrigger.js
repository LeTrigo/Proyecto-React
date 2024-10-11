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
      <Image className='cart-trigger' src="/img/search-icon.png" onClick={handleShow}/>
    </>
  );
}



export default CartOffCanvas;