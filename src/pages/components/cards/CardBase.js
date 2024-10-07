import Card from "react-bootstrap/Card";
import BuyButton from "../button/BuyButton";

function CardBase(props) {

/*   const {image, name, description, price} = props.books */



  return (
    <Card className="card-container" style={{ width: "18rem" }}>
      <Card.Img variant="top" src="./img/eloquent-js.jpeg" />
      <Card.Body>
        <Card.Title>name</Card.Title>
        <Card.Text>description</Card.Text>
        <Card.Text>`Precio: $price`</Card.Text>
        <BuyButton />
      </Card.Body>
    </Card>
  );
}

export default CardBase;
