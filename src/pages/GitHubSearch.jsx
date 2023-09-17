import { post } from "../services/authService";
import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const GitHubSearch = () => {
  const [question, setQuestion] = useState("");
  const { user } = useContext(AuthContext);
  const [asked, setState] = useState(false);

  const navigate = useNavigate();
  let job;
  if(user){
    job = user.occupation;
  }

  const urlRegex = /(https?:\/\/[^\s]+)/;
  const extractLink = (text) => {
    const match = text.match(urlRegex);
  
    if (match) {
      console.log("Match ===>", match)
      const ourUrl = match[0]; 
      window.open(ourUrl, '_blank');
    } else {
      return <p>{text}</p>;
    }
  };

  const checkLink = (text) => {
    const match = text.match(urlRegex);
  
    if (match && match[0] !== "https://github.com/" && match[1] !== "https://github.com/" ) {
      console.log("Match ===>", match)
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
    post('api/github', requestBody)
      .then((response) => {
        const link = checkLink(response.data.text)
        if(link){
          console.log("Link ==>>",link)
          setState(false)
          console.log('GPT answer', response.data);
          setQuestion("")
          extractLink(response.data.text)
          navigate("/")
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

      {asked && <img className="rounded mx-auto d-block" src="https://res.cloudinary.com/dyto7dlgt/image/upload/v1691760277/project3/spinner_jtv0k4.gif" alt="spinner" />}

      <div className="m-3 flex-wrap align-self-center"><Row className="m-3">
        <form onSubmit={ask}>
          <Form.Group as={Col} md="15" controlId="validationCustom01">

            <Form.Label>Ask Here</Form.Label>
            <Form.Control
              onSubmit={ask}
              type="text"
              name="question"
              placeholder="Send me link for MERN github repository"
              value={question}
              onChange={handleQuestion}
            >
            </Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <br></br>
          <Button type="submit">Ask for link</Button>
        </form>
      </Row> </div>
    </div>
  )
}

export default GitHubSearch
