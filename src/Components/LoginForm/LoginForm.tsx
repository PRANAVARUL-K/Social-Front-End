import './LoginForm.css';
import { useState } from 'react';
import { FaUser, FaLock} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function LoginForm() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const LoginSubmit = (e) => 
    {
        e.preventDefault();
        axios.post('http://localhost:3001/login',{userName,password})
        .then(result => {
            console.log(result);
            const { data, message } = result.data;
            if(message === "Success")
            {
                localStorage.setItem("token",data);
                window.alert('Log In successful! Click OK to go to Home page.');
                navigate('/home', { state: { userName } });
            }
            else
            {
                window.alert('Log In Unsuccessful! Click OK to try again.');
                window.location.href = '/';
            }
        })
        .catch(err => console.log(err))
    }

  return (
    <>
    <h1>Social</h1>
    <div className = 'wrapperr'>
        
        <form action="" onSubmit={LoginSubmit}>
            <h1>Login</h1>
            <div className='input-box'>
                <input type='text' placeholder='Username' onChange={(e) => setUserName(e.target.value)}/>
                <FaUser className='icon'/>
            </div>
            <div className='input-box'>
                <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                <FaLock className='icon'/>
            </div>
            <div className='remember-forgot'>
                <label><input type='checkbox'/>Remember me</label>
                <Link to='/forgot-password'>Forgot Password</Link>
            </div>

            <button type='submit'>
                Login
            </button>
            <div className='register-link'>
                <p>Don't have an account? <Link to='/register'>Register</Link></p>
            </div>
        </form>
    </div>
    </>
  )
}

export default LoginForm;
