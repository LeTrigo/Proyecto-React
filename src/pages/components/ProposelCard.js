import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaBookOpen, FaCartPlus } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";

const cardsData = [
  {
    icon: <FaBookOpen size={30} style={{ color: " #44BED4" }} />,
    title: "Descubrir nuevos mundos y autores:",
    text: "Sumérgete en historias cautivadoras, descubre nuevos autores y géneros que te apasionarán. ¡Amplía tus horizontes literarios!.",
  },
  {
    icon: <FaCartPlus size={30} style={{ color: " #44BED4" }} />,
    title: "Adquiere múltiples libros con descuentos",
    text: "¡Llena tu biblioteca a precios increíbles! Benefíciate de nuestros descuentos por cantidad y arma tu propia colección personalizada.",
  },
  {
    icon: <GiBookshelf size={30} style={{ color: " #44BED4" }} />,
    title: "Fomenta la cultura y el conocimiento:",
    text: "Al comprar en Oasis, contribuyes a fomentar la cultura y el conocimiento en tu comunidad. ¡Sé parte de un movimiento que transforma vidas a través de la lectura!.",
  },
  {
    icon: <FaPeopleGroup size={30} style={{ color: " #44BED4" }} />,
    title: "Únete a nuestra comunidad de lectores:",
    text: "Forma parte de nuestro Club de Lectura y disfruta de encuentros mensuales con otros apasionados por los libros, recomendaciones personalizadas y eventos exclusivos.",
  },
];

const ProposelCard = () => {
  return (
    <>
      <Container className="py-5 modern-proposel-container">
        <h2 className="text-center mb-5 modern-proposel-title">
          ¿Por qué elegir{" "}
          <span style={{ color: "#44BED4" }}>la calidad Premium de Oasis?</span>
        </h2>
        <Row className="modern-proposel-row">
          {cardsData.map((card, index) => (
            <Col
              key={index}
              sm={12}
              md={6}
              lg={3}
              className="mb-4 modern-proposel-col"
            >
              <Card className="h-100 text-center border-0 modern-proposel-card">
                <Card.Body>
                  <div className="mb-3 modern-proposel-icon">{card.icon}</div>
                  <Card.Title className="modern-proposel-card-title">
                    {card.title}
                  </Card.Title>
                  <Card.Text className="modern-proposel-card-text">
                    {card.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <style jsx>{`
        .modern-proposel-container {
          background-color: #f9f9f9;
          border-radius: 10px;
          padding: 2rem;
        }

        .modern-proposel-title {
          font-size: 1.8rem;
          font-weight: bold;
        }

        .modern-proposel-row {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modern-proposel-col {
          display: flex;
          justify-content: center;
        }

        .modern-proposel-card {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .modern-proposel-card:hover {
          transform: translateY(-10px);
        }

        .modern-proposel-icon {
          color: #44bed4;
        }

        .modern-proposel-card-title {
          font-size: 1.2rem;
          font-weight: bold;
        }

        .modern-proposel-card-text {
          font-size: 1rem;
          color: #555;
        }

        @media (max-width: 768px) {
          .modern-proposel-title {
            font-size: 1.5rem;
          }

          .modern-proposel-card-title {
            font-size: 1rem;
          }

          .modern-proposel-card-text {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
};

export default ProposelCard;
