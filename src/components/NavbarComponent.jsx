import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navbar, Container, Nav } from 'react-bootstrap';
import {NavLink } from 'react-router-dom';

const NavbarComponent = () => {

  const { user, logOutUser } = useContext(AuthContext);

  const getToken = () => {
    return localStorage.getItem('authToken')
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand>
            <NavLink className="nav-link" to="/">
              AISeek
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {getToken() && (
                <div>
                  <NavLink to="/" onClick={logOutUser} className="nav-link">
                    Logout
                  </NavLink>
                </div>
              )}

              {!getToken() && (
                <>
                  <NavLink to="/signup" className="nav-link">
                    Sign Up
                  </NavLink>

                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavbarComponent
