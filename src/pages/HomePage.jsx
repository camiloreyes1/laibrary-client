import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

const HomePage = () => {
  return (
    <div>
      <br></br>
      <h2 className="m-3 d-flex flex-wrap justify-content-center">
        What would you like to learn?
      </h2>
      <div className="d-flex flex-wrap justify-content-center">
        <Card
          className="m-4 shadow-lg p-3 mb-5 bg-body rounded text-center"
          style={{ width: "20rem" }}
        >
          <Link to="/topic">
            <Card.Img
              variant="top"
              src="https://res.cloudinary.com/dyto7dlgt/image/upload/v1694893022/topic_jaqcgc.png"
            />
          </Link>
          <Card.Body>
            <Card.Title>
              <Link to="/topic">
                <Button className="d-flex flex-wrap justify-content-center">
                  Topics
                </Button>
              </Link>
            </Card.Title>
            <Card.Text>
              Search for topics and get all the related information concerning
              your request.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card
          className="m-4 shadow-lg p-3 mb-5 bg-body rounded text-center"
          style={{ width: "20rem" }}
        >
          <Link to="/video">
            <Card.Img
              variant="top"
              src="https://res.cloudinary.com/dyto7dlgt/image/upload/v1694892922/youtube_c1ek6s.png"
            />
          </Link>
          <Card.Body>
            <Card.Title>
              <Link to="/video">
                <Button className="d-flex flex-wrap justify-content-center">
                  Video Tutorials
                </Button>
              </Link>
            </Card.Title>
            <Card.Text>
              Want to watch YouTube tutorials? Click here!
            </Card.Text>
          </Card.Body>
        </Card>

        <Card
          className="m-4 shadow-lg p-3 mb-5 bg-body rounded text-center"
          style={{ width: "20rem" }}
        >
          <Link to="/github">
            <Card.Img
              variant="top"
              src="https://res.cloudinary.com/dyto7dlgt/image/upload/v1694892823/logo_y3wx55.png"
            />
          </Link>
          <Card.Body>
            <Card.Title>
              <Link to="/github">
                <Button className="d-flex flex-wrap justify-content-center">
                  GitHub Repositories
                </Button>
              </Link>
            </Card.Title>
            <Card.Text>
              Want to look for inspiration in Github? Feel free to look at some
              repositories
            </Card.Text>
          </Card.Body>
        </Card>

        <Card
          className="m-4 shadow-lg p-3 mb-5 bg-body rounded text-center"
          style={{ width: "20rem" }}
        >
          <Link to="/question">
            <Card.Img
              variant="top"
              src="https://res.cloudinary.com/dyto7dlgt/image/upload/v1694893022/question_g5ijfw.png"
            />
          </Link>
          <Card.Body>
            <Card.Title>
              <Link to="/question">
                <Button className="d-flex flex-wrap justify-content-center">
                  Ask Questions
                </Button>
              </Link>
            </Card.Title>
            <Card.Text>
              Want to ask anything in particular? Feel free to ask our online
              Guru.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;



