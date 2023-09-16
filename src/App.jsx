import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/NavbarComponent";
import HomePage from "./pages/homepage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import GitHubSearch from "./pages/GitHubSearch";
import Question from "./pages/Question";
import Topic from "./pages/TopicSearch";
import VideoSearch from "./pages/VideoSearch";

function App() {

  const getToken = () => {
    return localStorage.getItem('authToken')
  }

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to='/login' />
  }

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to='/' />
  }

  return (
    <div className="">
      <Navbar />
 
      <Routes>      
        <Route element={<LoggedIn />}>
        <Route path ="/" element={<HomePage/>}/>
        <Route path ="/github" element={<GitHubSearch/>}/>
        <Route path ="/question" element={<Question/>}/>
        <Route path ="/topic" element={<Topic/>}/>
        <Route path ="/video" element={<VideoSearch/>}/>
        </Route>

        <Route element={<NotLoggedIn />}>
          
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

        </Route>


      </Routes>
      
    </div>
  );
}
export default App;

