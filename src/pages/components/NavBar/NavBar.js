import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import CartOffCanvas from "./CartOffCanvas";
import { useContext } from "react";
import { CartContext } from "@/context/cartContext";
import Image from "next/image";

function NavBar() {
  const cartContext = useContext(CartContext);
  if (!cartContext) return null;
  const { cartItemCount } = cartContext;

  const scrollToCards = () => {
    const cardsSection = document.getElementById("cards-section");
    if (cardsSection) {
      cardsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Navbar expand="lg" fixed="top" className="modern-navbar">
      <Container className="modern-nav-container" fluid>
        {/* Brand Section */}
        <div className="navbar-brand-section">
          <Image
            className="modern-navbar-logo"
            src="/Logo.jpeg"
            alt="Book Oasis Logo"
            width={45}
            height={45}
          />
          <Navbar.Brand className="modern-navbar-title">
            Book Oasis
          </Navbar.Brand>
        </div>

        {/* Action Items */}
        <div className="navbar-actions">
          <div
            className="modern-search-trigger"
            onClick={() => {
              scrollToCards();
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="action-label">Buscar</span>
          </div>

          <div className="modern-user-trigger">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="action-label">Cuenta</span>
          </div>

          <div className="modern-cart-trigger-container">
            <CartOffCanvas />
            {cartItemCount > 0 && (
              <span className="modern-cart-badge">{cartItemCount}</span>
            )}
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
