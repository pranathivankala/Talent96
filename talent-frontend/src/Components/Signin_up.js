import React, { useEffect } from 'react';
import './Signin_up.css';

function Signin_up() {
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
                        <h2 className="heading">Sign in</h2>
                        <div className="enter_field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="enter_field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" name="password" required />
                        </div>
                        <input type="Submit" value="Login" className="signin-button" />
                        <p className="para">Or sign in with Google</p>
                        <div className="social-media">
                            <a href="#" className="social-icon"><i className="fab fa-google"></i></a>
                        </div>
                        <p className='account-text'>Don't have an account? <a href='#' id='sign-up-btn2'>Sign up</a></p>
                    </form>
                    <form className="signup_form">
                        <h2 className="heading">Sign Up</h2>
                        <div className="enter_field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" name="username" required />
                        </div>
                        <div className="enter_field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" name="email" required />
                        </div>
                        <div className="enter_field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" name="password" required />
                        </div>
                        <div className="enter_field">
                            <i className="fas fa-phone"></i>
                            <input type="tel" placeholder="Mobile No." name="mobile" pattern="[0-9]{10}" required />
                        </div>
                        <div className="enter_field">
                            <i className="fas fa-file-upload"></i>
                            <input type="file" name="resume" accept=".pdf,.doc,.docx" required />
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
                            <h3>Member of Talent96?</h3>
                            <p>Job searching is not about finding a job, it's about finding a match between what you offer and what the company needs.</p>
                            <button id="sign-in-btn" className="signin-button">Sign in</button>
                        </div>
                        <img src="Mobile login-pana.png" alt="Not found" className="pic1" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content1">
                            <h3>New to Talent96?</h3>
                            <p>Job searching is not about finding a job, it's about finding a match between what you offer and what the company needs.</p>
                            <button id="sign-up-btn" className="signup-button">Sign up</button>
                        </div>
                        <img src="Mobile login-amico.png" alt="Not found" className="pic1" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin_up;