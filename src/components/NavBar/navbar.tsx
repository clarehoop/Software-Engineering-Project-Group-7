import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../styles/bootstrap-scoped.css';
import navBarStyles from './navbar.module.css'
import BaseButton from '../Button/button';
import { NavLink } from 'react-router-dom';
import SearchBar from '../Search-Button/search-button';

function NavBar() {
  return (
    <div className = "bootstrap-scope">
    <Navbar expand="lg" className={navBarStyles.navBar}>
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={"mx-auto " + navBarStyles.navBarText}>
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            <Nav.Link as={NavLink} to="/help">Help</Nav.Link> 
          </Nav>
        </Navbar.Collapse>
        <div className = {navBarStyles.navBarSection}>
    <SearchBar/>
    <img src="src/images/navbar-profile.png"/>
    
        <BaseButton 
        children ="Sign In"/>
        </div>
      </Container>
    </Navbar>
    </div>
  );
}

export default NavBar;