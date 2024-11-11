import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-logo">
          <a href="/">Talent96</a>
        </div>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/career">Career</a></li>
          <li><a href="/resources">Resources</a></li>
          <li className="dropdown">
            <a href="#" className="dropbtn" onClick={toggleDropdown}>Programs</a>
            {dropdownOpen && (
              <div className="dropdown-content">
                <a href="/client-programs">Client Programs</a>
                <a href="/referral-program">Referral Program</a>
              </div>
            )}
          </li>
          <li><a href="/fresher-recruiting">Fresher Recruiting</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
