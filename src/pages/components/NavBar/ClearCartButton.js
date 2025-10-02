import { CartContext } from "@/context/cartContext";
import { useContext } from "react";
import Button from "react-bootstrap/Button";

function ClearCartButton() {
  const { clearCart } = useContext(CartContext);
  return (
    <>
      <Button
        onClick={clearCart}
        className="modern-clear-cart-button"
        variant="outline-danger"
        size="lg"
      >
        Limpiar Carrito
      </Button>
    </>
  );
}

export default ClearCartButton;
