import React, { useEffect } from 'react';
import './Signin_up.css';

function RecruiterSigninSignup() {
    useEffect(() => {
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".main-container");
        const sign_in_btn2 = document.querySelector("#sign-in-btn2");
        const sign_up_btn2 = document.querySelector("#sign-up-btn2");

        sign_up_btn.addEventListener("click", () => {
            container.classList.add("sign-up-mode");
        });

        sign_in_btn.addEventListener("click", () => {
            container.classList.remove("sign-up-mode");
        });

        sign_up_btn2.addEventListener("click", () => {
            container.classList.add("sign-up-mode2");
        });
        sign_in_btn2.addEventListener("click", () => {
            container.classList.remove("sign-up-mode2");
        });

    }, []);

    return (
        <div className="big_box">
            <div className="main-container">
                <div className="signin-signup">
                    <form className="signin_form">
                        <h2 className="heading">Recruiter Sign In</h2>
                        <div className="enter_field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Company Email Address" required />
                        </div>
                        <div className="enter_field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" required />
                        </div>
                        <input type="submit" value="Login" className="signin-button" />
                        <p className="para">Or sign in with Google</p>
                        <div className="social-media">
                            <a href="#" className="social-icon"><i className="fab fa-google"></i></a>
                        </div>
                        <p className='account-text'>Don't have an account? <a href='#' id='sign-up-btn2'>Sign up</a></p>
                    </form>
                    <form className="signup_form">
                        <h2 className="heading">Recruiter Sign Up</h2>
                        <div className="enter_field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Full Name" required />
                        </div>
                        <div className="enter_field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Company Email Address" required />
                        </div>
                        <div className="enter_field">
                            <i className="fas fa-building"></i>
                            <input type="text" placeholder="Company Name" required />
                        </div>
                        <div className="enter_field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" required />
                        </div>
                        <input type="submit" value="Sign Up" className="signup-button" />
                        <p className="para">Or sign up with Google</p>
                        <div className="social-media">
                            <a href="#" className="social-icon"><i className="fab fa-google"></i></a>
                        </div>
                        <p className='account-text'>Already have an account? <a href='#' id='sign-in-btn2'>Sign in</a></p>
                    </form>
                </div>
                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content1">
                            <h3>Existing Recruiter?</h3>
                            <p>Manage your job postings and find the perfect candidates for your company.</p>
                            <button id="sign-in-btn" className="signin-button">Sign in</button>
                        </div>
                        <img src="Mobile login-pana.png" alt="Not found" className="pic1" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content1">
                            <h3>New Recruiter?</h3>
                            <p>Join us to access a vast pool of talent and post your job openings effortlessly.</p>
                            <button id="sign-up-btn" className="signup-button">Sign up</button>
                        </div>
                        <img src="Mobile login-amico.png" alt="Not found" className="pic1" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecruiterSigninSignup;
