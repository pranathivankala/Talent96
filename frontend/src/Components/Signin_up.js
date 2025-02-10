import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signin_up.css';
import UserContext from './UserContext';

function Signin_up() {
    const { setUser } = useContext(UserContext);
    const { setUserData } = useContext(UserContext); 
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [isSignUpMode2, setIsSignUpMode2] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const loginData = { email: loginEmail, password: loginPassword };
            const response = await axios.post('http://52.66.245.100:3001/api/Users_Login', loginData);
            const userData = response.data;

            setUser({
                name: userData.username || 'User',
                profilePhoto: userData.profilePicture || 'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png',
            });

            navigate('/create-profile');
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Mobile, setMobile] = useState('');
    const [resume, setResume] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('mobile', Mobile);
            formData.append('resume', resume);

            const response = await axios.post('http://52.66.245.100:3001/api/Users_Register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 201) {
                const userData = response.data.user;
                localStorage.setItem(
                    'userRegistrationData',
                    JSON.stringify({
                        name: userData.username,
                        email: userData.email,
                        phone: userData.mobile || '',
                    })
                );

                setUserData(userData);
                setIsSignUpMode(false);
                setIsSignUpMode2(false);
            } else if (response.status === 409) {
                alert('User already exists! Redirecting to your profile.');

                navigate('/career');
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message);
            } else {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        const container = document.querySelector('.main-container');
        if (isSignUpMode) container.classList.add('sign-up-mode');
        else container.classList.remove('sign-up-mode');

        if (isSignUpMode2) container.classList.add('sign-up-mode2');
        else container.classList.remove('sign-up-mode2');
    }, [isSignUpMode, isSignUpMode2]);

    return (
        <div className="big_box">
            <div className="main-container">
                <div className="signin-signup">
                    <form className="signin_form" onSubmit={handleLogin}>
                        <h2 className="heading">Sign in</h2>
                        <div className="enter_field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                        </div>
                        <div className="enter_field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                        </div>
                        <input type="submit" value="Login" className="signin-button" />
                        <p className="para">Or sign in with Google</p>
                        <div className="social-media">
                            <a href="#" className="social-icon"><i className="fab fa-google"></i></a>
                        </div>
                        <p className="account-text">Don't have an account? <a href="#" onClick={() => setIsSignUpMode2(true)}>Sign up</a></p>
                    </form>
                    <form className="signup_form" action="/upload" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                        <h2 className="heading">Sign Up</h2>
                        <div className="enter_field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} Placeholder="Username" required />
                        </div>
                        <div className="enter_field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} Placeholder="Email" required />
                        </div>
                        <div className="enter_field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} Placeholder="Password" required />
                        </div>
                        <div className="enter_field">
                            <i className="fas fa-phone"></i>
                            <input type="tel" placeholder="Mobile No." pattern="[0-9]{10}" onChange={(e) => setMobile(e.target.value)} Placeholder="Mobile" required />
                        </div>
                        <div className="enter_field">
                            <i className="fas fa-file-upload"></i>
                            <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResume(e.target.files[0])} required />
                        </div>
                        <input type="submit" value="Sign Up" className="signup-button" />
                        <p className="para">Or sign up with Google</p>
                        <div className="social-media">
                            <a href="#" className="social-icon"><i className="fab fa-google"></i></a>
                        </div>
                        <p className="account-text">Already have an account? <a href="#" onClick={() => setIsSignUpMode2(false)}>Sign in</a></p>
                    </form>
                </div>
                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content1">
                            <h3>Member of Talent96?</h3>
                            <p>Job searching is not about finding a job, it's about finding a match between what you offer and what the company needs.</p>
                            <button className="signin-button" onClick={() => setIsSignUpMode(false)}>Sign in</button>
                        </div>
                        <img src="Mobile login-pana.png" alt="Not found" className="pic1" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content1">
                            <h3>New to Talent96?</h3>
                            <p>Job searching is not about finding a job, it's about finding a match between what you offer and what the company needs.</p>
                            <button className="signup-button" onClick={() => setIsSignUpMode(true)}>Sign up</button>
                        </div>
                        <img src="Mobile login-amico.png" alt="Not found" className="pic1" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin_up;