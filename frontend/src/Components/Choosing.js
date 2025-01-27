import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Choosing.css';

function ChooseCard({ setIsNavbarTwo }) {
  const navigate = useNavigate();


  const handlePostJobClick = () => {
    setIsNavbarTwo(true);  
    navigate('/Recruiter_signin_up');  
  };


  const handleFindJobClick = () => {
    navigate('/Signin_up'); 
  };

  return (
    <div className='pedda-card'>
    <div className="bigcard">
      <h2>Your Ultimate Job Platform</h2>
      <p>Connecting job seekers with the right opportunities</p>
      <div className="card-container">
        <div className="card1">
          <img
            src="https://static.vecteezy.com/system/resources/previews/010/871/645/original/3d-online-job-interview-illustration-png.png"
            alt="Post A Job"
          />
          <button onClick={handlePostJobClick}>Post A Job</button>
        </div>
        <div className="card2">
          <img
            src="https://static.vecteezy.com/system/resources/previews/010/442/458/non_2x/search-job-of-people-online-find-vacancy-employment-go-to-career-of-hire-people-seek-opportunity-for-vacancy-or-work-position-search-new-work-in-internet-illustration-vector.jpg"
            alt="Find A Job"
          />
          <button onClick={handleFindJobClick}>Find A Job</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ChooseCard;
