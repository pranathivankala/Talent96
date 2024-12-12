import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleProfileMenu = () => setProfileMenuOpen((prev) => !prev);
  const closeMenus = () => {
    setMenuOpen(false);
    setProfileMenuOpen(false);
  };

  const handleLogin = () => {
    setUser({
      name: 'John Doe',
      profilePhoto:
        'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png',
    });
    closeMenus();
  };

  const handleLogout = () => {
    setUser(null);
    closeMenus();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest('.navbar') &&
        !event.target.closest('.profile-dropdown') &&
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
          {user ? (
            <li className="profile-menu">
              <div className="profile">
                <img
                  src={user.profilePhoto}
                  alt={`${user.name}'s profile`}
                  className="profile-photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleProfileMenu();
                  }}
                />
                <div
                  className={`profile-dropdown ${profileMenuOpen ? 'show' : ''}`}
                >
                  <Link to="/profile" onClick={closeMenus}>
                    Your Profile
                  </Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </li>
          ) : (
            <li>
              <Link to="/Choosing" onClick={handleLogin}>
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
