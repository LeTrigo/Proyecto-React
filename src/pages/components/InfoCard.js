import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BsCheck2Circle } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Image from "next/image";

const InfoCard = () => {
  const scrollToCards = () => {
    const cardsSection = document.getElementById("cards-section");
    if (cardsSection) {
      cardsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Container fluid className="info-container modern-info-container">
        <Row className="modern-info-row">
          <Col className="info__container modern-info-text" sm={12} md={6}>
            <h5 className="modern-info-title">
              <span>¿Quién te trae </span> tus libros?
            </h5>
            <div className="info__container d-grid modern-info-content">
              <p>
                <BsCheck2Circle color="skyblue" size={20} />
                <b>Nuestra misión</b> es fomentar la lectura y el amor por los
                libros, acercando a nuestros clientes a historias que inspiran y
                emocionan.
              </p>
              <p>
                <BsCheck2Circle color="skyblue" size={20} />
                <b> La lectura nos conecta</b> con otras culturas, ideas y
                formas de ver el mundo, ampliando nuestra perspectiva y
                enriqueciendo nuestra vida
              </p>
              <p>
                <BsCheck2Circle color="skyblue" size={20} />
                <b>Adquirir un libro</b> en una librería local es más que una
                compra, es una experiencia que fomenta el apoyo a la cultura y a
                los autores independientes.
              </p>
              <p>
                <BsCheck2Circle color="skyblue" size={20} />
                <b>La lectura es una herramienta poderosa</b> para el desarrollo
                personal y comunitario. Al promover la lectura, contribuimos a
                crear una sociedad más informada y crítica.
              </p>
              <p>
                <BsCheck2Circle color="skyblue" size={20} />
                <b>Adquirir un libro</b> en una librería local es más que una
                compra, es una experiencia que fomenta el apoyo a la cultura y a
                los autores independientes.
              </p>
            </div>
            <div className="d-grid gap-2 modern-info-button-container">
              <Button
                variant="primary"
                size="lg"
                className="modern-info-button"
                onClick={scrollToCards}
              >
                Ir a comprar
              </Button>
            </div>
          </Col>
          <Col
            sm={12}
            md={6}
            className="d-flex justify-content-center align-items-center modern-info-image-container"
          >
            <div className="image__container modern-info-image">
              <Image
                className="image modern-info-image-content"
                src="/img/carousel2.jpeg"
                alt=""
                width={400}
                height={300}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .modern-info-container {
          background-color: #f9f9f9;
          border-radius: 10px;
          padding: 2rem;
        }

        .modern-info-title {
          font-size: 1.8rem;
          font-weight: bold;
        }

        .modern-info-content p {
          font-size: 1rem;
          color: #555;
        }

        .modern-info-button-container {
          margin-top: 1rem;
        }

        .modern-info-button {
          background-color: #44bed4;
          border: none;
          transition: background-color 0.3s ease;
        }

        .modern-info-button:hover {
          background-color: #3aaac0;
        }

        .modern-info-image-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modern-info-image-content {
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .modern-info-title {
            font-size: 1.5rem;
          }

          .modern-info-content p {
            font-size: 0.9rem;
          }

          .modern-info-button {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
};

export default InfoCard;
