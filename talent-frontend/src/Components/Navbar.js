import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleAuthDropdown = () => {
    setAuthDropdownOpen(!authDropdownOpen);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">Talent96</Link>
        </div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/career">Career</Link></li>
          <li><Link to="/resources">Resources</Link></li>

          <li className="dropdown">
            <button onClick={toggleDropdown} className="dropbtn">Programs</button>
            {dropdownOpen && (
              <div className="dropdown-content">
                <Link to="/client-programs">Client Programs</Link>
                <Link to="/referral-program">Referral Program</Link>
              </div>
            )}
          </li>

          <li><Link to="/fresher-recruiting">Fresher Recruiting</Link></li>

          <li className="dropdown">
            <button onClick={toggleAuthDropdown} className="dropbtn">Login</button>
            {authDropdownOpen && (
              <div className="dropdown-content">
                <Link to="/login-job-seeker">JobSeeker</Link>
                <Link to="/login-recruiter">Recruiter</Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
