// Componentes de control de items del carrito
import AddItem from "./AddItem";
import DeleteAllItems from "./DeleteAllItems";
import DeleteItem from "./DeleteItem";
// Hook de React para acceso al contexto
import { useContext } from "react";
// Contexto global del carrito
import { CartContext } from "@/context/cartContext";
// Componente contador de cantidad
import CartCounter from "./CartCounter";
// Componente de imagen optimizada de Next.js
import Image from "next/image";

/**
 * Componente para mostrar un item individual en el carrito
 * Incluye imagen, información del producto, controles de cantidad y botón de eliminación
 *
 * @component
 * @param {Object} props - Props del componente
 * @param {Object} props.item - Item del carrito a mostrar
 * @param {string} props.item.id - ID único del producto
 * @param {string} props.item.name - Nombre del producto
 * @param {number} props.item.quantity - Cantidad en el carrito
 * @param {string} props.item.image - URL de la imagen del producto
 * @param {number} props.item.price - Precio unitario del producto
 * @returns {JSX.Element|null} Item del carrito o null si faltan datos
 *
 * @example
 * <CartItem item={{
 *   id: "1",
 *   name: "React Guide",
 *   quantity: 2,
 *   image: "/img/react.jpg",
 *   price: 29.99
 * }} />
 */
const CartItem = ({ item }) => {
  // Acceso al contexto del carrito con validación SSR
  const cartContext = useContext(CartContext);
  if (!cartContext) return null;
  const { addToCart, deleteFromCart } = cartContext;

  // Validación de item requerido
  if (!item) return null;
  const { name, quantity, image, price, id } = item;

  return (
    <>
      <div className="modern-cart-item">
        {/* Encabezado del item con imagen e información */}
        <div className="cart-item-header">
          <div className="cart-item-image">
            <Image
              src={image}
              alt={name}
              width={60}
              height={75}
              className="cart-product-img"
            />
          </div>

          <div className="cart-item-content">
            <h6 className="cart-item-title">{name}</h6>
            <div className="cart-item-price">
              <span className="price-label">Precio unitario:</span>
              <span className="unit-price">${price.toLocaleString()}</span>
            </div>
            <div className="cart-item-total">
              <span className="total-label">Total:</span>
              <span className="total-price">
                ${(price * quantity).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Controles del item */}
        <div className="cart-item-controls">
          {/* Controles de cantidad (-, contador, +) */}
          <div className="quantity-controls">
            <DeleteItem deleteFromCart={deleteFromCart} book={item} />
            <CartCounter quantity={quantity} />
            <AddItem addToCart={addToCart} book={item} />
          </div>

          {/* Botón para eliminar todas las unidades */}
          <div className="remove-item">
            <DeleteAllItems deleteFromCart={deleteFromCart} book={item} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
