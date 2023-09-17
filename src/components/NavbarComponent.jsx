import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom"

const NavbarComponent = () => {

  const { user, logOutUser } = useContext(AuthContext);

  const getToken = () => {
    return localStorage.getItem('authToken')
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
        <Container fluid>
        <Link to = "/">
          <Navbar.Brand ><p class="fw-bold m-2">
            AISeek
          </p>
          </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

              {getToken() && (
                <div>
               <Link to="/" onClick={logOutUser}>Logout</Link>
                </div>
              )}

              {!getToken() && (
                <>
                  <Link to="/signup">Sign Up</Link>
                  <Link to="/login">Login</Link>
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
