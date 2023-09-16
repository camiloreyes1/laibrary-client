import { post } from "../services/authService"
import { useState,useContext } from "react"
import { AuthContext } from "../context/auth.context";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const Question = () => {
const [question, setQuestion] =useState("")


const handleQuestion = (e) => setQuestion(e.target.value);

const ask =(e) => {
    e.preventDefault();

    post('api/search', requestBody)
    .then((response) => {
      console.log('JWT token', response.data);


    })
    .catch((error) => {
      console.log("Error", error)
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    })
}
    
  return (
    <div>
      <Row className="mb-3">
        <form onSubmit={ask}>
          <Form.Group as={Col} md="3" controlId="validationCustom01">

            <Form.Label>Your Question</Form.Label>
            <Form.Control
              onSubmit={ask}
              type="text"
              name="email"
              value={question}
              onChange={handleQuestion}
            >
            </Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <br></br>
          <Button type="submit">Send Question</Button>
        </form>
      </Row>
    </div>
  )
}

export default Question
