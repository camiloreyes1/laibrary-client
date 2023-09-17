import { post } from "../services/authService";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Card } from "react-bootstrap";

const Question = () => {
  const [question, setQuestion] = useState("");
  const { user } = useContext(AuthContext);
  const [asked, setState] = useState(false);
  const [gptText, setText] = useState("");
  let job;
  if(user){
    job = user.occupation;
  }

  const requestBody = { job, question };

  const handleQuestion = (e) => setQuestion(e.target.value);

  const ask = (e) => {
    e.preventDefault();
    setState(true)
    console.log("Request body ===>",requestBody)
    console.log("User ===>",user)
    post('/api/search', requestBody)
      .then((response) => {
        setState(false)
        console.log('GPT answer', response.data);
        setQuestion("")
        setText(response.data.text)
      })
      .catch((error) => {
        console.log("Error", error)
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  }

  return (
    <div>

      {asked && <img className="rounded mx-auto d-block" src="https://res.cloudinary.com/dyto7dlgt/image/upload/v1691760277/project3/spinner_jtv0k4.gif" alt="spinner" />}

      {gptText.length && !asked ? 
      <Card className="m-4 shadow-lg p-3 mb-5 bg-body rounded">
        <Card.Body>
        {gptText}
        </Card.Body>
      </Card> : <br></br>}

      <div className="m-3 flex-wrap align-self-center"><Row className="m-3">
        <form onSubmit={ask}>
          <Form.Group as={Col} md="15" controlId="validationCustom01">

            <Form.Label>Ask Here</Form.Label>
            <Form.Control
              onSubmit={ask}
              type="text"
              name="question"
              placeholder="Just ask.."
              value={question}
              onChange={handleQuestion}
            >
            </Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <br></br>
          <Button type="submit">Send Question</Button>
        </form>
      </Row> </div>
    </div>
  )
}

export default Question
