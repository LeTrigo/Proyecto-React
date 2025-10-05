import Card from "react-bootstrap/Card";
import BuyButton from "../button/BuyButton";
import { useContext } from "react";
import { CartContext } from "@/context/cartContext";
import Image from "next/image";

const CardBase = (props) => {
  const cartContext = useContext(CartContext);
  if (!cartContext) return null;
  const { addToCart } = cartContext;

  if (!props || !props.book) return null;
  const { image, name, description, price } = props.book;

  return (
    <>
      <Card className="product-card">
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
        <Card.Body className="product-card-body">
          <Card.Title className="product-title">{name}</Card.Title>
          <Card.Text className="product-description">{description}</Card.Text>
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
