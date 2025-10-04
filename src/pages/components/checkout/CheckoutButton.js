import { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { CartContext } from "@/context/cartContext";
import CheckoutModal from "../checkout/CheckoutModal";
import SuccessToast from "./SuccessToast";

const CheckoutButton = () => {
  const { state } = useContext(CartContext);
  const { cart } = state;
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [orderData, setOrderData] = useState({
    orderNumber: "",
    customerName: "",
  });

  const handleCheckoutClick = () => {
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
  };

  const handleOrderSuccess = (orderNumber, customerName) => {
    setOrderData({ orderNumber, customerName });
    setShowCheckout(false);
    // Mostrar toast después de cerrar el modal
    setTimeout(() => {
      setShowSuccessToast(true);
    }, 300);
  };

  // Solo ocultar el botón si el carrito está vacío Y no hay toast activo
  if (cart.length === 0 && !showSuccessToast) {
    return (
      <>
        <SuccessToast
          show={showSuccessToast}
          onClose={() => setShowSuccessToast(false)}
          orderNumber={orderData.orderNumber}
          customerName={orderData.customerName}
        />
      </>
    );
  }

  return (
    <>
      <div className="checkout-button-container">
        <Button
          className="modern-checkout-button"
          onClick={handleCheckoutClick}
          size="lg"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="checkout-icon"
          >
            <path
              d="M9 12l2 2 4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Finalizar Compra
        </Button>
      </div>

      <CheckoutModal
        show={showCheckout}
        onHide={handleCloseCheckout}
        onOrderSuccess={handleOrderSuccess}
      />

      <SuccessToast
        show={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        orderNumber={orderData.orderNumber}
        customerName={orderData.customerName}
      />
    </>
  );
};

export default CheckoutButton;
