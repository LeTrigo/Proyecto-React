// Componente de tarjeta de React Bootstrap
import Card from "react-bootstrap/Card";
// Botón de compra personalizado
import BuyButton from "../button/BuyButton";
// Hook de React para acceso al contexto
import { useContext } from "react";
// Contexto global del carrito
import { CartContext } from "@/context/cartContext";
// Componente de imagen optimizada de Next.js
import Image from "next/image";

/**
 * Componente base para tarjetas de productos
 * Muestra información del producto con imagen, título, descripción y botón de compra
 * Incluye badge de precio y validaciones de SSR
 *
 * @component
 * @param {Object} props - Props del componente
 * @param {Object} props.book - Objeto del libro/producto
 * @param {string} props.book.id - ID único del producto
 * @param {string} props.book.name - Nombre del producto
 * @param {string} props.book.description - Descripción del producto
 * @param {number} props.book.price - Precio del producto
 * @param {string} props.book.image - URL de la imagen del producto
 * @returns {JSX.Element|null} Tarjeta del producto o null si faltan datos
 *
 * @example
 * <CardBase book={{
 *   id: "1",
 *   name: "React para principiantes",
 *   description: "Aprende React desde cero",
 *   price: 29.99,
 *   image: "/img/react-book.jpg"
 * }} />
 */
const CardBase = (props) => {
  // Acceso al contexto del carrito con validación SSR
  const cartContext = useContext(CartContext);
  if (!cartContext) return null;
  const { addToCart } = cartContext;

  // Validación de props requeridas
  if (!props || !props.book) return null;
  const { image, name, description, price } = props.book;

  return (
    <>
      <Card className="product-card">
        {/* Contenedor de imagen con badge de precio */}
        <div className="card-image-container">
          <Image
            className="product-image"
            src={image}
            alt={name}
            width={280}
            height={350}
          />
          <div className="price-badge">${price.toLocaleString()}</div>
        </div>

        {/* Cuerpo de la tarjeta con información del producto */}
        <Card.Body className="product-card-body">
          <Card.Title className="product-title">{name}</Card.Title>
          <Card.Text className="product-description">{description}</Card.Text>

          {/* Sección de acciones con botón de compra */}
          <div className="card-actions">
            <BuyButton
              className="product-buy-button"
              addToCart={addToCart}
              book={props.book}
            />
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardBase;
