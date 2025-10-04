import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SocialIcons from "./SocialIcons";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className="modern-footer">
        <Container className="modern-footer-container">
          {/* Main Footer Content */}
          <Row className="footer-main-content">
            {/* Brand Section */}
            <Col xs={12} md={6} lg={3} className="footer-brand-section">
              <div className="footer-logo-container">
                <Image
                  src="/Logo.jpeg"
                  alt="Book Oasis Logo"
                  className="footer-logo"
                  width={80}
                  height={80}
                />
                <h4 className="footer-brand-name">Book Oasis</h4>
              </div>
              <p className="footer-brand-description">
                Tu destino favorito para descubrir historias extraordinarias.
                Libros que inspiran, educan y entretienen para todas las edades.
              </p>
            </Col>

            {/* About Section */}
            <Col xs={12} md={6} lg={3} className="footer-section">
              <h5 className="footer-section-title">Sobre Nosotros</h5>
              <ul className="footer-links">
                <li>
                  <a href="#about">Nuestra Historia</a>
                </li>
                <li>
                  <a href="#mission">Misión y Visión</a>
                </li>
                <li>
                  <a href="#terms">Condiciones de Uso</a>
                </li>
                <li>
                  <a href="#privacy">Políticas de Privacidad</a>
                </li>
              </ul>
            </Col>

            {/* Help Section */}
            <Col xs={12} md={6} lg={3} className="footer-section">
              <h5 className="footer-section-title">Centro de Ayuda</h5>
              <ul className="footer-links">
                <li>
                  <a href="#payment">Medios de Pago</a>
                </li>
                <li>
                  <a href="#shipping">Formas de Envío</a>
                </li>
                <li>
                  <a href="#orders">Estado de Pedidos</a>
                </li>
                <li>
                  <a href="#returns">Devoluciones</a>
                </li>
                <li>
                  <a href="#faq">Preguntas Frecuentes</a>
                </li>
              </ul>
            </Col>

            {/* Social Section */}
            <Col xs={12} md={6} lg={3} className="footer-section">
              <h5 className="footer-section-title">Síguenos</h5>
              <p className="social-description">
                Mantente al día con nuestras novedades y recomendaciones
              </p>
              <div className="footer-social-container">
                <SocialIcons />
              </div>
            </Col>
          </Row>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <Row className="align-items-center">
              <Col xs={12} md={6} className="footer-copyright">
                <p>&copy; 2025 Book Oasis. Todos los derechos reservados.</p>
              </Col>
              <Col xs={12} md={6} className="footer-bottom-links">
                <div className="bottom-links">
                  <a href="#contact">Contacto</a>
                  <a href="#sitemap">Mapa del Sitio</a>
                  <a href="#accessibility">Accesibilidad</a>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
