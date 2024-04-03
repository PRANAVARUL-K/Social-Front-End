import './LoginForm.css';
import { useState } from 'react';
import { FaUser, FaLock} from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import { Link} from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
    const [_id, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [reEnterPasswordTouched, setReEnterPasswordTouched] = useState(false);
    const [error, setError] = useState('');

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleReEnterPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReEnterPassword(event.target.value);
        if (!reEnterPasswordTouched) 
            setReEnterPasswordTouched(true); 
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== reEnterPassword) 
            setError('Passwords do not match');
        else
            setError('');
    };

    const formSubmit = (e) => 
    {
        e.preventDefault();
        axios.post('http://localhost:3001/register',{_id,email,password})
        .then(result => {
            console.log(result);
            window.alert('Sign up successful! Click OK to go to login page.');
            window.location.href = '/';
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            <div className='wrapperr'>
                <form action="" onSubmit={(event) => { handleSubmit(event); formSubmit(event); }}>
                    <h1>Sign Up</h1>
                    <div className='input-box'>
                        <input type='text' placeholder='Email Id' onChange={(e) => setEmail(e.target.value)}/>
                        <MdEmail className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type='text' placeholder='Username' onChange={(e) => setUserName(e.target.value)}/>
                        <FaUser className='icon'/>
                    </div>
                    <div className='input-box'>
                        <input type='password' placeholder='Password' value={password} onChange={handlePasswordChange}/>
                        <FaLock className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type='password' placeholder='Re-enter Password' value={reEnterPassword} onChange={handleReEnterPasswordChange} />
                        <FaLock className='icon'/>
                    </div>
                    {(reEnterPasswordTouched && password !== reEnterPassword) && (<div className='error'>Passwords do not match</div>)}
                    <button type='submit'>
                        Sign Up
                    </button>
                    <div className='register-link'>
                        <p>Already Have An Account?<Link to='/'>LogIn</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginForm;
