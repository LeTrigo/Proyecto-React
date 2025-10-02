import { useState } from "react";
import Image from "next/image";

function CartOffCanvas() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Image
        className="cart-trigger"
        src="/img/search-icon.png"
        onClick={handleShow}
        alt="search icon"
        width={24}
        height={24}
      />
    </>
  );
}

export default CartOffCanvas;
