import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { BsCart } from "react-icons/bs";

function ItemInCart({ product }) {
  const { name, price, description, image } = product;
  return (
    <>
      <div className="card mb-3" style="max-width: 540px;">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="./img/"
              class="img-fluid rounded-start"
              alt="a ver si anda"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">.</p>
              <p className="card-text"></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemInCart;
