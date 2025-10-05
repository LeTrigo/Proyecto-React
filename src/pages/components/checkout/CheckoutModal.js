import { useState, useContext } from "react";
import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { CartContext } from "@/context/cartContext";

const CheckoutModal = ({ show, onHide, onOrderSuccess }) => {
  const cartContext = useContext(CartContext);
  if (!cartContext) return null;
  const { state, total, clearCart } = cartContext;
  const cart = state?.cart || [];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Información personal
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Dirección de envío
    address: "",
    city: "",
    postalCode: "",
    country: "Argentina",

    // Método de pago
    paymentMethod: "credit",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",

    // Información adicional
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Formatear automáticamente ciertos campos
    if (name === "cardNumber") {
      // Formatear número de tarjeta: 1234 5678 9012 3456
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ")
        .substr(0, 19);
    } else if (name === "expiryDate") {
      // Formatear fecha: MM/YY
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(?=\d)/, "$1/")
        .substr(0, 5);
    } else if (name === "cvv") {
      // Solo números para CVV
      formattedValue = value.replace(/\D/g, "").substr(0, 4);
    } else if (name === "phone") {
      // Formatear teléfono (simplificado)
      formattedValue = value.replace(/\D/g, "");
    } else if (name === "postalCode") {
      // Solo números para código postal
      formattedValue = value.replace(/\D/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Limpiar error específico cuando el usuario comience a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};

    if (stepNumber === 1) {
      if (!formData.firstName.trim())
        newErrors.firstName = "El nombre es requerido";
      if (!formData.lastName.trim())
        newErrors.lastName = "El apellido es requerido";
      if (!formData.email.trim()) newErrors.email = "El email es requerido";
      if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido";

      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Formato de email inválido";
      }
    }

    if (stepNumber === 2) {
      if (!formData.address.trim())
        newErrors.address = "La dirección es requerida";
      if (!formData.city.trim()) newErrors.city = "La ciudad es requerida";
      if (!formData.postalCode.trim())
        newErrors.postalCode = "El código postal es requerido";
    }

    if (stepNumber === 3) {
      if (formData.paymentMethod === "credit") {
        if (!formData.cardNumber.trim()) {
          newErrors.cardNumber = "El número de tarjeta es requerido";
        } else if (formData.cardNumber.replace(/\s/g, "").length < 16) {
          newErrors.cardNumber = "El número de tarjeta debe tener 16 dígitos";
        }

        if (!formData.expiryDate.trim()) {
          newErrors.expiryDate = "La fecha de vencimiento es requerida";
        } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
          newErrors.expiryDate = "Formato inválido (MM/YY)";
        }

        if (!formData.cvv.trim()) {
          newErrors.cvv = "El CVV es requerido";
        } else if (formData.cvv.length < 3) {
          newErrors.cvv = "El CVV debe tener al menos 3 dígitos";
        }

        if (!formData.cardName.trim())
          newErrors.cardName = "El nombre en la tarjeta es requerido";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const processOrder = async () => {
    if (!validateStep(3)) return;

    setIsProcessing(true);

    // Simular procesamiento de la orden
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Generar número de orden ficticio
    const orderNum = `BO-${Date.now()}`;
    setOrderNumber(orderNum);
    setIsProcessing(false);

    // Limpiar carrito después de la compra exitosa
    clearCart();

    // Llamar al callback con los datos de la orden
    const customerName =
      formData.firstName && formData.lastName
        ? `${formData.firstName} ${formData.lastName}`
        : "Cliente";

    if (onOrderSuccess) {
      onOrderSuccess(orderNum, customerName);
    }
  };

  const resetCheckout = () => {
    setStep(1);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "Argentina",
      paymentMethod: "credit",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
      notes: "",
    });
    setErrors({});
    setOrderCompleted(false);
    setOrderNumber("");
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetCheckout();
    onHide();
  };

  const renderStepContent = () => {
    if (orderCompleted) {
      return (
        <div className="checkout-success">
          <div className="success-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
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
          <h3 className="success-title">¡Compra realizada con éxito!</h3>
          <p className="success-message">
            Tu pedido <strong>#{orderNumber}</strong> ha sido procesado
            correctamente.
          </p>
          <div className="success-details">
            <p>
              Recibirás un email de confirmación en:{" "}
              <strong>{formData.email}</strong>
            </p>
            <p>
              Tiempo estimado de entrega: <strong>3-5 días hábiles</strong>
            </p>
          </div>
          <Button className="success-button" onClick={handleClose} size="lg">
            Continuar comprando
          </Button>
        </div>
      );
    }

    switch (step) {
      case 1:
        return (
          <div className="checkout-step">
            <h4 className="step-title">Información Personal</h4>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Nombre *</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    isInvalid={!!errors.firstName}
                    placeholder="Tu nombre"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Apellido *</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    isInvalid={!!errors.lastName}
                    placeholder="Tu apellido"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    isInvalid={!!errors.email}
                    placeholder="tu@email.com"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Teléfono *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    isInvalid={!!errors.phone}
                    placeholder="+54 11 1234-5678"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </div>
        );

      case 2:
        return (
          <div className="checkout-step">
            <h4 className="step-title">Dirección de Envío</h4>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group>
                  <Form.Label>Dirección *</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    isInvalid={!!errors.address}
                    placeholder="Calle y número"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Ciudad *</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    isInvalid={!!errors.city}
                    placeholder="Tu ciudad"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Código Postal *</Form.Label>
                  <Form.Control
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    isInvalid={!!errors.postalCode}
                    placeholder="1234"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.postalCode}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={12} className="mb-3">
                <Form.Group>
                  <Form.Label>País</Form.Label>
                  <Form.Select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="Argentina">Argentina</option>
                    <option value="Brasil">Brasil</option>
                    <option value="Chile">Chile</option>
                    <option value="Uruguay">Uruguay</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </div>
        );

      case 3:
        return (
          <div className="checkout-step">
            <h4 className="step-title">Método de Pago</h4>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group>
                  <Form.Label>Método de Pago</Form.Label>
                  <div className="payment-methods">
                    <Form.Check
                      type="radio"
                      name="paymentMethod"
                      value="credit"
                      checked={formData.paymentMethod === "credit"}
                      onChange={handleInputChange}
                      label="Tarjeta de Crédito/Débito"
                      className="payment-option"
                    />
                    <Form.Check
                      type="radio"
                      name="paymentMethod"
                      value="transfer"
                      checked={formData.paymentMethod === "transfer"}
                      onChange={handleInputChange}
                      label="Transferencia Bancaria"
                      className="payment-option"
                    />
                    <Form.Check
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === "cash"}
                      onChange={handleInputChange}
                      label="Pago contra entrega"
                      className="payment-option"
                    />
                  </div>
                </Form.Group>
              </Col>

              {formData.paymentMethod === "credit" && (
                <>
                  <Col md={12} className="mb-3">
                    <Form.Group>
                      <Form.Label>Número de Tarjeta *</Form.Label>
                      <Form.Control
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        isInvalid={!!errors.cardNumber}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.cardNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Vencimiento *</Form.Label>
                      <Form.Control
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        isInvalid={!!errors.expiryDate}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.expiryDate}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>CVV *</Form.Label>
                      <Form.Control
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        isInvalid={!!errors.cvv}
                        placeholder="123"
                        maxLength={4}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.cvv}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12} className="mb-3">
                    <Form.Group>
                      <Form.Label>Nombre en la Tarjeta *</Form.Label>
                      <Form.Control
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        isInvalid={!!errors.cardName}
                        placeholder="Como aparece en la tarjeta"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.cardName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </>
              )}

              {formData.paymentMethod === "transfer" && (
                <Col md={12} className="mb-3">
                  <Alert variant="info">
                    <strong>Datos para transferencia:</strong>
                    <br />
                    Banco: Banco Ejemplo
                    <br />
                    CBU: 0123456789012345678901
                    <br />
                    Alias: BOOK.OASIS.STORE
                    <br />
                    <br />
                    Envía el comprobante a: pagos@bookoasis.com
                  </Alert>
                </Col>
              )}

              {formData.paymentMethod === "cash" && (
                <Col md={12} className="mb-3">
                  <Alert variant="warning">
                    <strong>Pago contra entrega:</strong>
                    <br />
                    Podrás abonar en efectivo o con tarjeta al momento de
                    recibir tu pedido. Se aplicará un cargo adicional del 5% por
                    este servicio.
                  </Alert>
                </Col>
              )}

              <Col md={12} className="mb-3">
                <Form.Group>
                  <Form.Label>Notas adicionales (opcional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Instrucciones especiales de entrega, horarios preferenciales, etc."
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        );

      case 4:
        return (
          <div className="checkout-step">
            <h4 className="step-title">Resumen del Pedido</h4>
            <div className="order-summary">
              <div className="summary-section">
                <h6>Información Personal</h6>
                <p>
                  {formData.firstName} {formData.lastName}
                </p>
                <p>{formData.email}</p>
                <p>{formData.phone}</p>
              </div>

              <div className="summary-section">
                <h6>Dirección de Envío</h6>
                <p>{formData.address}</p>
                <p>
                  {formData.city}, {formData.postalCode}
                </p>
                <p>{formData.country}</p>
              </div>

              <div className="summary-section">
                <h6>Método de Pago</h6>
                <p>
                  {formData.paymentMethod === "credit" &&
                    "Tarjeta de Crédito/Débito"}
                  {formData.paymentMethod === "transfer" &&
                    "Transferencia Bancaria"}
                  {formData.paymentMethod === "cash" && "Pago contra entrega"}
                </p>
              </div>

              <div className="summary-section">
                <h6>Productos ({cart.length})</h6>
                {cart.map((item, index) => (
                  <div key={index} className="summary-item">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="summary-total">
                  <strong>Total: ${total.toLocaleString()}</strong>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      className="checkout-modal"
    >
      <Modal.Header closeButton className="checkout-header">
        <Modal.Title>
          {orderCompleted ? "¡Compra Exitosa!" : "Finalizar Compra"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="checkout-body">
        {!orderCompleted && (
          <div className="checkout-progress">
            <div className="progress-steps">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`progress-step ${step >= stepNumber ? "active" : ""} ${step > stepNumber ? "completed" : ""}`}
                >
                  <div className="step-circle">
                    {step > stepNumber ? "✓" : stepNumber}
                  </div>
                  <div className="step-label">
                    {stepNumber === 1 && "Personal"}
                    {stepNumber === 2 && "Envío"}
                    {stepNumber === 3 && "Pago"}
                    {stepNumber === 4 && "Resumen"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {renderStepContent()}
      </Modal.Body>

      {!orderCompleted && (
        <Modal.Footer className="checkout-footer">
          <div className="footer-content">
            <div className="footer-total">
              <strong>Total: ${total.toLocaleString()}</strong>
            </div>
            <div className="footer-buttons">
              {step > 1 && (
                <Button
                  variant="outline-secondary"
                  onClick={prevStep}
                  disabled={isProcessing}
                >
                  Anterior
                </Button>
              )}

              {step < 4 ? (
                <Button
                  variant="primary"
                  onClick={nextStep}
                  disabled={isProcessing}
                  className="next-button"
                >
                  Continuar
                </Button>
              ) : (
                <Button
                  variant="success"
                  onClick={processOrder}
                  disabled={isProcessing}
                  className="finish-button"
                >
                  {isProcessing ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      />
                      Procesando...
                    </>
                  ) : (
                    "Finalizar Compra"
                  )}
                </Button>
              )}
            </div>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CheckoutModal;
