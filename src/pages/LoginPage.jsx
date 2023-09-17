import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/authService";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext)


  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    post('auth/login', requestBody)
      .then((response) => {

        console.log('JWT token', response.data.authToken);
        storeToken(response.data.authToken)
        authenticateUser()
        navigate('/');                             // <== ADD      
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  return (
    <div className="LoginPage">
      <div class="m-3">

        <br></br>

      <h1 className="d-flex flex-wrap justify-content-xl-center">Login</h1>
      <br></br>

      <div className="d-flex flex-wrap justify-content-xl-center">

      <Row className="mb-3">
        <form onSubmit={handleLoginSubmit}>
          <Form.Group as={Col} md="12" controlId="validationCustom01">

            <Form.Label>Email</Form.Label>
            <Form.Control
              onSubmit={handleLoginSubmit}
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            >
            </Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="15" controlId="validationCustom02">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onSubmit={handleLoginSubmit}
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </Form.Group>
          <br></br>
          <div className="d-grid gap-2">
          <Button type="submit">Login</Button>


          </div>
        </form>
      </Row>

      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="d-flex flex-wrap justify-content-xl-center">Don't have an account yet?</p>

      <Link className="d-flex flex-wrap justify-content-xl-center" to="/signup"> Sign Up</Link>
      </div>
    </div>
  )
}

export default LoginPage;