import { useContext } from "react";
import CartItem from "./CartItem";
import { CartContext } from "@/context/cartContext";

const ShoppingSection = () => {
  const { state, addToCart, deleteFromCart } = useContext(CartContext);
  const { cart } = state;

  return (
    <>
      <div className="shopping-section">
        {cart.length > 0 ? (
          cart.map((item, i) => (
            <CartItem
              key={i}
              item={item}
              addToCart={addToCart}
              deleteFromCart={deleteFromCart}
            />
          ))
        ) : (
          <div className="empty-cart-message">
            <div className="empty-cart-icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H7"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h6 className="empty-cart-title">Tu carrito está vacío</h6>
            <p className="empty-cart-description">
              Agrega algunos productos para comenzar tu compra
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingSection;
