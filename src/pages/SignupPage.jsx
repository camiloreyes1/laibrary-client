import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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

    post('/auth/signup', user)
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
      <div className="m-3">
<br></br>

      <h1 className="d-flex flex-wrap justify-content-xl-center">Sign Up</h1>
      <br></br>

    <form  onSubmit={handleSignupSubmit}>

      <div className="d-flex flex-wrap justify-content-xl-center">

      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
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

        <Form.Group as={Col} md="12" controlId="validationCustom02">
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

      </div>
      <br></br>
      <div className="d-flex flex-wrap justify-content-xl-center">

      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
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

        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Password</Form.Label>
          <Form.Control
         type="password"
         name="password"
         value={user.password}
         onChange={handleTextChange}
          >
          </Form.Control>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <br></br>
          <div className="d-grid gap-2">

        <Button  type="submit" size="md" variant="secondary">Sign Up</Button>

          </div>
        </Form.Group>
      </Row>

        <br></br>
  
      </div>

      {errorMessage && <p className="error-message d-flex justify-content-center">{errorMessage}</p>}

      <p className="d-flex flex-wrap justify-content-xl-center">Already have account?</p>
      <NavLink
          className="d-flex flex-wrap justify-content-xl-center"
          to="/signup"
          style={{
            fontWeight: "bold",
            textDecoration: "none",
            color: "blue",
          }}
        >
          Login
        </NavLink>
      </form>

        
      </div>
    </div>
  )
}

export default SignupPage;

