import { BsFillTrash3Fill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useReducer } from "react";

const CartItem = ({ item, deleteFromCart, addToCart, product }) => {
  const { name, price, id, quantity, image } = item;
  return (
    <>
      <Container
        className="products   xl-25    d-flex  
       "
      >
        <div className=" d-flex products align-items-center justify-content-center border border-black rounded-1 ">
          <Row className="mb-2 ">
            <Col
              sm={12}
              md={2}
              lg={3}
              xl={3}
              className="d-flex justify-content-center "
            >
              <img className="img-fluid " src={image}></img>
            </Col>

            <Col
              xs={5}
              className="  d-flex flex-column justify-content-center   "
            >
              <h5 className="mb-4">{name}</h5>

              <h6 className="mb-4">$ {price * quantity}</h6>
              <div className="d-flex justify-content-between align-items-center">
                <Button
                  className="rounded-5"
                  variant="outline-info"
                  onClick={() => {
                    addToCart(id, product);
                  }}
                >
                  +
                </Button>{" "}
                <h5>{quantity}</h5>{" "}
                <Button
                  className="rounded-4"
                  variant="outline-info"
                  onClick={() => deleteFromCart(id)}
                >
                  -
                </Button>{" "}
              </div>
            </Col>

            <Col xs={1} className="d-flex  h-25 justify-content-center mt-5  ">
              <Button
                className="rounded-5"
                variant="outline-danger"
                onClick={() => deleteFromCart(id, true)}
              >
                <BsFillTrash3Fill />
              </Button>{" "}
            </Col>
          </Row>

          <Row className="mb-2">
            <Col className="d-flex justify-content-center "></Col>
          </Row>
        </div>
      </Container>

      <style jsx>
        {`
          img {
            max-width: 100%;
            object-fit: cover;
          }
          .products {
            width: 500px;
            // background-color: #d3c4c4;
          }

          @media (max-width: 768px) {
            .products {
              width: 300px;
            }
          }
        `}
      </style>
    </>
  );
};

export default CartItem;
