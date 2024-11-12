import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
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
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About</Link></li>
          <li><Link to="/career" onClick={closeMenu}>Career</Link></li>
          <li><Link to="/resources" onClick={closeMenu}>Resources</Link></li>
          <li className="dropdown">
            <button className="dropbtn">Programs<span className="arrow">⮟</span></button>
            <div className="dropdown-content">
              <Link to="/client-programs" onClick={closeMenu}>Client Programs</Link>
              <Link to="/referral-program" onClick={closeMenu}>Referral Program</Link>
            </div>
          </li>
          <li><Link to="/fresher-recruiting" onClick={closeMenu}>Fresher Recruiting</Link></li>
          <li className="dropdown">
            <button className="dropbtn">Login<span className="arrow">⮟</span></button>
            <div className="dropdown-content">
            <Link to="/login-job-seeker" onClick={closeMenu}>JobSeeker Login</Link>
            <Link to="/login-recruiter" onClick={closeMenu}>Recruiter Login</Link>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
