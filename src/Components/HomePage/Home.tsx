import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { Navbar } from 'react-bootstrap';
import axios from 'axios'; // Import axios for making HTTP requests
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const handleProfileButtonClick = () => {
    navigate('/profile');
  };

  const handlePostButtonClick = () => {
    navigate('/post');
  };

  useEffect(() => {
    // Fetch data from the server
    axios.get('http://localhost:3001/dposts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []); 

  
  return (
    <>
      <Navbar bg="transparent" expand="lg" fixed="top">
        <Navbar.Brand href="#" style={{ fontSize: '24px', color: '#ffffff', marginLeft: '20px' }}>Social</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <ul className="navbar-nav ms-auto" style={{ marginRight: '20px' }}>
            <li className="nav-item">
              <Link to="#" className="nav-link" style={{ fontSize: '20px', color: '#ffffff', marginRight: '20px' }}>Home</Link>
            </li>
            <li className="nav-item" style={{ marginRight: '20px' }}> {/* Added space here */}
              <button onClick={handlePostButtonClick} className="profile-button" style={{ background: 'transparent', border: 'none', fontSize: '20px', color: '#ffffff', position: 'relative' }}>
                Post
                <span className="button-overlay"></span>
              </button>
            </li>
            <li className="nav-item">
              <Link to="/search" className="nav-link" style={{ fontSize: '20px', color: '#ffffff', marginRight: '20px' }}>Search</Link>
            </li>
            <li className="nav-item"> {/* Added space here */}
              <button onClick={handleProfileButtonClick} className="profile-button" style={{ background: 'transparent', border: 'none', fontSize: '20px', color: '#ffffff', position: 'relative' }}>
                <FaUser className="profile-icon" />
                Profile
                <span className="button-overlay"></span> 
              </button>
            </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
      <div className="wrapper">
        <h1>Posts</h1>
        <div className="scrollable-container">
          {posts.map(post => (
            <div className="post-box" key={post._id}>
              <div className="post-content">
                <h3>{post.uname}</h3>
                <img src={`http://localhost:3001/uploads/${post.imageUrl}`} alt="Post" />
                <p>{post.des}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
