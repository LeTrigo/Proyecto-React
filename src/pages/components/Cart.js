import { useContext } from "react";
import { CartContext } from "@/context/cartContext";
import CardContainer from "./cards/CardContainer";

const Cart = () => {
  const { state } = useContext(CartContext);

  const { products } = state;

  return (
    <>
      <CardContainer books={products} />
    </>
  );
};

export default Cart;
