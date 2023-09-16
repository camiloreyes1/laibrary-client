import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { AuthProvider } from './context/auth.context.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PostProvider } from './context/posts.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PostProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      </PostProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
