
import './App.css'
import LoginForm from './Components/LoginForm/LoginForm'
import SignupForm from './Components/LoginForm/RegisterForm'
import Home from './Components/HomePage/Home'
import ProfilePage from './Components/HomePage/Profilepage'
import Search from './Components/Search/Search'
import Post from './Components/Post/Posts'
import {Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/register" element={<SignupForm/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/post" element={<Post/>} />
        <Route path="/search" element={<Search/>} />
      </Routes>
    </>
  )
}

export default App
