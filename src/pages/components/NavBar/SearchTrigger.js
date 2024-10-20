import { useState } from 'react';
import { Image } from 'react-bootstrap';

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