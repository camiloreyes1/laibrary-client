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

  const urlRegex = /(https?:\/\/[^\s]+)/;
  const extractLink = (text) => {
    const match = text.match(urlRegex);
  
    if (match) {
      const videoUrl = match[0]; 
      return (
        <div>
          <iframe
            width="560"
            height="315"
            src={videoUrl} 
            title="Embedded Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      );
    } else {
      return <p>{text}</p>;
    }
  };

  const checkLink = (text) => {
    const match = text.match(urlRegex);
  
    if (match) {
      return true
    } else {
      return false
    }
  };

  const requestBody = { job, question };

  const handleQuestion = (e) => setQuestion(e.target.value);

  const ask = (e) => {
    e.preventDefault();
    setState(true)
    console.log("Request body ===>",requestBody)
    console.log("User ===>",user)
    post('api/video', requestBody)
      .then((response) => {
        const link = checkLink(response.data.text)
        if(link){
          console.log("Link ==>>",link)
          setState(false)
          console.log('GPT answer', response.data);
          setQuestion("")
          setText(response.data.text);
        }
        else{
          ask(e);
        }
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

      {gptText.length && !asked ?
        (extractLink(gptText))
        : <br></br>}

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
