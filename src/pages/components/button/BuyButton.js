import Button from "react-bootstrap/Button";

function BuyButton({ addToCart, book }) {
  return (
    <>
      <Button
        onClick={() => addToCart(book)}
        className="modern-buy-button"
        variant="primary"
        size="lg"
      >
        Agregar al Carrito
      </Button>
    </>
  );
}

export default BuyButton;
