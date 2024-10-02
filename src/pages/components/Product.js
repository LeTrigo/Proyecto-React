import { CartContext } from "@/context/cartContext";
import React, { useContext } from "react";

const Product = ({ product, addToCart }) => {
  const { name, price, id, description, image } = product;
  return (
    <>
      <div className="product">
        <img src={image}></img>
        <h4>{name}</h4>
        <h5>${price}</h5>
        <p>{description}</p>
        <button
          onClick={() => {
            addToCart(id, product);
          }}
        >
          Agregar
        </button>
      </div>
    </>
  );
};

export default Product;
