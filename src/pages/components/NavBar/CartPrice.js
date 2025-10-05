import ClearCartButton from "./ClearCartButton";
import CheckoutButton from "../checkout/CheckoutButton";
import { useContext } from "react";
import { CartContext } from "@/context/cartContext";

const CartPrice = ({ clearCart }) => {
  const cartContext = useContext(CartContext);
  if (!cartContext) return null;
  const { total } = cartContext;
  return (
    <>
      <div className="modern-cart-summary">
        <div className="cart-total-section">
          <div className="total-label-container">
            <span className="total-label">Total de tu compra:</span>
          </div>
          <div className="total-amount-container">
            <span className="total-amount">
              ${total ? total.toLocaleString() : 0}
            </span>
          </div>
        </div>
        <div className="cart-actions-section">
          <ClearCartButton
            className="modern-clear-cart-button"
            clearCart={clearCart}
          />
        </div>
      </div>
      <CheckoutButton />
    </>
  );
};

export default CartPrice;
