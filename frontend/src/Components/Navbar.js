import React, { useState, useEffect,useContext  } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import './Navbar.css';
import UserContext from './UserContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, setUser } = useContext(UserContext); 
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const navigate = useNavigate();
  const toggleProfileMenu = () => setProfileMenuOpen((prev) => !prev);
  const closeMenus = () => {
    setMenuOpen(false);
    setProfileMenuOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    closeMenus();
    navigate('/signin_up');
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
                e.stopPropagation(); 
                toggleMenu();
              }}
            >
              Our Programs ▼
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
              <Link to="/Choosing" onClick={closeMenus} >
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
