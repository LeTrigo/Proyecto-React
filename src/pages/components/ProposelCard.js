import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBookOpen, FaCartPlus } from 'react-icons/fa';
import { GiBookshelf } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
import 'bootstrap/dist/css/bootstrap.min.css';

const cardsData = [
  {
    icon: <FaBookOpen size={30} style={{ color: ' #44BED4' }} />,
    title: 'Descubrir nuevos mundos y autores:',
    text: 'Sumérgete en historias cautivadoras, descubre nuevos autores y géneros que te apasionarán. ¡Amplía tus horizontes literarios!.'
  },
  {
    icon: <FaCartPlus size={30} style={{ color: ' #44BED4' }} />,
    title: 'Adquiere múltiples libros con descuentos',
    text: '¡Llena tu biblioteca a precios increíbles! Benefíciate de nuestros descuentos por cantidad y arma tu propia colección personalizada.'
  },
  {
    icon: <GiBookshelf size={30} style={{ color: ' #44BED4' }} />,
    title: 'Fomenta la cultura y el conocimiento:',
    text: 'Al comprar en Oasis, contribuyes a fomentar la cultura y el conocimiento en tu comunidad. ¡Sé parte de un movimiento que transforma vidas a través de la lectura!.'
  },
  {
    icon: <FaPeopleGroup size={30} style={{ color: ' #44BED4' }} />,
    title: 'Únete a nuestra comunidad de lectores:',
    text: 'Forma parte de nuestro Club de Lectura y disfruta de encuentros mensuales con otros apasionados por los libros, recomendaciones personalizadas y eventos exclusivos.'
  }
];

const ProposelCard = () => {
  return (
    <>
      <Container className="py-5">
        <h2 className="text-center mb-5">
          ¿Por qué elegir <span style={{ color: '#44BED4' }}>la calidad Premium de Oasis?</span>
        </h2>
        <Row>
          {cardsData.map((card, index) => (
            <Col key={index} sm={12} md={3} className="mb-4">
              <Card className="h-100 text-center border-0">
                <Card.Body>
                  <div className="mb-3">{card.icon}</div>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>


    </>
  );
};

export default ProposelCard;


