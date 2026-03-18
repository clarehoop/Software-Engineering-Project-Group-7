import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../styles/bootstrap-scoped.css';
import navBarStyles from './navbar.module.css'
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  return (
    <div className = "bootstrap-scope">
    <Navbar expand="lg" className={navBarStyles.navBar}>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#help">Help</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default NavBar;