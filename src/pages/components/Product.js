import React, { useContext } from "react";
import { CartContext } from "@/context/CartContext";

const Product = ({ product }) => {
  const { name, price, id, description, image } = product;
  const { addToCart } = useContext(CartContext);
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
