import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import CartOffCanvas from './CartOffCanvas';
import { Image } from 'react-bootstrap';


function NavBar() {
  return (
    <Navbar className="main-navbar">
      <Container fluid>
        <img className='navbar-logo' src="./img/Logo.jpeg" alt="logo book oasis" />
        <Navbar.Text className='navbar-title'>Book Oasis</Navbar.Text>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <div className='search-trigger'>
          <Image className='search-icon' src='./img/search-icon.png' />
          </div>
          <div className='user-trigger'>
          <Image className='user-icon' src='./img/user-icon.png' />
          </div>
          <CartOffCanvas/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;