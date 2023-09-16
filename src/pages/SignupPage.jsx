import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { post } from "../services/authService";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';



function SignupPage() {

  const [user, setUser] = useState({

    fullName: "",
    occupation: "",
    email: "",
    password: "",

  })

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    post('auth/signup', user)
      .then((response) => {
        console.log('JWT token', response.data.authToken);
        storeToken(response.data.authToken)
        authenticateUser()
        navigate('/');
      })
      .catch((error) => {
        console.log("Error", error)
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };


  return (
    <div className="SignupPage">
      <div class="m-3">


      <h1>Sign Up</h1>
      <br></br>
    <form onSubmit={handleSignupSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label>Full name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleTextChange}
          >
          </Form.Control>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom02">
          <Form.Label>Occupation</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              name="occupation"
              value={user.occupation}
              onChange={handleTextChange}
            />
          </InputGroup>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Email</Form.Label>
          <Form.Control
           type="email"
           name="email"
           value={user.email}
           onChange={handleTextChange}
          >
          </Form.Control>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label>Password</Form.Label>
          <Form.Control
         type="password"
         name="password"
         value={user.password}
         onChange={handleTextChange}
          >
          </Form.Control>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
        <Button type="submit">Sign Up</Button>
      </form>

        
        <br></br>
        <br></br>
  
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to="/login"> Login</Link>
      </div>
    </div>
  )
}

export default SignupPage;

