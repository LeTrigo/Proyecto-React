import Card from "react-bootstrap/Card";
import BuyButton from "../button/BuyButton";




const CardBase = (props) => {

  const { image, name, description, price } = props.book

  return (
    <>
      <Card className="card-base" style={{ width: "18rem" }}>
        <Card.Img className="card-image" src={image} />
        <Card.Body className="card-body">
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>Precio ${price}</Card.Text>
          <BuyButton className="card-button"/>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardBase

