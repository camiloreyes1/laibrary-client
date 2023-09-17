import { post } from "../services/authService";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const VideoSearch = () => {
  const [question, setQuestion] = useState("");
  const { user } = useContext(AuthContext);
  const [asked, setState] = useState(false);
  const [gptText, setText] = useState("");
  let job;
  if(user){
    job = user.occupation;
  }

  const containsOnlyLink = (text) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(text) && text.trim() === text;
  }

  const requestBody = { job, question };

  const handleQuestion = (e) => setQuestion(e.target.value);

  const ask = (e) => {
    e.preventDefault();
    setState(true)
    console.log("Request body ===>",requestBody)
    console.log("User ===>",user)
    post('api/video', requestBody)
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

      {asked && <img src="https://res.cloudinary.com/dyto7dlgt/image/upload/v1691760277/project3/spinner_jtv0k4.gif" alt="spinner" />}

      {gptText.length ?
        (containsOnlyLink(gptText) ? <div>
          <iframe
            width="560"
            height="315"
            src={gptText}
            title="Embedded Video"
            frameBorder="0"
            allowFullScreen>

          </iframe>
        </div> : <p>{gptText}</p>)
        : <br></br>}

      <div><Row className="mb-3">
        <form onSubmit={ask}>
          <Form.Group as={Col} md="3" controlId="validationCustom01">

            <Form.Label>Your Inquiry</Form.Label>
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
