import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import CartOffCanvas from './CartOffCanvas';


function NavBar() {
  return (
    <Navbar className="main-navbar">
      <Container fluid>
        <img className='navbar-logo' src="./img/Logo.jpeg" alt="logo book oasis" />
        <Navbar.Text className='navbar-title'>Book Oasis</Navbar.Text>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <CartOffCanvas/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;