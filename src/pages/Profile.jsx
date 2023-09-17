import { Card } from 'react-bootstrap'
import { useEffect, useState,  } from 'react'
import { get } from '../services/authService';
import { useParams } from 'react-router-dom';


const Profile = () => {
const [user, setUser ] =useState(null);
const { id } = useParams();

const getUserInfo = () =>{
  get(`/users/profile/${id}`)
  .then((results) => {
    setUser(results.data)
  })
}
  
useEffect(() => {
  getUserInfo();
},[])

  return (
    <>
    {user && <div className="d-flex flex-wrap justify-content-xl-center">
        
    <Card  className="m-5 shadow-lg p-3 mb-5 bg-body rounded" style={{ width: '20rem' }}>
      <Card.Body>
        <Card.Title className='text-center'>Your profile</Card.Title>
        <Card.Img src='https://res.cloudinary.com/dyto7dlgt/image/upload/v1691526692/project3/avatar_h1b0st.jpg'></Card.Img>
        <Card.Subtitle className="mb-2 text-muted text-center">Name: {user.fullName} </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted text-center">Occupation: {user.occupation} </Card.Subtitle>
        <Card.Link className='text-center' href="#">Edit</Card.Link>
      </Card.Body>
    </Card>

    </div>}
    </>
  )
}

export default Profile

