import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { BsCheck2Circle } from "react-icons/bs";
import Button from "react-bootstrap/Button";

const InfoCard = () => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />
      <Container fluid className="container border">
        {" "}
        <Row>
          <Col ClassName="info__container" sm={12} md={6}>
            <h5>
              <span>¿Quién te trae </span> tus libros?
            </h5>
            <div className="info__container d-grid ">
              <p>
                {" "}
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
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg">
                Ir a comprar{" "}
              </Button>
            </div>
          </Col>
          <Col
            sm={12}
            md={6}
            className=" d-flex justify-content-center align-items-center "
          >
            {" "}
            <div className="image__container ">
              <img className="image" src="/img/carousel2.jpeg" />
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>
        {`

        span{
        color: lightblue;
        font-weight: bold;
        }
          p {
            font-size: 13px;
          }
          @media screen and (min-width: 768px) {
            .info__container {
            padding-top: 3rem;
                display: flex;
          
                align-items: center;
                justify-content: center;
            }
            p {
              font-size: 15px;
            }
          }

          @media screen and (min-width: 992px) {
            p {
              font-size: 18px;
            }
        }


          .image__container{
          width: 100%
          
          }

          .image {
            width: 100%;
            height:100%

            object-fit: cover;
          }

          .container border {
            padding-top: 50px;
          }
        `}
      </style>
    </>
  );
};

export default InfoCard;
