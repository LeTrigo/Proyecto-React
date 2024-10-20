import Card from "react-bootstrap/Card";
import BuyButton from "../button/BuyButton";
import { useContext } from "react";
import { CartContext } from "@/context/cartContext";




const CardBase = (props) => {
  const {addToCart} = useContext(CartContext)

  const { image, name, description, price} = props.book

  return (
    <>
      <Card className="card-base" style={{ width: "18rem" }}>
        <Card.Img className="card-image" src={image} />
        <Card.Body className="card-body">
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>Precio ${price}</Card.Text>
          <BuyButton className='card-button' addToCart={addToCart} book={props.book} />

        </Card.Body>
      </Card>
    </>
  );
}

export default CardBase

