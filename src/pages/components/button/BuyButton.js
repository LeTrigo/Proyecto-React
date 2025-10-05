// Componente de botón de React Bootstrap
import Button from "react-bootstrap/Button";

/**
 * Botón de compra para agregar productos al carrito
 * Componente reutilizable que maneja la acción de agregar al carrito
 * Estilizado con clases CSS personalizadas
 *
 * @component
 * @param {Object} props - Props del componente
 * @param {Function} props.addToCart - Función para agregar productos al carrito
 * @param {Object} props.book - Objeto del producto a agregar
 * @param {string} props.book.id - ID único del producto
 * @param {string} props.book.name - Nombre del producto
 * @param {number} props.book.price - Precio del producto
 * @returns {JSX.Element} Botón estilizado para agregar al carrito
 *
 * @example
 * <BuyButton
 *   addToCart={addToCart}
 *   book={{
 *     id: "1",
 *     name: "React Guide",
 *     price: 29.99
 *   }}
 * />
 */
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
