import { post } from "../services/authService";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const VideoSearch = () => {
  const [question, setQuestion] = useState("");
  const { user } = useContext(AuthContext);
  const [asked, setState] = useState(false);
  const navigate = useNavigate();
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
    post('/api/video', requestBody)
      .then((response) => {
        console.log("RESPONSE ===>",response.data[0].id.videoId)
        const link =response.data[0].id.videoId
        window.open(`https://www.youtube.com/watch?v=${link}`, '_blank');
        navigate("/")
      })
      .catch((error) => {
        console.log("Error", error)
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  }

  return (
    <div>

      {asked && <img  className="rounded mx-auto d-block" src="https://res.cloudinary.com/dyto7dlgt/image/upload/v1691760277/project3/spinner_jtv0k4.gif" alt="spinner" />}

      <div className="m-3 flex-wrap align-self-center"><Row className="m-3">
        <form onSubmit={ask}>
          <Form.Group as={Col} md="15" controlId="validationCustom01">

            <Form.Label>Ask Here</Form.Label>
            <Form.Control
              onSubmit={ask}
              type="text"
              name="question"
              placeholder="Tailwind CSS installation guide"
              value={question}
              onChange={handleQuestion}
            >
            </Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <br></br>
          <Button type="submit">Ask for video</Button>
        </form>
      </Row> </div>
    </div>
  )
}

export default VideoSearch
