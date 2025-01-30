import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import './Signin_up.css';

function Recruiter_signin_up() {
    const { setUser } = useContext(UserContext);
    const [isSignUpMode, setIsSignUpMode] = useState(false); // Track form mode
    const [logincompanyemail, setLogincompanyemail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const loginData = {
            companyemail: logincompanyemail,
            password: loginPassword,
        };

        axios.post('http://13.235.73.240:3001/api/Recruiters_Login', loginData)
            .then((result) => {
                console.log("Login successful:", result);
                setUser(result.data.recruiter);
                navigate('/post-a-job');
            })
            .catch((err) => {
                if (err.response && err.response.status === 400) {
                    alert('Invalid email or password');
                } else {
                    console.log(err);
                }
            });
    };

    const [fullname, setfullname] = useState('');
    const [companyemail, setcompanyemail] = useState('');
    const [companyname, setcompanyname] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Form data being sent:", { fullname, companyemail, companyname, password });

        axios.post('http://13.235.73.240:3001/api/Recruiters_Register', {
            fullname,
            companyemail,
            companyname,
            password,
        })
            .then((result) => {
                console.log(result);
                alert('Registration successful! Please login.');
                setIsSignUpMode(false); // Switch to Sign In mode after registration
            })
            .catch((err) => {
                if (err.response && err.response.status === 400) {
                    alert(err.response.data.message);
                } else {
                    console.log(err);
                }
            });
    };

    useEffect(() => {
        const container = document.querySelector(".main-container");

        if (isSignUpMode) {
            container.classList.add("sign-up-mode");
        } else {
            container.classList.remove("sign-up-mode");
        }
    }, [isSignUpMode]);

    return (
        <div className="big_box">
            <div className="main-container">
                <div className="signin-signup">
                    <form className="signin_form" onSubmit={handleLogin}>
                        <h2 className="heading">Recruiter Sign In</h2>
                        <div className="enter_field">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="email"
                                placeholder="Company Email Address"
                                name="companyemail"
                                value={logincompanyemail}
                                onChange={(e) => setLogincompanyemail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="enter_field">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required
                            />
                        </div>
                        <input type="submit" value="Login" className="signin-button" />
                        <p className="para">Or sign in with Google</p>
                        <div className="social-media">
                            <a href="#" className="social-icon"><i className="fab fa-google"></i></a>
                        </div>
                        <p className='account-text'>
                            Don't have an account? <a href='#' onClick={() => setIsSignUpMode(true)}>Sign up</a>
                        </p>
                    </form>
                    <form className="signup_form" onSubmit={handleSubmit}>
                        <h2 className="heading">Recruiter Sign Up</h2>
                        <div className="enter_field">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                placeholder="Full Name"
                                name="fullname"
                                required
                                onChange={(e) => setfullname(e.target.value)}
                            />
                        </div>
                        <div className="enter_field">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="email"
                                placeholder="Company Email Address"
                                name="companyemail"
                                onChange={(e) => setcompanyemail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="enter_field">
                            <i className="fas fa-building"></i>
                            <input
                                type="text"
                                placeholder="Company Name"
                                name="companyname"
                                onChange={(e) => setcompanyname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="enter_field">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <input type="submit" value="Sign Up" className="signup-button" />
                        <p className="para">Or sign up with Google</p>
                        <div className="social-media">
                            <a href="#" className="social-icon"><i className="fab fa-google"></i></a>
                        </div>
                        <p className='account-text'>
                            Already have an account? <a href='#' onClick={() => setIsSignUpMode(false)}>Sign in</a>
                        </p>
                    </form>
                </div>
                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content1">
                            <h3>Existing Recruiter?</h3>
                            <p>Manage your job postings and find the perfect candidates for your company.</p>
                            <button onClick={() => setIsSignUpMode(false)} className="signin-button">Sign in</button>
                        </div>
                        <img src="Mobile login-pana.png" alt="Not found" className="pic1" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content1">
                            <h3>New Recruiter?</h3>
                            <p>Join us to access a vast pool of talent and post your job openings effortlessly.</p>
                            <button onClick={() => setIsSignUpMode(true)} className="signup-button">Sign up</button>
                        </div>
                        <img src="Mobile login-amico.png" alt="Not found" className="pic1" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recruiter_signin_up;
