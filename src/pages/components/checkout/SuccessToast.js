import { useState, useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { createPortal } from "react-dom";

const SuccessToast = ({ show, onClose, orderNumber, customerName }) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (show) {
      // Pequeño delay para la animación
      setTimeout(() => {
        setShowToast(true);
      }, 100);

      // Auto-cerrar después de 6 segundos
      const timer = setTimeout(() => {
        handleClose();
      }, 6000);

      return () => clearTimeout(timer);
    } else {
      setShowToast(false);
    }
  }, [show]);

  const handleClose = () => {
    setShowToast(false);
    setTimeout(() => {
      onClose();
    }, 300); // Delay para la animación de salida
  };

  if (!show) return null;

  const toastContent = (
    <ToastContainer
      position="top-center"
      className="success-toast-container"
      style={{ zIndex: 9999 }}
    >
      <Toast
        show={showToast}
        onClose={handleClose}
        className="success-toast"
        animation={true}
      >
        <Toast.Header className="success-toast-header">
          <div className="toast-icon-container">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="success-toast-icon"
            >
              <circle cx="12" cy="12" r="10" fill="#10b981" />
              <path
                d="M9 12l2 2 4-4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <strong className="toast-title">¡Compra Exitosa!</strong>
        </Toast.Header>
        <Toast.Body className="success-toast-body">
          <div className="toast-content">
            <p className="toast-message">
              ¡Hola <strong>{customerName}</strong>! Tu pedido ha sido procesado
              exitosamente.
            </p>
            <div className="toast-details">
              <div className="detail-item">
                <span className="detail-label">Número de orden:</span>
                <span className="detail-value">#{orderNumber}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Tiempo estimado:</span>
                <span className="detail-value">3-5 días hábiles</span>
              </div>
            </div>
            <div className="toast-footer">
              <small className="toast-footer-text">
                Recibirás un email de confirmación pronto
              </small>
            </div>
          </div>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );

  // Usar portal para montar el toast en el body
  return createPortal(toastContent, document.body);
};

export default SuccessToast;
