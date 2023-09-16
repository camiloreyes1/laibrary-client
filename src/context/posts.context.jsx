import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import { get } from "../services/authService";

const PostContext = createContext()

const PostProvider = ({ children }) => {

    const [posts,setPosts] = useState([])

    const getPosts = () => {

        get('/posts')
        .then((response) => {
            console.log("posts", response.data)
            setPosts(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getPosts()
    }, [])


    return (
        <PostContext.Provider value={{posts, getPosts, setPosts }}>
            {children}
        </PostContext.Provider>
    )
}

export { PostContext, PostProvider}