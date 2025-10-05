import { useContext } from "react";
import { CartContext } from "@/context/cartContext";
import CardContainer from "./cards/CardContainer";

const Cart = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) return null;
  const { state } = cartContext;
  const products = state?.products || [];

  return (
    <>
      <CardContainer books={products} />
    </>
  );
};

export default Cart;
