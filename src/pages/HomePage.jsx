import { Link } from "react-router-dom"
import { Button, Card } from "react-bootstrap"

const HomePage = () => {
  return (
    <div>

      <h2>What are we learning today?</h2>
      <div>

        <Card style={{ width: '15rem' }} >
          <Link to="/topic">
            <Card.Img variant="top" src="https://res.cloudinary.com/dyto7dlgt/image/upload/v1694893022/topic_jaqcgc.png" />
          </Link>
          <Card.Body>
            <Card.Title>
              <Button href="/topic">Topics</Button>
            </Card.Title>
            <Card.Text>
              Search for topic and get all the related information concerning your request
            </Card.Text>
          </Card.Body>
        </Card>



      
          <Link to="/video">
            <img src="https://res.cloudinary.com/dyto7dlgt/image/upload/v1694892922/youtube_c1ek6s.png" />
            <h4>Look for video tutorials</h4>
            <p>Want to see YouTube tutorial? Click here!</p>
          </Link>
       
        
          <Link to="/github">
            <img src="https://res.cloudinary.com/dyto7dlgt/image/upload/v1694892823/logo_y3wx55.png" />
            <h4>GitHub repos</h4>
            <p>For developers and other GitHub gigs</p>
          </Link>
       

          <Link to="/question">
            <img src="https://res.cloudinary.com/dyto7dlgt/image/upload/v1694893022/question_g5ijfw.png" />
            <h4>Ask any question</h4>
            <p>Want to ask anything in particular? Feel free to ask our online Guru</p>
          </Link>
        
      </div>
    </div>
  )
}

export default HomePage