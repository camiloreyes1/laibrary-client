import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavbarComponent = () => {

  const { user, logOutUser } = useContext(AuthContext);

  const getToken = () => {
    return localStorage.getItem('authToken')
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="/" ><p class="fw-bold m-2">
            AISeek
          </p>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

              {getToken() && (
                <>
               <Nav.Link href="/profile">My profile</Nav.Link>
               <Nav.Link href="/" onClick={logOutUser}>Logout</Nav.Link>
                </>
              )}

              {!getToken() && (
                <>
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
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
