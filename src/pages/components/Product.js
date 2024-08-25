import React from "react";

const Product = ({ product }) => {
  const { name, price, id } = product;
  return (
    <>
      <div className="product">
        <h4>{name}</h4>
        <h5>${price}</h5>
        <button>Agregar</button>
      </div>
    </>
  );
};

export default Product;
