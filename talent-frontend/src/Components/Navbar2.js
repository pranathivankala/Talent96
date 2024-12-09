import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar2 = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" onClick={closeMenu}>Talent96</Link>
        </div>

        <div className={`hamburger-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/Home" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/page1" onClick={closeMenu}>Post a Job</Link></li> 
          <li><Link to="/Signin_up" onClick={closeMenu}>Recruiter Login</Link></li> 
        </ul>
      </nav>
    </header>
  );
};

export default Navbar2;
