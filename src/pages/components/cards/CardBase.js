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