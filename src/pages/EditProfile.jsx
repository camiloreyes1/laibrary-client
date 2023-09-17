import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/auth.context"
import { useNavigate, useParams } from "react-router-dom"
import { post, postRoute } from "../services/authService"


const EditProfile = () => {

    const { user } = useContext(AuthContext);
    const { userId } = useParams()
    const [ updatedOccupation, setUpdatedOccupation ] = useState("")
    const [ updatedName, setUpdatedName ] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        post(`/edit/${userId}`, { occupation : updatedOccupation})
            .then((updatedProfile) => {
                console.log("Updated Profile", updatedProfile)
                navigate('/profile')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleTextChange = (e) => {
        setUpdatedOccupation(e.target.value)
    }

  return (
    <div class="m-3" id="edit-post">

    <h1>Edit Post</h1>

    <form onSubmit={handleSubmit}>

    <Form.Group as={Col} md="3" controlId="validationCustom02">
        <Form.Label>Occupation</Form.Label>
        <FormControl
            onSubmit={handleSubmit}
            type="text"
            name="occupation"
            value={updatedOccupation}
            onChange={handleTextChange}
        />
        <br></br>

        <Button type="submit">Edit Post</Button>
    </Form.Group>

    </form>
    <br></br>
</div>
  )
}

export default EditProfile