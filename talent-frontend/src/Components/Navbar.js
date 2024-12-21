import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Controls login state
  const [userName, setUserName] = useState('User'); 
  const [profileImage, setProfileImage] = useState('path_to_default_profile_image');

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenus = () => setMenuOpen(false);

  const handleLogout = () => {
    setIsLoggedIn(false); 
    window.location.reload();
    setMenuOpen(false); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest('.navbar') &&
        !event.target.closest('.dropdown-content')
      ) {
        closeMenus();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/Home" onClick={closeMenus}>
            Talent96
          </Link>
        </div>
        <div
          className={`hamburger-icon ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="navbar-links"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul id="navbar-links" className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/Home" onClick={closeMenus}>
              Home
            </Link>
          </li>
          <li className="dropdown">
            <button
              className="dropbtn"
              onClick={(e) => {
                e.stopPropagation(); // Prevent menu closure
                toggleMenu();
              }}
            >
              Our Programs▼
            </button>
            <div className="dropdown-content">
              <Link to="/client-programs" onClick={closeMenus}>
                Client Programs
              </Link>
            </div>
          </li>
          <li>
            <Link to="/career" onClick={closeMenus}>
              Career
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMenus}>
              About
            </Link>
          </li>
          {isLoggedIn ? (
            <li className="dropdown">
              <button
                className="profile-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent menu closure
                  toggleMenu();
                }}
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="profile-image"
                />
                {userName}
              </button>
              <div className="dropdown-content">
                <Link to="/profile" onClick={closeMenus}>
                  Profile
                </Link>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </li>
          ) : (
            <li>
              <Link to="/Choosing" onClick={closeMenus}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
