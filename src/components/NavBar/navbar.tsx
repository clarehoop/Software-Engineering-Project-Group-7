import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../styles/bootstrap-scoped.css';
import navBarStyles from './navbar.module.css'
import BaseButton from '../Button/button';
import { NavLink, useLocation } from 'react-router-dom';
import SearchButton from '../Search-Button/search-button';
import useRedirect from '../../hooks/useRedirect';
import { NavDropdown } from 'react-bootstrap';
import { useAuth } from '../../context/Auth';


function NavBar() {

  const {user, setUser} = useAuth();
  const redirect = useRedirect();

  const location = useLocation();
  const hideButtonOn = ['/sign-in', '/sign-up']
  const showButton = !hideButtonOn.includes(location.pathname);

  return (
    <div className = "bootstrap-scope">
    <Navbar expand="lg" className={navBarStyles.navBar}>
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={"mx-auto " + navBarStyles.navBarText}>
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/listings">Listings</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            <Nav.Link as={NavLink} to="/help">Help</Nav.Link> 
          </Nav>
        </Navbar.Collapse>
        <div className = {navBarStyles.navBarSection}>
    <SearchButton/>
   { /* <img src="src/images/navbar-profile.png"/> */ }
    
        {showButton && (
          user
          ? <NavDropdown title={user.username} className={navBarStyles.navBarText}>
            <NavDropdown.Item onClick={() => {
              setUser(null);
              redirect('/sign-in');
            }}>
              Sign Out
            </NavDropdown.Item>
          </NavDropdown>
          : <BaseButton children ="Sign In" onClick={()=> redirect("/sign-in")}/>)}
        </div>
      </Container>
    </Navbar>
    </div>
  );
}

export default NavBar;