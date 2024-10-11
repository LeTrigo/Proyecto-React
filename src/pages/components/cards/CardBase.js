<<<<<<< HEAD
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import image from '../../../../public/img/eloquent-js.jpeg';
import BuyButton from '../button/PrimaryButton';
 

function CardBase() {
  return (
    <Card className='card-container' style={{ width: '18rem' }}>
      <Card.Img variant="top" src='./Logo.jpeg' />
      <Card.Body>
        <Card.Title>Nombre del libro</Card.Title>
        <Card.Text>
        Descripcion del articulo
        </Card.Text>
        <Card.Text>
          Precio: 
        </Card.Text>
        <BuyButton />
      </Card.Body>
    </Card>
  );
}

export default CardBase;
=======
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
>>>>>>> origin/cards
